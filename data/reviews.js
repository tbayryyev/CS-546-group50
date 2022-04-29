const mongoCollections = require("../config/mongoCollections");
const REVIEWS = mongoCollections.reviews;
const USERS = mongoCollections.users;
const DOCTORS = mongoCollections.doctors;
let { ObjectId } = require('mongodb');
const { doctors } = require("../config/mongoCollections");
//const validation = require('../validation');
// upload the validation module to the github aswell otherwise we can not run this code

async function getReviews(doctorID) {
  const reviewCollection = await REVIEWS();

  const reviews = await reviewCollection.find({}).toArray();

  reviewList = [];

  for (review of reviews) {
    if (review.doctorID == doctorID) {
      reviewList.push(review)
    }
  }
  return reviewList;

}

const exported = {
  getReviews: async (doctorID) => {
    //   doctorID = validation.checkID(doctorID, "doctorID");

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
    // doctorID = validation.checkID(doctorID, "doctorID");
    // reviewText = validation.checkString(reviewText, "reviewText");

    // make sure to also check if userID is valid 
    // make sure to also check if rating is a number between 1 and 5
    const reviewCollection = await REVIEWS();

    const doctorCollection = await DOCTORS();

    const reviews = await reviewCollection.find({}).toArray();



    for (review of reviews) {
      if ((review.doctorID == doctorID) && (review.userID == userID)) throw 'Review already created'
    }



    const newReview = {
      _id: ObjectId(),
      doctorID: doctorID,
      userID: userID,
      reviewText: reviewText,
      rating: rating,
      comments: []
    }

    const insertInfo = await reviewCollection.insertOne(newReview);

    let reviewList = await getReviews(doctorID);


    let rating1 = 0;

    if (reviewList.length != 0) {
      for (review of reviewList) {
        rating1 += review.rating;
      }
      const updateInfo = await doctorCollection.updateOne({ _id: ObjectId(doctorID) }, { $set: { rating: rating1 } });


    }




    newReview._id = newReview._id.toString();
    return newReview;


  },
  addLikeReview: async (doctorID, userID) => {

  },
  addDislikeReview: async (doctorID, userID) => {

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

    const review = await reviewCollection.findOne({ _id: ObjectId(reviewID) });

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
      commentText: commentText,
      likes: [],
      dislikes: []
    };


    const updateInfo = await reviewCollection.updateOne({ _id: ObjectId(reviewID) }, { $addToSet: { comments: newComment } });

    if (updateInfo.modifiedCount === 0) {
      throw "could not add the comment successfully";

    }

    newComment.commentID = newComment.commentID.toString();



    return newComment;

  },
  deleteComment: async (commentID, reviewID) => {

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

    const review = await reviewCollection.findOne({ _id: ObjectId(reviewID) });

    if (review === null) {
      throw "no review exists with that id";
    }

    if (!commentID) {
      throw "commentID parameter not supplied or undefined";
    }
    if (typeof commentID !== 'string' || commentID.trim().length === 0) {
      throw "commentID parameter has to be a nonempty string";
    }
    commentID = commentID.trim();

    if (!ObjectId.isValid(commentID)) {
      throw "commentID is an Invalid ObjectId";
    }

    const commentFound = await reviewCollection.findOne({ "comments": { $elemMatch: { "commentID": ObjectId(commentID) } } });


    if (commentFound == null) {
      throw "comment on the review could not be found";
    }

    const delete1 = await reviewCollection.updateOne({ _id: ObjectId(reviewID) }, { $pull: { comments: { commentID: ObjectId(commentID) } } });

    if (delete1.modifiedCount === 0) {
      throw "could not delete the comment successfully";

    }

    return { "commentID": commentID, "deleted": true };


  },
  addLikeComment: async (commentID, reviewID, userID) => {

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

    const review = await reviewCollection.findOne({ _id: ObjectId(reviewID) });

    if (review === null) {
      throw "no review exists with that id";
    }

    if (!commentID) {
      throw "commentID parameter not supplied or undefined";
    }
    if (typeof commentID !== 'string' || commentID.trim().length === 0) {
      throw "commentID parameter has to be a nonempty string";
    }
    commentID = commentID.trim();

    if (!ObjectId.isValid(commentID)) {
      throw "commentID is an Invalid ObjectId";
    }

    const commentFound = await reviewCollection.findOne({ "comments": { $elemMatch: { "commentID": ObjectId(commentID) } } });


    if (commentFound == null) {
      throw "comment on the review could not be found";
    }

    let likeArray = commentFound.likes;
    let dislikeArray = commentFound.dislikes;

    if (likeArray.indexof(ObjectId(userID)) != -1) {
      throw "you have already liked or disliked this review";
    }

    if (dislikeArray.indexof(ObjectId(userID)) != -1) {
      throw "you have already liked or disliked this review";
    }




    const updateInfo = await reviewCollection.updateOne({ _id: ObjectId(reviewID), commentID: ObjectId(commentID) }, { $addToSet: { comments: { likes: ObjectId(userID) } } });

    if (updateInfo.modifiedCount === 0) {
      throw "could not like comment successfully";

    }

    return { "userID": userID, "liked": true };






  },

  addDislikeComment: async (commentID, reviewID, userID) => {
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

    const review = await reviewCollection.findOne({ _id: ObjectId(reviewID) });

    if (review === null) {
      throw "no review exists with that id";
    }

    if (!commentID) {
      throw "commentID parameter not supplied or undefined";
    }
    if (typeof commentID !== 'string' || commentID.trim().length === 0) {
      throw "commentID parameter has to be a nonempty string";
    }
    commentID = commentID.trim();

    if (!ObjectId.isValid(commentID)) {
      throw "commentID is an Invalid ObjectId";
    }

    const commentFound = await reviewCollection.findOne({ "comments": { $elemMatch: { "commentID": ObjectId(commentID) } } });


    if (commentFound == null) {
      throw "comment on the review could not be found";
    }

    let likeArray = commentFound.likes;
    let dislikeArray = commentFound.dislikes;

    if (likeArray.indexof(ObjectId(userID)) != -1) {
      throw "you have already liked or disliked this review";
    }

    if (dislikeArray.indexof(ObjectId(userID)) != -1) {
      throw "you have already liked or disliked this review";
    }




    const updateInfo = await reviewCollection.updateOne({ _id: ObjectId(reviewID), commentID: ObjectId(commentID) }, { $addToSet: { comments: { dislikes: ObjectId(userID) } } });

    if (updateInfo.modifiedCount === 0) {
      throw "could not dislikelike comment successfully";

    }

    return { "userID": userID, "disliked": true };





  },

}
module.exports = exported;
