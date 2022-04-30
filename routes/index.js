const path = require('path');
const appointmentRoutes = require('./appointments');
const API = require('./API');

const constructorMethod = (app) => {

  app.use('/appointments', appointmentRoutes);
  app.use('/', API);
  app.use('*', (req, res) => {
    res.sendStatus(404);
  });


};

module.exports = constructorMethod;
