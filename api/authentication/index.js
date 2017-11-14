'use strict';

const express = require('express');

const router = express.Router({
    mergeParams: true
});

router.use('/login', require('./login'));
router.use('/register', require('./register'));

module.exports = router;
