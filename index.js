/*
 * Homework Assignment #1
 *
 */

const http = require('http');
const httpHandler = require('./http-handler');
const routes = require('./routes');

const httpServer = http.createServer(httpHandler);

httpServer.listen(3000, function(){
  console.log('HTTP server listening is on port 3000.');
});

// Custom routes
routes['hello'] = (data, callback) => { 
  callback(200, {
    msg: 'Welcome User!'
  });
};
