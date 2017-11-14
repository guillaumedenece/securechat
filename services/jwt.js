'use strict'

const jwt = require('jsonwebtoken');

const configGeneral = require('../config/general');

const create = (username) => {
  const payload = {username};
  const secretKey = configGeneral.token_secret_key;
  const options = {'expiresIn': configGeneral.token_validity_time};

  return new Promise( (resolve, reject) => {
    jwt.sign(payload, secretKey, options, (error, token) => {
      if(error) return reject(error);
      return resolve(token);
    });
  });
};

module.exports = {
  create
}
