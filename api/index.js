'use strict';

module.exports = (app) => {

  app.use('/authentication',
          require('./authentication'));

  // app.use('/messages',
          // require('./messages'));

};
