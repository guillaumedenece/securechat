'use strict'

const jwt = require('../services/jwt');
const errors = require('../config/errors');

const authentication = (req, res, next) => {

  if(!req.headers && (!req.headers.idToken || !req.headers.idtoken)) {
    req.user_id = false;
    return errors[401](res);
  }

  const headers = req.headers;
  const idToken = headers.idToken ? headers.idToken : headers.idtoken;

  jwt.verify(idToken)
  .then( (jwtDecoded) => {
    req.user_id = jwtDecoded.username;
    next();
  })
  .catch( (error) => {
    req.user_id = false;
    return errors[401](res);
  })
};

module.exports =  authentication;
