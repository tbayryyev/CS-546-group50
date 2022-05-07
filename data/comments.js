const mongoCollections = require("../config/mongoCollections");
const REVIEWS = mongoCollections.reviews;
const USERS = mongoCollections.users;
const DOCTORS = mongoCollections.doctors;
let { ObjectId } = require('mongodb');
const validation = require('../validation');
const { validateEmail } = require("../validation");
const users = require("./users");


const exported = {
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

    const user1 = await users.getUser(userID);


    let newComment = {
      commentID: ObjectId(),
      userID: userID,
      username: user1.username,
      commentText: commentText,
      likes: [],
      dislikes: []
    };



    const updateInfo = await reviewCollection.updateOne({ _id: ObjectId(reviewID) }, { $addToSet: { comments: newComment } });

    if (updateInfo.modifiedCount === 0) {
      throw "could not add the comment successfully";

    }

    const doctorCollection = await DOCTORS();

    const updatedReview = await reviewCollection.findOne({ _id: ObjectId(reviewID) });


    const doctor = await doctorCollection.findOne({ "reviews": { $elemMatch: { "_id": ObjectId(reviewID) } } });


    doctor.reviews.forEach(value => {
      if (value._id.toString() == reviewID) {
        value.comments.push(newComment);
      }

    })


    const updateInfo2 = await doctorCollection.replaceOne({ "reviews": { $elemMatch: { "_id": ObjectId(reviewID) } } }, doctor);

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



    const doctorCollection = await DOCTORS();

    const doctor = await doctorCollection.findOne({ "reviews": { $elemMatch: { "_id": ObjectId(reviewID) } } });

    let counter = 0;

    doctor.reviews.forEach(value => {
      if (value._id.toString() == reviewID) {
        value.comments.forEach(value1 => {
          if (value1.commentID.toString() == commentID) {
            value.comments.splice(counter);


          }
          counter++;
        })
      }

    })


    const updateInfo2 = await doctorCollection.replaceOne({ "reviews": { $elemMatch: { "_id": ObjectId(reviewID) } } }, doctor);




    // const updateInfo2 = await doctorCollection.updateMany({ "reviews": { $elemMatch: { "_id": ObjectId(reviewID) } } }, {
    //   $pull: { reviews: { comments: { $elemMatch: { commentID: ObjectId(commentID) } } } }
    // });




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

    let reviewWithComment = await reviewCollection.findOne({ "comments": { $elemMatch: { "commentID": ObjectId(commentID) } } });

    if (reviewWithComment == null) {
      throw "comment on the review could not be found";
    }

    let comment = []
    reviewWithComment.comments.forEach(value => {
      if (value.commentID.toString() == commentID) {
        comment.push(value);
      }

    })



    let likeArray = comment[0].likes;
    let dislikeArray = comment[0].dislikes;

    if (likeArray.indexOf(userID) != -1) {
      throw "you have already liked or disliked this comment";
    }

    if (dislikeArray.indexOf(userID) != -1) {
      throw "you have already liked or disliked this comment";
    }


    reviewWithComment.comments.forEach(value => {
      if (value.commentID.toString() == commentID) {
        value.likes.push(userID);
      }
    })


    const updateInfo = await reviewCollection.replaceOne({ _id: ObjectId(reviewID) }, reviewWithComment);

    if (updateInfo.modifiedCount === 0) {
      throw "could not like comment successfully";

    }

    const doctorCollection = await DOCTORS();

    const doctor = await doctorCollection.findOne({ "reviews": { $elemMatch: { "_id": ObjectId(reviewID) } } });


    doctor.reviews.forEach(value => {
      if (value._id.toString() == reviewID) {
        value.comments.forEach(value1 => {
          if (value1.commentID.toString() == commentID) {
            value1.likes.push(userID);
          }
        })
      }

    })


    const updateInfo2 = await doctorCollection.replaceOne({ "reviews": { $elemMatch: { "_id": ObjectId(reviewID) } } }, doctor);





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

    let reviewWithComment = await reviewCollection.findOne({ "comments": { $elemMatch: { "commentID": ObjectId(commentID) } } });

    if (reviewWithComment == null) {
      throw "comment on the review could not be found";
    }

    let comment = []
    reviewWithComment.comments.forEach(value => {
      if (value.commentID.toString() == commentID) {
        comment.push(value);
      }

    })



    let likeArray = comment[0].likes;
    let dislikeArray = comment[0].dislikes;

    if (likeArray.indexOf(userID) != -1) {
      throw "you have already liked or disliked this comment";
    }

    if (dislikeArray.indexOf(userID) != -1) {
      throw "you have already liked or disliked this comment";
    }


    reviewWithComment.comments.forEach(value => {
      if (value.commentID.toString() == commentID) {
        value.dislikes.push(userID);
      }
    })


    const updateInfo = await reviewCollection.replaceOne({ _id: ObjectId(reviewID) }, reviewWithComment);

    if (updateInfo.modifiedCount === 0) {
      throw "could not dislike comment successfully";

    }

    const doctorCollection = await DOCTORS();

    const doctor = await doctorCollection.findOne({ "reviews": { $elemMatch: { "_id": ObjectId(reviewID) } } });


    doctor.reviews.forEach(value => {
      if (value._id.toString() == reviewID) {
        value.comments.forEach(value1 => {
          if (value1.commentID.toString() == commentID) {
            value1.dislikes.push(userID);
          }
        })
      }

    })


    const updateInfo2 = await doctorCollection.replaceOne({ "reviews": { $elemMatch: { "_id": ObjectId(reviewID) } } }, doctor);




    return { "userID": userID, "disliked": true };




  }
}

module.exports = exported;
