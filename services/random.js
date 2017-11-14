'use strict'

const getRandomBits = (nbBits) => {
  const max = Math.pow(2, nbBits);
  return Math.trunc(Math.random() * (max-1));
}

module.exports = {
  getRandomBits
}
