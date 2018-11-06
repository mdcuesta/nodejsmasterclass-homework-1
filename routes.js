const routes = {};

// Default for 404 route
routes.notFound = function(data, callback){
  callback(404);
};

module.exports = routes;
