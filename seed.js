const doctors = require("./data/doctors");
const reviews = require("./data/reviews");

const connection = require("./config/mongoConnection");

async function main() {
    const db = await connection.connectToDb();
    // to clear database
    // await db.dropDatabase();

    // try {
    //     const doc = await doctors.createDoctor("Robert Segal", "doc.jpeg", "Cardiologist", "Graduated from Stanford med", ["English", "Spanish"], "8th and Washington street", "Hoboken", "NJ", "07030", "location",);
    //     console.log(doc);
    // } catch (e) {
    //     console.log("Got an error!");
    //     console.log(e);
    // }

    // try {
    //     const doc = await doctors.createDoctor("Ethan Bane1", "doc.jpeg", "Cardiologist", "Graduated from Stanford med", ["English", "Spanish"], "9th and Washington street", "Hoboken", "NJ", "07030", "location",);
    //     console.log(doc);
    // } catch (e) {
    //     console.log("Got an error!");
    //     console.log(e);
    // }

    // try {
    //     const review = await reviews.createReview("626da5937057bfdf3dd2a6d9", "This doctor was ok", "userID_here2", 2.5);
    //     console.log(review);
    // } catch (e) {
    //     console.log("Got an error!");
    //     console.log(e);
    // }
    // try {
    //     const review = await reviews.createReview("626da5cf721f362efb176ce8", "This doctor was amazing", "userID_here2", 5.0);
    //     console.log(review);
    // } catch (e) {
    //     console.log("Got an error!");
    //     console.log(e);
    // }

    // try {
    //     const review = await reviews.createReview("626d9c287386838c5d09f88f", "This doctor was ok", "userID_here2", 1.0);
    //     console.log(review);
    // } catch (e) {
    //     console.log("Got an error!");
    //     console.log(e);
    // }

    // try {
    //     const comment = await reviews.addComment("112312", "626d9d78cb6ec47a8771eead", "I agree with your review");
    //     console.log(comment);
    // } catch (e) {
    //     console.log("Got an error!");
    //     console.log(e);
    // }

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

    try {
        const topRated = await doctors.highestRatedDoctors("Cardiologist");
        console.log(topRated);
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const getSpec = await doctors.getAllSpecialities();
        console.log(getSpec);
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }












    await connection.closeConnection();



}

main();