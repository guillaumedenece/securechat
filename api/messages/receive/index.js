'use strict';

const express = require('express');
const receiveController = require('./receive.controller');
const jwt = require('../../../services/jwt');

const router = express.Router({
    mergeParams: true
});

router.post('/', (req, res) => {
  jwt.verify(req.headers.authorize)
  .then( (decode) => {
    res.send({'decode':decode});
  })
  .catch( (error) => {
    console.log(error);
    res.send({error: 'an error has occured'});
  })
});

module.exports = router;
