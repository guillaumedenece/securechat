'use strict';

const sjcl = require('sjcl');
const _ = require('lodash');

const jwt = require('../../../services/jwt');
const random = require('../../../services/random');
const MySQLService = require('../../../services/MySQLService');
const configGeneral = require('../../../config/general');

const loginRequestOne = (bodyRequest) => {
  const username = bodyRequest.username;

  if(!username)
  return Promise.resolve({'error': 'username missing'});

  var challenge;
  var salt;
  return new Promise( (resolve, reject) => {
    MySQLService.query('SELECT salt FROM users \
    WHERE \
    username = ?', [username])
    .then( (res) => {
      if(res.length === 1 && res[0].salt) {
        salt = res[0].salt;
        challenge = random.getRandomBits(32);
        var challenge_expiration = Date.now() + configGeneral.challenge_validity_time;
        challenge_expiration = new Date(challenge_expiration);

        return MySQLService.query('UPDATE users \
        SET challenge = ?, challenge_expiration = ? \
        WHERE username = ?', [challenge, challenge_expiration, username]);

      } else {
        return resolve({'error': 'user does not exist'});
      }
    })
    .then( () => resolve({challenge, salt}) )
    .catch( (error) => reject(error) );
  });
};

const loginRequestTwo = (bodyRequest) => {
  const username = bodyRequest.username;
  const hash_password_challenge = bodyRequest.hash_password_challenge;

  if(!username || !hash_password_challenge)
  return Promise.resolve({'error': 'missing username or hash_password_challenge'});

  var tag_verify = false;
  return new Promise( (resolve, reject) => {
    MySQLService.query('SELECT hash_password, challenge, challenge_expiration\
    FROM users \
    WHERE username = ?', [username])
    .then( (res) => {
      if(res.length === 0 || !res[0].hash_password
       || !res[0].challenge || !res[0].challenge_expiration)
      return resolve({'error': 'impossible to find user'});

      if (res[0].challenge_expiration < Date.now())
      return resolve({'error': 'challenge expired'});

      const toMAC = res[0].hash_password + res[0].challenge;
      const tag_bis = sjcl.hash.sha256.hash(toMAC);

      if (_.isEqual(hash_password_challenge,tag_bis))
      tag_verify = true;

      return Promise.resolve();
      return MySQLService.query('UPDATE users \
      SET challenge = NULL, challenge_expiration = NULL \
      WHERE username = ?', [username]);
    })
    .then( () => {
      if(tag_verify) {
        return jwt.create(username);
      }
      else
        return reject({'error': 'tag and tag_bis mismatch'});
    })
    .then( (token) => {
      return resolve({'idToken': token})
    })
    .catch( (error) => reject(error) );
  })
};

module.exports = {
  loginRequestOne,
  loginRequestTwo
}
