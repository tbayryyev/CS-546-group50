const express = require('express');
const router = express.Router();
const Data = require('../data');
const doctorData = Data.doctors;
const reviewData = Data.reviews
const userData = Data.users;
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
  const reviewInfo = await reviewData.getReviews(doctorId)
  if (req.session.username) {
    res.render('pages/indivDoctor', { doctor: info, authenticated: true, username: req.session.username, userId: req.session.userId,reviews:reviewInfo });
  } else {
    res.render('pages/indivDoctor', { doctor: info, authenticated: false,reviews:reviewInfo });
  }
  return;
});

router.get('/speciality/:speciality', async (req, res) => {
  try {
    let docSpeciality = validation.checkString(req.params.speciality, "speciality");
    const topDoctors = await doctorData.highestRatedDoctors(docSpeciality);
    if (req.session.username) {
      res.render('pages/speciality', { docs: topDoctors, spec: docSpeciality, authenticated: true, username: req.session.username, userId: req.session.userId });
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
      let doctorID = validation.checkId(req.body.doctorID, "doctorID");
      let reviewText = validation.checkString(req.body.reviewText, "reviewText");
      let userID = await userData.getUserByUsername(req.session.username)
      // console.log(userID._id.toString());
      let rating = validation.errorCheckingFunc("rating",Number(req.body.rating),'number');
      // console.log(userID);
      const review = await reviewData.createReview(doctorID, reviewText, userID._id.toString(), rating);

      let url = '/doctor/' + doctorID
      res.redirect(url);

    } else {
      res.status(401).send("You must be logged in to post a review")
      return;
    }
  }catch (e){
    res.status(404).json({ error: e });
  }
})


router.post("/deleteReview", async(req,res) => {
  // try{
    // console.log();
    if (req.session.username) {
      let userID = await userData.getUserByUsername(req.session.username)
      let checkuserID = validation.checkId(req.body.userID,"userID");
      let doctorID = validation.checkId(req.body.doctorID, "doctorID");
      console.log("validated");
      // console.log();
      if (userID._id.toString() == checkuserID){
          const review = await reviewData.deleteReview(doctorID, userID._id.toString());

          let url = '/doctor/' + doctorID
          res.redirect(url);
          return;

      }else{
        res.status(401).send("You can not delete a comment that is not your own");
        return;

      }

    } else {
      res.status(401).send("You must be logged in to delete a review")
      return;
    }
  // }catch (e){
  //   console.log(req.body);
  //   res.status(404).json({ error: e });
  // }
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
