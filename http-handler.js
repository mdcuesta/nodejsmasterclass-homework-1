/*
 * HTTP Handler, handles http request and determines
 * the proper route of the request
 *
 */

const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('./routes');

const DEFAULT_STATUS_CODE = 200;

const notFoundHandler = (data, callback) => {
  callback(404);
};

module.exports = (req, res) => {

  const parsedUrl = url.parse(req.url, true);

  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  const queryStringObject = parsedUrl.query;

  const method = req.method.toLowerCase();

  const headers = req.headers;

  const decoder = new StringDecoder('utf-8');
  let buffer = '';

  req.on('data', (data) => {
      buffer += decoder.write(data);
  });

  req.on('end', () => {
    buffer += decoder.end();
      
    const chosenHandler = typeof(routes[trimmedPath]) !== 'undefined' 
      ? routes[trimmedPath] 
      : notFoundHandler;

    const data = {
      'trimmedPath' : trimmedPath,
      'queryStringObject' : queryStringObject,
      'method' : method,
      'headers' : headers,
      'payload' : buffer
    };

    chosenHandler(data, (statusCode, payload) => {

      statusCode = typeof(statusCode) === 'number' ? statusCode : DEFAULT_STATUS_CODE;

      payload = typeof(payload) === 'object' ? payload : {};

      const payloadString = JSON.stringify(payload);

      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);
    });

  });
};