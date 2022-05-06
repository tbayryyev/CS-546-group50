const express = require('express');
const router = express.Router();
const Data = require('../data');
const doctorData = Data.doctors;
const userData = Data.users;
const commentData = Data.comments;
const validation = require('../validation');

router
    .route('/addComment/:reviewID/:doctorID')
    .post(async (req, res) => {
        try {
            let reviewId = validation.checkId(req.params.reviewID, "reviewID");
            let commentText = validation.checkString(req.body.commentText, "commentText");
            let docID = validation.checkId(req.params.doctorID, "doctorID");

            if (req.session.username) {
                const user = await userData.getUserByUsername(req.session.username);
                const userID = validation.checkId(user._id.toString(), "userID");

                const newComment = await commentData.addComment(userID, reviewId, commentText);

                let url = '/doctor/' + docID
                res.redirect(url);




            } else {
                res.status(401).send("You must be logged in to post a comment");
                return;

            }



        } catch (e) {
            res.status(404).json({ error: e });
            return;

        }
    });


router
    .route('/addLike/:reviewID/:doctorID/:commentID')
    .post(async (req, res) => {
        try {
            let reviewId = validation.checkId(req.params.reviewID, "reviewID");
            let docID = validation.checkId(req.params.doctorID, "doctorID");
            let commentID = validation.checkId(req.params.commentID, "commentID");

            if (req.session.username) {
                const user = await userData.getUserByUsername(req.session.username);
                const userID = validation.checkId(user._id.toString(), "userID");

                const newLike = await commentData.addLikeComment(commentID, reviewId, userID);


                let url = '/doctor/' + docID
                res.redirect(url);




            } else {
                res.status(401).send("You must be logged in to like a comment");
                return;

            }



        } catch (e) {
            res.status(404).json({ error: e });
            return;

        }
    });


router
    .route('/addDislike/:reviewID/:doctorID/:commentID')
    .post(async (req, res) => {
        try {
            let reviewId = validation.checkId(req.params.reviewID, "reviewID");
            let docID = validation.checkId(req.params.doctorID, "doctorID");
            let commentID = validation.checkId(req.params.commentID, "commentID");

            if (req.session.username) {
                const user = await userData.getUserByUsername(req.session.username);
                const userID = validation.checkId(user._id.toString(), "userID");

                const newLike = await commentData.addDislikeComment(commentID, reviewId, userID);


                let url = '/doctor/' + docID
                res.redirect(url);




            } else {
                res.status(401).send("You must be logged in to dislike a comment");
                return;

            }



        } catch (e) {
            res.status(404).json({ error: e });
            return;

        }
    });
module.exports = router;