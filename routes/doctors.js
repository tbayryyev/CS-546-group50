const express = require('express');
const router = express.Router();
const Data = require('../data');
const doctorData = Data.doctors;
const reviewData = Data.reviews
const validation = require('../validation');




router.get('/:doctorId', async (req, res) => {
  var doctorId;
  try {
    doctorId = validation.checkId(req.params.doctorId, "doctorId");
  }
  catch (e) {
    console.log("broke in get doctorId");
    res.status(404).json({ error: 'can not validate' });
    return;
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

router.post('/addReview',async(req,res) => {
  try{
    if (req.session.username) {
      console.log(req.body);
      let doctorID = validation.checkId(req.params.doctorID, "doctorID");
      let reviewText = validation.checkString(req.body.reviewText, "reviewText");
      let rating = validation.errorCheckingFunc(req.body.rating, "rating","number");
      const review = await reviews.createReview(doctorID, reviewText, req.session.username, rating);
      // const review = await reviews.createReview(docID, "This doctor was ok", newUserId, 2.5);

    } else {
      res.status(401).send("You must be logged in to post a review")
      return;
    }
  }catch (e){
    res.status(404).json({ error: e });
  }
})



router
  .route('/addComment/:reviewID')
  .post(async (req, res) => {
    try {
      let reviewId = validation.checkId(req.params.reviewID, "reviewID");
      let commentText = validation.checkString(req.body.commentText, "commentText");

      if (req.session.username) {


      } else {
        res.status(401).send("You must be logged in to post a comment")
        return;

      }



    } catch (e) {
      res.status(404).json({ error: e });
      return;

    }
  });




module.exports = router;
