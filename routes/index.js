const path = require('path');
const appointmentRoutes = require('./appointments');

const constructorMethod = (app) => {

  app.use('/appointments', appointmentRoutes);
  app.use('/', function (req, res) {
    res.sendFile(path.resolve('static/index.html'));
  });
  app.use('*', (req, res) => {
    res.sendStatus(404);
  });


};

module.exports = constructorMethod;
