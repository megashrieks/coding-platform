const express = require('express');
const app = express();
const fs = require('fs');
const port = 5000;
const mongoose = require('mongoose');
const cors = require('cors');

const mlab = JSON.parse(fs.readFileSync('mlab.json').toString());
const url = `mongodb://${mlab.username}:${mlab.password}@ds231529.mlab.com:31529/coding-platform`
mongoose.connect(url);



const schemas = require('./schemas/Schemas');
const Contest = schemas.Contest;
app.use(cors());





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

app.listen(port, () => {
  console.log('listening to port: ' + port);
})