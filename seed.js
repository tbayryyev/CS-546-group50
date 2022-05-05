const doctors = require("./data/doctors");
const reviews = require("./data/reviews");
const comments = require("./data/comments")
const users = require("./data/users");

const connection = require("./config/mongoConnection");

async function main() {
    const db = await connection.connectToDb();
    // to clear database
    await db.dropDatabase();

    try {
        const newUser = await users.createUser("James", "Mills", "JMills@gmail.com", "JMills", "12/10/1978", "12 Parker Road", "Tulsa", "OK", "74008", "8374847747", "12345678");
        const newUser1 = await users.getUserByUsername("JMills");
        newUserId = newUser1._id.toString();
        console.log(newUser);
    } catch (e) {
        console.log("Got an error.");
        console.log(e);
    }

    try {
        const newUser2 = await users.createUser("Mary", "Johnson", "Mary@gmail.com", "Mary", "02/20/1988", "23 Green Street", "Middletown", "NY", "10940", "7283748372", "12345678");
        const newUser3 = await users.getUserByUsername("Mary");
        newUserId2 = newUser3._id.toString();
        console.log(newUser2);
    } catch (e) {
        console.log("Got an error.");
        console.log(e);
    }

    try {
        const doc = await doctors.createDoctor("Stephanie Rose", "https://images.theconversation.com/files/304957/original/file-20191203-66986-im7o5.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop", "Cardiologist", "Graduated from Stanford med", ["English", "Spanish"], "8th and Washington street", "Hoboken", "NJ", "07030", 5.0);
        console.log(doc);
        docID = doc._id;
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const doc = await doctors.createDoctor("Ethan Bane", "https://physicians.wustl.edu/wp-content/uploads/2020/09/Elsayed-Omar_Peds300_03-280x386.jpg", "pediatrician", "Graduated from NYU Med school", ["English", "French", "Arabic"], "7th and Madison", "Hoboken", "NJ", "07030", 4.5);
        console.log(doc);
        doc2ID = doc._id;
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const review = await reviews.createReview(docID, "This doctor was ok", newUserId, 2.5);
        console.log(review);
        reviewId = review._id;
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }
    try {
        const review2 = await reviews.createReview(doc2ID, "This doctor was amazing", newUserId2, 5.0);
        review2Id = review2._id;
        console.log(review2);
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }


    try {
        const comment = await comments.addComment(newUserId, review2Id, "I agree with your review");
        comment1Id = comment.commentID;
        console.log(comment);
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const commentLike = await comments.addLikeComment(comment1Id, review2Id, newUserId2);
        console.log(commentLike);
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }


    try {
        const dislike = await comments.addDislikeComment(comment1Id, review2Id, newUserId);
        console.log(dislike);
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }






    // try {
    //     const getSpec = await doctors.getAllSpecialities();
    //     console.log(getSpec);
    // } catch (e) {
    //     console.log("Got an error!");
    //     console.log(e);
    // }
    //
    // try {
    //     const getDocs = await doctors.highestRatedDoctor(['cardiologist', 'Cardiologist']);
    //     console.log(getDocs);
    // } catch (e) {
    //     console.log("Got an error!");
    //     console.log(e);
    // }

    // try {
    //     const getSpec = await doctors.getAllSpecialities();
    //     console.log(getSpec);
    // } catch (e) {
    //     console.log("Got an error!");
    //     console.log(e);
    // }

    // try {
    //     const getDocs = await doctors.highestRatedDoctor(['cardiologist', 'Cardiologist']);
    //     console.log(getDocs);
    // } catch (e) {
    //     console.log("Got an error!");
    //     console.log(e);
    // }














    await connection.closeConnection();



}

main();
