const usersData = require('./users');
const reviewsData = require('./reviews');
const doctorsData = require('./doctors');
const appointmentData = require('./appointments');
const commentsData = require('./comments');

module.exports = {
    users: usersData,
    reviews: reviewsData,
    doctors: doctorsData,
    appointments : appointmentData,
    comments:commentsData
};
