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

const sum = (arr) => {
  let tot = 0;
  for(let i=0;i<arr.length;++i)
    tot += arr[i];
  return tot;
}
app.get('/api/contests', (req, res) => {
  Contest.find({}, 'title type details additionalDetails start_time end_time')
    .then(data => {
      for(let i=0;i<data.length;++i) {
        let time = get_remaining_time(data[i].start_time, data[i].end_time);
        delete data[i].start_time;
        delete data[i].end_time;
        let tot = sum(time);
        if(tot == 0)
          data[i].type = 'mock';
        else if(tot < 0)
          data[i].type = 'future';
        else
          data[i].type = 'ongoing';
      }
      res.status(200).json({data: data, error: null})
    })
    .catch(err => res.status(404).json({error: err, data: null}));
});



const get_questions = (contest_id, requirments_arr) => {
  return new Promise((resolve, reject) => {
    Contest.findById(contest_id, requirments_arr.join(' '), (err, data) => {
      if(err) 
        reject(err);
      else {
        resolve(data);
      }
    })
  });
}


app.get('/api/contests/:contest_id/questions', (req, res) => {
  get_questions(req.params.contest_id, 
  ['title' ,'start_time' ,'end_time' ,'questions'])
  .then(data => {
    let resp = {};
    resp['contestName'] = data.title;
    resp['timeRemaining'] = get_remaining_time(data.start_time, data.end_time);
    resp['questions'] = [];
    if(data.questions.length == 0) {
      res.status(200).json({data: resp, error: null});
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
      res.status(200).json({data: resp, error: null});
    }   
  })
  .catch(err => res.status(404).json({data: null, error: 'error'}));
});

const purify = (question) => {
  
  question.test_cases.private = undefined;
  question.test_case_results.private = undefined;  
  question.test_cases = question.test_cases.public;
  question.test_case_results = question.test_case_results.public;  
  return question; 
}

app.get('/api/contests/:contest_id/questions/:question_id', (req, res) => {
  let qid = req.params.question_id;
  get_questions(req.params.contest_id, ['questions'])
  .then(
    (data) => {
      let questions = data.questions, i;
      for(i=0;i<questions.length;++i)
        if(questions[i]._id == qid) {
          res.status(200).json({data: purify(questions[i]), error: null});
          break;
        }
      if(i == questions.length)
        res.status(404).json({data: null, error: 'no such question'});
    }
  )
  .catch(err => res.status(404).json({data: null, error: 'error!!'}));
});

app.listen(port, () => {
  console.log('listening to port: ' + port);
})