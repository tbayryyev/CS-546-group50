const mongoCollections = require("../config/mongoCollections");
const REVIEWS = mongoCollections.reviews;
const USERS = mongoCollections.users;
let { ObjectId } = require('mongodb');
const validation = require('../validation');


const exported = {
  getReviews: async (doctorID) => {
    doctorID = validation.checkID(doctorID, "doctorID");

    const reviewCollection = await REVIEWS();

    const reviews = await reviewCollection.find({}).toArray();

    reviewList = [];

    for (review of reviews) {
      if (review.doctorID == doctorID) {
        reviewList.push(review)
      }
    }
    console.log(reviewList);

  },
  createReview: async (doctorID, reviewText, userID, rating) => {
    doctorID = validation.checkID(doctorID, "doctorID");
    reviewText = validation.checkString(reviewText, "reviewText");

    const reviewCollection = await REVIEWS();

    const reviews = await reviewCollection.find({}).toArray();

    for (review of reviews) {
      if ((review.doctorID == doctorID) && (review.userID == userID)) throw 'Review already created'
    }





    const newReview = {
      reviewID: ObjectId(),
      doctorID: doctorID,
      userID: userID,
      reviewText: reviewText,
      rating: rating,
      comments: []
    }

    const insertInfo = await reviewCollection.insertOne(newUser)


  },
  addLike: async (doctorID, userID) => {

  },
  addDislike: async (doctorID, userID) => {

  },

  addComment: async (userID, reviewID, commentText) => {

    if (!userID) {
      throw "userID parameter not supplied or undefined";
    }
    if (typeof userID !== 'string' || userID.trim().length === 0) {
      throw "userID parameter has to be a nonempty string";
    }
    userID = userID.trim();

    if (!ObjectId.isValid(userID)) {
      throw "userID is an Invalid ObjectId";
    }

    const userCollection = await USERS();

    const user = await userCollection.findOne({ _id: ObjectId(userID) });

    if (user === null) {
      throw "no user exists with that id";
    }

    if (!reviewID) {
      throw "reviewID parameter not supplied or undefined";
    }
    if (typeof reviewID !== 'string' || reviewID.trim().length === 0) {
      throw "reviewID parameter has to be a nonempty string";
    }
    reviewID = reviewID.trim();

    if (!ObjectId.isValid(reviewID)) {
      throw "reviewID is an Invalid ObjectId";
    }


    const reviewCollection = await REVIEWS();

    const review = await reviewCollection.findOne({ reviewID: ObjectId(reviewID) });

    if (review === null) {
      throw "no review exists with that id";
    }


    if (!commentText) {
      throw "commentText parameter not supplied or undefined";
    }
    if (typeof commentText !== 'string' || commentText.trim().length === 0) {
      throw "comment has to be a nonempty string";
    }

    commentText = commentText.trim();

    let newComment = {
      commentID: ObjectId(),
      userID: userID,
      reviewID: reviewID,
      commentText: commentText,
      likes: [],
      dislikes: []
    };


    const updateInfo = await reviewCollection.updateOne({ reviewID: ObjectId(reviewID) }, { $addToSet: { comments: newComment } });

    if (updateInfo.modifiedCount === 0) {
      throw "could not add the comment successfully";

    }


    return newComment;











  }

}
module.exports = exported;
