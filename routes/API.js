const express = require('express');
const router = express.Router();
const Data = require('../data');
const doctorData = Data.doctors;

router
    .route('')
    .get(async (req, res) => {
        res.render('pages/home_page');
    });

module.exports = router;