'use strict'

const MySQLService = require('../../../services/MySQLService');
const _ = require('lodash');

const receiveMessages = (user_id) => {

var messages;

  return new Promise( (resolve, reject) => {
    MySQLService.query('SELECT * \
    FROM messages \
    WHERE \
    to_user_id = ?', [user_id])
    .then( (res) => {
      messages = _.map(res, (o) => _.pick(o, ['from_user_id', 'content']));
      var messages_id = _.map(res, (o) => o.message_id);

      if(messages_id.length === 0) return resolve([]);
      
      return MySQLService.query('DELETE \
      FROM messages \
      WHERE \
      message_id IN (?)', [messages_id]);
    })
    .then( () => resolve(messages) )
    .catch( (error) => reject(error) );
  });

};


module.exports = {
  receiveMessages
};
