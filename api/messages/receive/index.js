'use strict';

const express = require('express');
const receiveController = require('./receive.controller');
const jwt = require('../../../services/jwt');
const authentication =  require('../../../middleware/authentication');

const router = express.Router({
    mergeParams: true
});

router.get('/', authentication, (req, res) => {
  receiveController.receiveMessages(req.user_id)
  .then( (ans) => res.send(ans) )
  .catch( (error) => {
    console.log(error);
    res.send({'success': 'false'});
  })
});

module.exports = router;
