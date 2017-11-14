'use strict';

const express = require('express');
const sendController = require('./send.controller');

const router = express.Router({
    mergeParams: true
});

router.post('/', (req, res) => {
  res.send({'success':'true'});
});

module.exports = router;
