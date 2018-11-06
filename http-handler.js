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

  // parse the url
  const parsedUrl = url.parse(req.url, true);

  // get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // get the query string as an object
  const queryStringObject = parsedUrl.query;

  // get http method
  const method = req.method.toLowerCase();

  // get request headers
  const headers = req.headers;

  // get the body if any
  const decoder = new StringDecoder('utf-8');
  let buffer = '';

  req.on('data', (data) => {
      buffer += decoder.write(data);
  });

  req.on('end', () => {
    buffer += decoder.end();
    
    // check the routes for a matching path for a handler
    const chosenHandler = typeof(routes[trimmedPath]) !== 'undefined' 
      ? routes[trimmedPath] 
      : notFoundHandler;

    // construct the request data to be sent to the handler
    const data = {
      'trimmedPath' : trimmedPath,
      'queryStringObject' : queryStringObject,
      'method' : method,
      'headers' : headers,
      'payload' : buffer
    };

    // route the request to the handler
    chosenHandler(data, (statusCode, payload) => {

      // use the status code returned from the handler, or set the default status code to 200
      statusCode = typeof(statusCode) === 'number' ? statusCode : DEFAULT_STATUS_CODE;

      // response body
      payload = typeof(payload) === 'object' ? payload : {};

      // convert payload to json string
      const payloadString = JSON.stringify(payload);

      // set the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);
    });

  });
};