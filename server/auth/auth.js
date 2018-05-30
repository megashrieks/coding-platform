const jwt = require('jsonwebtoken');
const router = require('express').Router();
const { key } = require('../../credentials/sercret_key');

const get_jwt_token = (data) => {
  let token = jwt.sign(data, key);
  return token;
}

// for signup and login:
// req.body.user_data : { username: '***', password: '***'}
// data returned: { token: '__jwt_token__'}
router.post('/signup', (req, res) => {
  res.json({ token: get_jwt_token(req.body.user_data) });
});

router.post('/login', (req, res) => {
  // check in db.
  res.json({ token: get_jwt_token(req.body.user_data) });
});

// req.body.token : __token__
router.post('/isauth', (req, res) => {
  jwt.verify(req.body.token, key, (err, data) => {
    if(err)  res.status(403).json({message: 'error'})
    else  res.status(200).json({message: 'authenticated'})
  });
});

module.exports = router;




