const path = require('path');
const appointmentRoutes = require('./appointments');
const API = require('./API');

const constructorMethod = (app) => {

  app.use('/appointments', appointmentRoutes);
  app.use('/', API);
  app.use('*', (req, res) => {
    res.status(404).json({error: 'Not found'});
  });


};

module.exports = constructorMethod;
