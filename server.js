const express = require('express');
const app = express();
const fs = require('fs');
const port = 5000;
const mongoose = require('mongoose');
const cors = require('cors');

const { username, password } = require('./credentials/mlab.js');
const url = `mongodb://${username}:${password}@ds231529.mlab.com:31529/coding-platform`
mongoose.connect(url);

const schemas = require('./schemas/Schemas');
const { Contest, question } = schemas;

app.use(cors());


//////////////////////////////
// utils.
const solved_choices = [
  'full', 
  'no',
  'partial'
];

const getRandomFrom = (arr) => {
  let len = arr.length;
  return arr[Math.floor(Math.random()*len)];
}
//////////////

const add_question_to_a_contest = (contest_id, question) => {
  Contest.findById(contest_id, {$push:{questions: question}}, 
    (err, data) => {
      if(err) throw err;
      console.log(data);
    })
}

const add_contest = (title, type, details, additionalDetails) => {
  new Contest({
    title,
    type,
    details,
    additionalDetails,
    questions: []
  }).save()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
}

app.get('/api/contests', (req, res) => {
  Contest.find({})
    .then(data => res.json(data))
    .catch(err => res.json(err));
});



const get_questions = (contest_id) => {
  return new Promise((resolve, reject) => {
    Contest.findById(contest_id, 'questions title', (err, data) => {
      if(err) 
        reject(err);
      else {
        resolve(data);
      }
    })
  });
}


app.get('/api/contests/:contest_id/questions', (req, res) => {
  get_questions(req.params.contest_id)
  .then(data => {
    let resp = {};
    resp['contestName'] = data.title;
    resp['timeRemaining'] = [0, 0, 1, 0];
    resp['questions'] = [];
    if(data.questions.length == 0)
      res.json(resp);
    else {
      resp['questions'] = data.questions.map((question) => {
        return {
          question_id: question._id,
          title: question.title,
          details: question.details,
          solved: getRandomFrom(solved_choices), 
          solvedBy: question.solvedBy,
          difficulty: question.difficulty
        }
      });
      res.json(resp);
    }   
  })
  .catch(err => res.json(err));
});

app.listen(port, () => {
  console.log('listening to port: ' + port);
})