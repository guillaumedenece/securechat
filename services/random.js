'use strict'

const crypto = require('crypto');

const getRandomBits = (nbBytes) => {
  const buf = crypto.randomBytes(nbBytes).toString('hex');
  return buf;
}

module.exports = {
  getRandomBits
}
