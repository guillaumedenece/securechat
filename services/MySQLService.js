'use strict';

const mysql = require('mysql');

const configSQL = require('../config/mysql');

var pool;

function connect(opt) {
    if (!opt) {
        if (!configSQL || !configSQL.host) {
            throw new Error('mysql configSQL parameter missing');
        }

        if (!configSQL || !configSQL.port) {
            throw new Error('mysql configSQL parameter missing');
        }

        if (!configSQL || !configSQL.user) {
            throw new Error('mysql configSQL parameter missing');
        }

        if (!configSQL || !configSQL.password) {
            throw new Error('mysql configSQL parameter missing');
        }

        if (!configSQL || !configSQL.database) {
            throw new Error('mysql configSQL parameter missing');
        }
    }

    var options = opt || {};

    pool = mysql.createPool({
        host: options.host || configSQL.host,
        user: options.user || configSQL.user,
        port: options.port || configSQL.port,
        password: options.password || configSQL.password,
        database: options.database || configSQL.database,
        acquireTimeout : 10000,
        connectTimeout: 100000
    });
}

function query (query, param) {
      return new Promise(function(resolve, reject) {
        pool.getConnection(function(err, connection) {
          if (err) {
            return reject(err);
          }

          connection.query(query, param, function(err, rows) {
            connection.release();
            if (err) {
              return reject(err);
            }
            return resolve(rows);
          });
        });
      });
    }

function disconnect() {
  pool.end();
}

module.exports =  {
        query: query,
        connect: connect,
        disconnect: disconnect
    };
