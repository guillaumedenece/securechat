'use strict';

const express = require('express');
const loginController = require('./login.controller');

const router = express.Router({
    mergeParams: true
});

router.post('/first', (req, res) => {
  loginController.loginRequestOne(req.body)
  .then( (ans) => res.send(ans) )
  .catch( (error) => {
    console.log(error);
    res.send({'error': 'an error occurred'});
  });
});

router.post('/second', (req, res) => {
  loginController.loginRequestTwo(req.body)
  .then( (ans) => res.send(ans) )
  .catch( (error) => {
    console.log(error);
    res.send({'error': 'an error occurred'});
  });
});

module.exports = router;
