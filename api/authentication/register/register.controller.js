'use strict';

const random = require('../../../services/random');
const MySQLService = require('../../../services/MySQLService');

const registerRequestOne = (bodyRequest) => {
  const username = bodyRequest.username;

  if(!username)
  return Promise.resolve({'error': 'username missing'});

  var salt;
  return new Promise( (resolve, reject) => {
    MySQLService.query('SELECT * FROM users \
    WHERE \
    username = ?', [username])
    .then( (res) => {
      if(res.length === 0) {
        salt = random.getRandomBits(32);
        return MySQLService.query('INSERT INTO users \
        (username, salt) \
        VALUES (?, ?)', [username, salt]);
      } else {
        return resolve({'error': 'user already exists'});
      }
    })
    .then( () => {
      return resolve({salt});
    })
    .catch( (error) => reject(error) );
  });
};

const registerRequestTwo = (bodyRequest) => {
  const username = bodyRequest.username;
  const hash_password = bodyRequest.hash_password;

  if(!username || !hash_password)
  return Promise.resolve({'error': 'missing username or hash_password'});

  return new Promise( (resolve, reject) => {
    MySQLService.query('SELECT hash_password FROM users \
    WHERE username = ?', [username])
    .then((res) => {
      if(res.length === 0 || res[0].hash_password)
      return resolve({'error': 'impossible to store hash_password'});

      return MySQLService.query('UPDATE users \
      SET hash_password = ? \
      WHERE username = ?', [hash_password, username]);
    })
    .then( () => resolve({'register': 'success'}))
    .catch( (error) => reject(error) );
  })
};

module.exports = {
  registerRequestOne,
  registerRequestTwo
}
