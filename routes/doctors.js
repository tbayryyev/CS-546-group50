const express = require('express');
const router = express.Router();
const Data = require('../data');
const doctorData = Data.doctors;
const validation = require('../validation');


// router.get('',async(req,res) =>{
//   console.log("broke in get empty doctor");
//   res.status(404).json({error: 'here for no reason'});
//   return;
// })

router.get('/:doctorId', async (req, res) => {
  // console.log("hello");
  var doctorId;
  try {
    doctorId = validation.checkId(req.params.doctorId, "doctorId");
  }
  catch (e) {
    console.log("broke in get doctorId");
    res.status(404).json({ error: 'can not validate' });
    return;
    // console.log("broke here");
  }
  const info = await doctorData.getDoctor(doctorId);
  if (req.session.username) {
    res.render('pages/indivDoctor', { doctor: info, authenticated: true, username: req.session.username });
  } else {
    res.render('pages/indivDoctor', { doctor: info, authenticated: false });
  }
  return;
});

router.get('/speciality/:speciality', async (req, res) => {
  try {
    let docSpeciality = validation.checkString(req.params.speciality, "speciality");
    const topDoctors = await doctorData.highestRatedDoctors(docSpeciality);
    if (req.session.username) {
      res.render('pages/speciality', { docs: topDoctors, spec: docSpeciality, authenticated: true, username: req.session.username });
    } else {
      res.render('pages/speciality', { docs: topDoctors, spec: docSpeciality, authenticated: false });
    }
  } catch (e) {
    res.status(404).json({ error: e });
  }
});




module.exports = router;
