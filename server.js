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
const { Contest, Questions, question_schema } = schemas;
// Questions is a collection, containing questions of all the contests.

app.use(cors());

const add_contest_content = (contest_id, questions) => {
  new Questions({
    contest_id,
    questions
  }).save()
  .then(data => console.log(data))
  .catch(err => console.log(err));
}

const add_question_to_a_contest = (contest_id, question) => {
  Questions.findOneAndUpdate({contest_id: contest_id}, 
    {$push:{questions: question}}, (err, data) => {
      if(err) throw err;
      console.log(data);
    })
}

const add_contest = (title, type, details, additionalDetails) => {
  new Contest({
    title,
    type,
    details,
    additionalDetails
  }).save()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
}

const get_contensts = () => {
  return new Promise((resolve, reject) => {
    Contest.find({})
    .then((data) => resolve(data))
    .catch((err) => reject(err));
  });
}

app.get('/api/contests', (req, res) => {
  get_contensts()
  .then((data) => res.json(data))
  .catch((err) => res.json(err));
});



const get_questions = (contest_id) => {
  return new Promise((resolve, reject) => {
    Questions.findOne({contest_id: contest_id}, 'questions contest_name', (err, data) => {
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
    resp['contestName'] = data.contest_name;
    resp['timeRemaining'] = [0, 0, 0, 10];
    resp['questions'] = [];
    if(data.questions.length == 0)
      res.json(resp);
    else {
      resp['questions'] = data.questions.map((question) => {
        return {
          title: question.title,
          details: question.details,
          solved: 'full', 
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