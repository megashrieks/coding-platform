const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const constest_schema = new Schema({
  title: String,
  type: String,
  details: String,
  additionalDetails: String,
  start_time: [Number],
  end_time: [Number],
  questions: [question_schema]
});


const question = mongoose.model('ques', question_schema);

const Contest = mongoose.model('contest', constest_schema);

module.exports = {
  question,
  Contest,
}