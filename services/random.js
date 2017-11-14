'use strict'

const crypto = require('crypto');

const getRandomBytes = (nbBytes) => {
  const buf = crypto.randomBytes(nbBytes).toString('hex');
  return buf;
}

module.exports = {
  getRandomBytes
}
