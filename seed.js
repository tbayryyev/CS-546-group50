const doctors = require("./data/doctors");
const reviews = require("./data/reviews");
const comments = require("./data/comments")
const users = require("./data/users");

const connection = require("./config/mongoConnection");

async function main() {
    const db = await connection.connectToDb();
    // to clear database
    await db.dropDatabase();

    let doctor1Id;
    let doctor2Id;
    let doctor3Id;
    let doctor4Id;
    let doctor5Id;
    let doctor6Id;
    let doctor7Id;
    let doctor8Id;
    let doctor9Id;
    let doctor10Id;

    let review1Id;
    let review2Id;
    let review3Id;
    let review4Id;
    let review5Id;
    let review6Id;
    let review7Id;
    let review8Id;
    let review9Id;
    let review10Id;

    let comment1Id;
    let comment2Id;
    let comment3Id;
    let comment4Id;
    let comment5Id;
    let comment6Id;
    let comment7Id;
    let comment8Id;
    let comment9Id;
    let comment10Id;



    // Users
    try {
        await users.createUser("James", "Mills", "JMills@gmail.com", "JMills", "12/10/1978", "4112 Ernestine Way", "North Highlands", "CA", "95660", "9163364525", "Password123");    
        const newUser = await users.getUserByUsername("JMills");
        console.log(newUser);
    } catch (e) {
        console.log("Got an error.");
        console.log(e);
    }

    try {
        await users.createUser("Mary", "Johnson", "Mary@gmail.com", "Mary", "02/20/1988", "2121 Aspen Drive", "Woodstock", "IL", "60098", "8152060588", "Password123");
        const newUser = await users.getUserByUsername("Mary");
        console.log(newUser);
    } catch (e) {
        console.log("Got an error.");
        console.log(e);
    }

    try {
        await users.createUser("Billy", "Collins", "Billy@gmail.com", "BCollins", "10/12/1998", "308 Bonita Court", "Leander", "TX", "78641", "5122066334", "Password123");
        const newUser = await users.getUserByUsername("BCollins");
        console.log(newUser);
    } catch (e) {
        console.log("Got an error.");
        console.log(e);
    }

    try {
        await users.createUser("Sally", "Parker", "Sally@gmail.com", "Sally", "01/11/1965", "1955 Pometacom Drive", "Hanover", "MD", "21076", "4105515330", "Password123");
        const newUser = await users.getUserByUsername("Sally");
        console.log(newUser);
    } catch (e) {
        console.log("Got an error.");
        console.log(e);
    }

    try {
        await users.createUser("Kevin", "Warner", "Kevin@gmail.com", "Kevin12", "04/01/1977", "742 Delaware Avenue", "Bethlehem", "PA", "18015", "6108070235", "Password123");
        const newUser = await users.getUserByUsername("Kevin12");
        console.log(newUser);
    } catch (e) {
        console.log("Got an error.");
        console.log(e);
    }

    try {
        await users.createUser("Teresa", "Moran", "TMoran@gmail.com", "TMoran", "11/11/1967", "42 North Street", "Bellingham", "MA", "02019", "5088832493", "Password123");
        const newUser = await users.getUserByUsername("TMoran");
        console.log(newUser);
    } catch (e) {
        console.log("Got an error.");
        console.log(e);
    }

    try {
        await users.createUser("Jerry", "Nichols", "JNichols@gmail.com", "JNichols", "11/11/1967", "1456 Tapestry Lane", "Goddard", "KS", "67052", "3167229214", "Password123");
        const newUser = await users.getUserByUsername("JNichols");
        console.log(newUser);
    } catch (e) {
        console.log("Got an error.");
        console.log(e);
    }

    try {
        await users.createUser("Dan", "Moss", "Dan@gmail.com", "Moss", "11/11/1967", "192 Honeywell Drive", "Claymont", "DE", "19703", "3027988264", "Password123");
        const newUser = await users.getUserByUsername("Moss");
        console.log(newUser);
    } catch (e) {
        console.log("Got an error.");
        console.log(e);
    }

    try {
        await users.createUser("Joy", "Lyons", "Joy@gmail.com", "Joy7", "10/07/1988", "300 Ruby Street", "Paris", "MO", "65275", "6603274572", "Password123");
        const newUser = await users.getUserByUsername("Joy7");
        console.log(newUser);
    } catch (e) {
        console.log("Got an error.");
        console.log(e);
    }

    try {
        await users.createUser("Hector", "Burke", "Hector@gmail.com", "Hector", "05/27/1999", "60 Elliott Avenue", "Yonkers", "NY", "10705", "9142070015", "Password123");
        const newUser = await users.getUserByUsername("Hector");
        console.log(newUser);
    } catch (e) {
        console.log("Got an error.");
        console.log(e);
    }

    // Dentists
    try {
        const doc = await doctors.createDoctor("Randy Davidson", "/public/images/RandyDavidson.jpeg", "Dentist", "Graduated from Harvard School of Dental Medicine.", ["English", "French"], "7th and Madison", "Hoboken", "NJ", "07030");
        console.log(doc);
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const doc = await doctors.createDoctor("Martin Daniels", "/public/images/MartinDaniels.jpeg", "Dentist", "Graduated from Louisiana State University School of Dentistry.", ["English"], "7 Newcastle Street", "Old Bridge", "NJ", "08857");
        console.log(doc);
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const doc = await doctors.createDoctor("Lucy Hart", "/public/images/LucyHart.jpeg", "Dentist", "Graduated from University of Minnesota School of Dentistry.", ["English", "Spanish"], "9953 Fawn Street", "Bedford", "OH", "44146");
        console.log(doc);
        doctor1Id = doc._id;
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const doc = await doctors.createDoctor("Israel Sutton", "/public/images/IsraelSutton.jpeg", "Dentist", "Graduated from Baylor College of Dentistry.", ["English"], "718 West Summit Avenue", "Moses Lake", "WA", "98837");
        console.log(doc);
        doctor2Id = doc._id;
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const doc = await doctors.createDoctor("Emma Berry", "/public/images/EmmaBerry.jpeg", "Dentist", "Graduated from University of Utah.", ["English", "Spanish", "French"], "23 University Drive", "Powder Springs", "GA", "30127");
        console.log(doc);
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    // Cardiologist
    try {
        const doc = await doctors.createDoctor("Stephanie Rose", "/public/images/StephanieRose.jpeg", "Cardiologist", "Graduated from University of Iowa College of Medicine.", ["English", "French"], "492 South Street", "Green Cove Springs", "FL", "32043");
        console.log(doc);
        doctor3Id = doc._id;
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const doc = await doctors.createDoctor("Erin Cooper", "/public/images/ErinCooper.jpeg", "Cardiologist", "Graduated from Albany School of Medicine.", ["English", "Spanish", "Arabic"], "377 Rockaway Lane", "Valley Stream", "NY", "11580");
        console.log(doc);
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const doc = await doctors.createDoctor("Richard Stokes", "/public/images/RichardStokes.jpeg", "Cardiologist", "Graduated from Drexel University College of Medicine.", ["English", "Spanish"], "46 Iroquois Street", "Lake Zurich", "IL", "60047");
        console.log(doc);
        doctor4Id = doc._id;
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const doc = await doctors.createDoctor("Russell Pierce", "/public/images/RussellPierce.jpeg", "Cardiologist", "Graduated from Florida State University College of Medicine.", ["English"], "7944 Ann Drive", "Park Ridge", "IL", "60068");
        console.log(doc);
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const doc = await doctors.createDoctor("Carlos Gomez", "/public/images/CarlosGomez.jpeg", "Cardiologist", "Graduated from Eastern Virginia School of Medicine.", ["English", "Spanish"], "224 Constitution Lane", "Jersey City", "NJ", "07302");
        console.log(doc);
        doctor5Id = doc._id;
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    // Pediatricians
    try {
        const doc = await doctors.createDoctor("Ethan Bane", "/public/images/EthanBane.jpeg", "Pediatrician", "Graduated from Boston University School of Medicine.", ["English", "French", "Arabic"], "152 Bay Meadows Street", "Leominster", "MA", "01453");
        console.log(doc);
        doctor6Id = doc._id;
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const doc = await doctors.createDoctor("Jamie Welch", "/public/images/JamieWelch.jpeg", "Pediatrician", "Graduated from Indiana University School of Medicine.", ["English", "French"], "80 Bridge Road", "Flowery Branch", "GA", "30542");
        console.log(doc);
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const doc = await doctors.createDoctor("Dianna Harmon", "/public/images/DiannaHarmon.jpeg", "Pediatrician", "Graduated from New York University School of Medicine.", ["English", "French", "Spanish"], "226 Lake Forest Avenue", "Utica", "NY", "13501");
        console.log(doc);
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const doc = await doctors.createDoctor("Darryl Watkins", "/public/images/DarrylWatkins.jpeg", "Pediatrician", "Graduated from Johns Hopkins University School of Medicine.", ["English"], "9720 Gonzales Drive", "Cumberland", "RI", "02864");
        console.log(doc);
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const doc = await doctors.createDoctor("Wilbert Parsons", "/public/images/WilbertParsons.jpeg", "Pediatrician", "Graduated from Louisiana State University School of Medicine.", ["English"], "129 Main Street", "Parlin", "NJ", "08859");
        console.log(doc);
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    // Dermatologists
    try {
        const doc = await doctors.createDoctor("Scott Clark", "/public/images/ScottClark.jpeg", "Dermatologists", "Graduated from Harvard Medical School.", ["English", "Spanish", "French"], "382 Mechanic Road", "Mount Laurel", "NJ", "08054");
        console.log(doc);
        doctor6Id = doc._id;
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const doc = await doctors.createDoctor("Blake Turner", "/public/images/BlakeTurner.jpeg", "Dermatologists", "Graduated from Harvard Medical School.", ["English", "Spanish"], "931 Lake View Street", "Winona", "MN", "55987");
        console.log(doc);
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const doc = await doctors.createDoctor("Yi Wang", "/public/images/YiWang.jpeg", "Dermatologists", "Graduated from Eastern Virginia School of Medicine.", ["English", "Chinese"], "96 Mayfair Street", "Garfield", "NJ", "07026");
        console.log(doc);
        doctor7Id = doc._id;
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const doc = await doctors.createDoctor("Sarah Price", "/public/images/SarahPrice.jpeg", "Dermatologists", "Graduated from Louisiana State University School of Medicine.", ["English"], "45 Race Street", "Buffalo Grove", "IL", "60089");
        console.log(doc);
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const doc = await doctors.createDoctor("Mike Hoffman", "/public/images/MikeHoffman.jpeg", "Dermatologists", "Graduated from Columbia University College of Physicians and Surgeons.", ["English", "French"], "70 James Street", "Troy", "NY", "12180");
        console.log(doc);
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    // Neurologists
    try {
        const doc = await doctors.createDoctor("Jennifer Bossel", "/public/images/JenniferBossel.jpeg", "Neurologists", "Graduated from Louisiana State University School of Medicine.", ["English", "Spanish"], "8867 Shirley Avenue", "Dover", "NH", "03820");
        console.log(doc);
        doctor8Id = doc._id;
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const doc = await doctors.createDoctor("Salvatore Greene", "/public/images/SalvatoreGreene.jpeg", "Neurologists", "Graduated from Albert Einstein College of Medicine.", ["English"], "806 York Drive", "Chapel Hill", "NC", "27516");
        console.log(doc);
        doc2ID = doc._id;
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const doc = await doctors.createDoctor("Jesse Lane", "/public/images/JesseLane.jpeg", "Neurologists", "Graduated from Boston University School of Medicine.", ["English", "French"], "65 Thomas Avenue", "Duarte", "CA", "91010");
        console.log(doc);
        doctor9Id = doc._id;
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const doc = await doctors.createDoctor("Ashley Morton", "/public/images/AshleyMorton.jpeg", "Neurologists", "Graduated from George Washington University School of Medicine.", ["English"], "301 Trusel Street", "Wilkes Barre", "PA", "18702");
        console.log(doc);
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const doc = await doctors.createDoctor("Ivan Frazier", "/public/images/IvanFrazier.jpeg", "Neurologists", "Graduated from Medical University of South Carolina.", ["English", "Spanish"], "96 Bay Meadows Lane", "Houston", "TX", "77016");
        console.log(doc);
        doctor10Id = doc._id;
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    // Reviews
    try {
        const user = await users.getUserByUsername("JMills");
        let userId = user._id.toString();
        const review = await reviews.createReview(doctor1Id, "This doctor was ok.", userId, 2);
        console.log(review);
        review1Id = review._id.toString();
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const user = await users.getUserByUsername("TMoran");
        let userId = user._id.toString();
        const review = await reviews.createReview(doctor1Id, "This doctor was great.", userId, 5);
        console.log(review);
        review2Id = review._id.toString();
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const user = await users.getUserByUsername("Hector");
        let userId = user._id.toString();
        const review = await reviews.createReview(doctor1Id, "This doctor was great.", userId, 5);
        console.log(review);
        review3Id = review._id.toString();
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const user = await users.getUserByUsername("Mary");
        let userId = user._id.toString();
        const review = await reviews.createReview(doctor2Id, "The office was so clean and modern.", userId, 4);
        console.log(review);
        review4Id = review._id.toString();
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const user = await users.getUserByUsername("BCollins");
        let userId = user._id.toString();
        const review = await reviews.createReview(doctor4Id, "The doctor was friendly but the wait was longer than expected.", userId, 3);
        console.log(review);
        review5Id = review._id.toString();
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const user = await users.getUserByUsername("Sally");
        let userId = user._id.toString();
        const review = await reviews.createReview(doctor7Id, "The doctor was so nice.", userId, 3);
        console.log(review);
        review6Id = review._id.toString();
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const user = await users.getUserByUsername("Kevin12");
        let userId = user._id.toString();
        const review = await reviews.createReview(doctor7Id, "The wait was too long.", userId, 1);
        console.log(review);
        review7Id = review._id.toString();
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const user = await users.getUserByUsername("TMoran");
        let userId = user._id.toString();
        const review = await reviews.createReview(doctor7Id, "I waited forever to see the doctor.", userId, 1);
        console.log(review);
        review8Id = review._id.toString();
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const user = await users.getUserByUsername("JNichols");
        let userId = user._id.toString();
        const review = await reviews.createReview(doctor7Id, "Never going back did not see the doctor until an hour after my appointment time.", userId, 1);
        console.log(review);
        review9Id = review._id.toString();
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const user = await users.getUserByUsername("Hector");
        let userId = user._id.toString();
        const review = await reviews.createReview(doctor10Id, "Best doctor ever!", userId, 5);
        console.log(review);
        review10Id = review._id.toString();
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const user = await users.getUserByUsername("Mary");
        let userId = user._id.toString();
        const review = await reviews.createReview(doctor4Id, "The office was very clean.", userId, 5);
        console.log(review);
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const user = await users.getUserByUsername("Moss");
        let userId = user._id.toString();
        const review = await reviews.createReview(doctor2Id, "The office smelled bad.", userId, 1);
        console.log(review);
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const user = await users.getUserByUsername("Joy7");
        let userId = user._id.toString();
        const review = await reviews.createReview(doctor1Id, "The doctor was friendly.", userId, 4);
        console.log(review);
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const user = await users.getUserByUsername("Hector");
        let userId = user._id.toString();
        const review = await reviews.createReview(doctor2Id, "Don't go to this doctor.", userId, 4);
        console.log(review);
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    // Comments
    try {
        const user = await users.getUserByUsername("Mary");
        let userId = user._id.toString();
        const comment = await comments.addComment(userId, review2Id, "I agree with your review.");
        console.log(comment);
        comment1Id = comment.commentID.toString();
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    // try {
    //     const deleted = await comments.deleteComment(comment1Id, review2Id);

    //     console.log(deleted);
    // } catch (e) {
    //     console.log("Got an error!");
    //     console.log(e);
    // }

    try {
        const user = await users.getUserByUsername("Hector");
        let userId = user._id.toString();
        const comment = await comments.addComment(userId, review2Id, "I disagree.");
        comment2Id = comment.commentID.toString();
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const user = await users.getUserByUsername("TMoran");
        let userId = user._id.toString();
        const comment = await comments.addComment(userId, review7Id, "I waited over an hour.");
        comment3Id = comment.commentID.toString();
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const user = await users.getUserByUsername("Sally");
        let userId = user._id.toString();
        const comment = await comments.addComment(userId, review7Id, "I waited long too.");
        comment4Id = comment.commentID.toString();
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const user = await users.getUserByUsername("Mary");
        let userId = user._id.toString();
        const comment = await comments.addComment(userId, review7Id, "He really is so nice.");
        comment5Id = comment.commentID.toString();
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const user = await users.getUserByUsername("Kevin12");
        let userId = user._id.toString();
        const comment = await comments.addComment(userId, review10Id, "I love him.");
        comment6Id = comment.commentID.toString();
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const user = await users.getUserByUsername("JNichols");
        let userId = user._id.toString();
        const comment = await comments.addComment(userId, review9Id, "I love him.");
        comment7Id = comment.commentID.toString();
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const user = await users.getUserByUsername("Moss");
        let userId = user._id.toString();
        const comment = await comments.addComment(userId, review8Id, "I agree.");
        comment8Id = comment.commentID.toString();
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const user = await users.getUserByUsername("Joy7");
        let userId = user._id.toString();
        const comment = await comments.addComment(userId, review8Id, "I agree.");
        comment9Id = comment.commentID.toString();
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const user = await users.getUserByUsername("Hector");
        let userId = user._id.toString();
        const comment = await comments.addComment(userId, review4Id, "It does look so modern.");
        comment10Id = comment.commentID.toString();
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    // Comment Likes
    try {
        const user = await users.getUserByUsername("Kevin12");
        let userId = user._id.toString();
        const commentLike = await comments.addLikeComment(comment1Id, review2Id, userId);
        console.log(commentLike);
    } catch (e){
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const user = await users.getUserByUsername("Hector");
        let userId = user._id.toString();
        const commentLike = await comments.addLikeComment(comment1Id, review2Id, userId);
        console.log(commentLike);
    } catch (e){
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const user = await users.getUserByUsername("Mary");
        let userId = user._id.toString();
        const commentLike = await comments.addLikeComment(comment3Id, review7Id, userId);
        console.log(commentLike);
    } catch (e){
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const user = await users.getUserByUsername("Sally");
        let userId = user._id.toString();
        const commentLike = await comments.addLikeComment(comment3Id, review7Id, userId);
        console.log(commentLike);
    } catch (e){
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const user = await users.getUserByUsername("JMills");
        let userId = user._id.toString();
        const commentLike = await comments.addLikeComment(comment4Id, review7Id, userId);
        console.log(commentLike);
    } catch (e){
        console.log("Got an error!");
        console.log(e);
    }

    // Comment Dislikes
    try {
        const user = await users.getUserByUsername("Joy7");
        let userId = user._id.toString();
        const commentLike = await comments.addDislikeComment(comment5Id, review7Id, userId);
        console.log(commentLike);
    } catch (e) {
        console.log("Got an error!");
        console.log(e);
    }

    try {
        const user = await users.getUserByUsername("Joy7");
        let userId = user._id.toString();
        const commentLike = await comments.addDislikeComment(comment6Id, review10Id, userId);
        console.log(commentLike);
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
