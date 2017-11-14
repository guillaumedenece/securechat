'use strict';

const express = require('express');

const router = express.Router({
    mergeParams: true
});

router.use('/send', require('./send'));
router.use('/receive', require('./receive'));

module.exports = router;
