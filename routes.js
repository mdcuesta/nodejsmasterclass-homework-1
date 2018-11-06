const routes = {};

routes['hello'] = (data, callback) => { 
  callback(200, {
    msg: 'Welcome User!'
  });
};

module.exports = routes;
