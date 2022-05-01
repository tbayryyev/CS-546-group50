const mongoCollections = require("../config/mongoCollections");
const REVIEWS = mongoCollections.reviews;
const USERS = mongoCollections.users;
let { ObjectId } = require('mongodb');



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
