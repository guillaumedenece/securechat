'use strict';

const express = require('express');
const receiveController = require('./receive.controller');

const router = express.Router({
    mergeParams: true
});

router.post('/', (req, res) => {
  res.send({'success':'true'});
});

module.exports = router;
