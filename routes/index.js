const path = require('path');
const constructorMethod = (app) => {
  app.use('/', function (req, res) {
    res.sendFile(path.resolve('static/index.html'));
  });
  app.use('*', (req, res) => {
    res.sendStatus(404);
  });


};

module.exports = constructorMethod;
