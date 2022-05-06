const path = require('path');
const appointmentRoutes = require('./appointments');
const API = require('./API');
const doctorRoutes = require('./doctors');
const userRoutes = require('./users');
const commentRoutes = require('./comments');

const constructorMethod = (app) => {

  app.use('/appointments', appointmentRoutes);
  app.use('/doctor', doctorRoutes);
  app.use('/account', userRoutes);
  app.use('/comment', commentRoutes);
  app.use('/', API);
  // app.use('/doctor',doctorRoutes);
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });


};

module.exports = constructorMethod;
