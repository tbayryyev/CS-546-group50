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

router.get('/:doctorId',async(req,res) =>{
  // console.log("hello");
  var doctorId;
  try{
    doctorId = validation.checkId(req.params.doctorId,"doctorId");
  }
  catch(e){
    console.log("broke in get doctorId");
    res.status(404).json({error: 'can not validate'});
    return;
    // console.log("broke here");
  }
  const info = await doctorData.getDoctor(doctorId);
  res.render("pages/indivDoctor",info);
  return;
});


module.exports = router;
