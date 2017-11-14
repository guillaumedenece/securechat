'use strict';

const express = require('express');
const registerController = require('./register.controller');

const router = express.Router({
    mergeParams: true
});

router.post('/first', (req, res) => {
  registerController.registerRequestOne(req.body)
  .then( (ans) => res.send(ans) )
  .catch( (error) => {
    console.log(error);
    res.send({'error': 'an error occurred'});
  });
});

router.post('/second', (req, res) => {
  registerController.registerRequestTwo(req.body)
  .then( (ans) => res.send(ans) )
  .catch( (error) => {
    console.log(error);
    res.send({'error': 'an error occurred'});
  });
});

module.exports = router;
