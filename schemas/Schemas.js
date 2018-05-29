const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const constest_schema = new Schema({
  title: String,
  type: String,
  details: String,
  additionalDetails: String
});

// const quetion_schema = new Schema({
//   title: String,
//   question: String,
// });
const Contest = mongoose.model('contest', constest_schema);

module.exports = {
  Contest
}