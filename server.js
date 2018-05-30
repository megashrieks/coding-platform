const express = require('express');
const app = express();
const fs = require('fs');
const port = 5000;
const mongoose = require('mongoose');
const cors = require('cors');
const { get_remaining_time } = require('./server/time/time');

/////////////////////////////
// mlab related
const { username, password } = require('./credentials/mlab.js');
const url = `mongodb://${username}:${password}@ds231529.mlab.com:31529/coding-platform`
mongoose.connect(url);

const schemas = require('./schemas/Schemas');
const { Contest, question } = schemas;
//////////////////////////////////////////

app.use(cors());

/////////////////////////////
// body - parser related.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/auth', require('./server/auth/auth'));
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
      console.log(data, 'question added.');
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
  .then((data) => console.log(data, 'added contest successfully'))
  .catch((err) => console.log(err));
}

app.get('/api/contests', (req, res) => {
  Contest.find({})
    .then(data => res.json(data))
    .catch(err => res.json(err));
});



const get_questions = (contest_id) => {
  return new Promise((resolve, reject) => {
    Contest.findById(contest_id, 'title start_time end_time questions', (err, data) => {
      if(err) 
        reject(err);
      else {
        resolve(data);
      }
    })
  });
}


app.get('/api/contests/:contest_id/questions', (req, res) => {
  console.log('request');
  get_questions(req.params.contest_id)
  .then(data => {
    let resp = {};
    resp['contestName'] = data.title;
    resp['timeRemaining'] = get_remaining_time(data.start_time, data.end_time);
    resp['questions'] = [];
    if(data.questions.length == 0) {
      res.json(resp);
    }
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