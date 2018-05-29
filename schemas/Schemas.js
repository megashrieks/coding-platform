const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const constest_schema = new Schema({
  title: String,
  type: String,
  details: String,
  additionalDetails: String
});

const question_schema = new Schema({
  title: String,
  question: String,
  details: String,
  test_cases: String,
  test_case_results: String,
  additional_details: Object,
  solvedBy: Number,
  difficulty: Number
});

const questions_schema = new Schema({
  contest_id: String,
  questions: [question_schema]
})

const Questions = mongoose.model('question', questions_schema);

// questions collection has questions of all the contests.
// use contest_id to retrive questions.

const Contest = mongoose.model('contest', constest_schema);

module.exports = {
  question_schema,
  Contest,
  Questions
}