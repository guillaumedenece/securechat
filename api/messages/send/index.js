'use strict';

const express = require('express');
const sendController = require('./send.controller');
const authentication = require('../../../middleware/authentication')

const router = express.Router({
    mergeParams: true
});

router.post('/', authentication, (req, res) => {
  sendController.sendMessage(req.body, req.user_id)
  .then( (ans) => res.send(ans) )
  .catch( (error) => {
    console.log(error);
    req.send({'success': false});
  })
});

module.exports = router;
