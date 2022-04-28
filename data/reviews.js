const mongoCollections = require("../config/mongoCollections");
const REVIEWS = mongoCollections.reviews;
let { ObjectId } = require('mongodb');
const validation = require('../validation');


const exported = {
  getReviews: async (doctorID) => {
    doctorID = validation.checkID(doctorID,"doctorID");

    const reviewCollection = await REVIEWS();

    const reviews = await reviewCollection.find({}).toArray();

    reviewList = [];

    for (review of reviews){
      if(review.doctorID == doctorID){
        reviewList.push(review)
      }
    }
    console.log(reviewList);

  },
  createReview: async(doctorID,reviewText,userID, rating) => {
    doctorID = validation.checkID(doctorID,"doctorID");
    reviewText = validation.checkString(reviewText,"reviewText");

    const reviewCollection = await REVIEWS();

    const reviews = await reviewCollection.find({}).toArray();

    for (review of reviews){
      if((review.doctorID == doctorID) && (review.userID == userID)) throw 'Review already created'
    }





    const newReview = {
      doctorID:doctorID,
      userID:userID,
      reviewText:reviewText,
      rating: rating,
      comment:[]
    }

    const insertInfo = await reviewCollection.insertOne(newUser)


  },
  addLike: async(doctorID,userID) => {

  },
  addDislike: async(doctorID,userID) => {

  }

}
module.exports = exported;
