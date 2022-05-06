router
    .route('/addComment/:reviewID')
    .post(async (req, res) => {
        try {
            let reviewId = validation.checkId(req.params.reviewID, "reviewID");
            let commentText = validation.checkString(req.body.commentText, "commentText");

            if (req.session.username) {
                const user = await userData.getUserByUsername(req.session.username);
                const userID = validation.checkId(user._id.toString(), "userID");

                const newComment = await commentData.addComment(userID, reviewId, commentText);

                res.redirect('/doctor/')




            } else {
                res.status(401).send("You must be logged in to post a comment")
                return;

            }



        } catch (e) {
            res.status(404).json({ error: e });
            return;

        }
    });
