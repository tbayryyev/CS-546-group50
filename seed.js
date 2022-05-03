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
        console.log(newUser);
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
        const review = await reviews.createReview(docID, "This doctor was ok", "userID_here2", 2.5);
        console.log(review);
        reviewId = review._id;
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }
    try {
        const review = await reviews.createReview(doc2ID, "This doctor was amazing", "userID_here2", 5.0);
        console.log(review);
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const review = await reviews.createReview(docID, "This doctor was ok", "userID_here1", 1.0);
        console.log(review);
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const comment = await comments.addComment("userID_here1", reviewId, "I agree with your review");
        console.log(comment);
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    // try {
    //     const deletecomment = await reviews.deleteComment("626da05ec65b722cb262fafa", "626d9d78cb6ec47a8771eead");
    //     console.log(deletecomment);
    // } catch (e) {
    //     console.log("Got an error!");
    //     console.log(e);
    // }

    // try {
    //     const reviewList = await reviews.getReviews("626c3b17ab1e6d2f41a7aedcs");
    //     console.log(reviewList);
    // } catch (e) {
    //     console.log("Got an error!");
    //     console.log(e);
    // }

    // try {
    //     const topRated = await doctors.highestRatedDoctors("Cardiologist");
    //     console.log(topRated);
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
