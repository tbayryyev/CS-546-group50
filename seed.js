const doctors = require("./data/doctors");
const reviews = require("./data/reviews");
const comments = require("./data/comments")

const connection = require("./config/mongoConnection");

async function main() {
    const db = await connection.connectToDb();
    // to clear database
    await db.dropDatabase();

    try {
        const doc = await doctors.createDoctor("Robert Segal", "doc.jpeg", "Cardiologist", "Graduated from Stanford med", ["English", "Spanish"], "8th and Washington street", "Hoboken", "NJ", "07030", "location",);
        console.log(doc);
        docID = doc._id;
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const doc = await doctors.createDoctor("Ethan Bane1", "doc.jpeg", "Cardiologist", "Graduated from Stanford med", ["English", "Spanish"], "9th and Washington street", "Hoboken", "NJ", "07030", "location",);
        console.log(doc);
        doc2ID = doc_.id;
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














    await connection.closeConnection();



}

main();
