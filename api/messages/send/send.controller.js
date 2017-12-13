'use strict'

const MySQLService = require('../../../services/MySQLService');

const sendMessage = (bodyRequest, from_user_id) => {
  const message = bodyRequest.message;
  const to_user_id = bodyRequest.to_user_id;

  if(!message || ! to_user_id)
  return Promise.resolve({'error': 'incorrect body post'});


  return new Promise( (resolve, reject) => {
    MySQLService.query('INSERT INTO messages \
    (content, to_user_id, from_user_id) \
    VALUES (?, ?, ?)', [message, to_user_id, from_user_id])
    .then( () => resolve({'success': true}) )
    .catch( (error) => reject(error) )
  });

};


module.exports = {
  sendMessage
};
