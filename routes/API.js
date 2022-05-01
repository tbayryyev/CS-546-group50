const express = require('express');
const router = express.Router();
const Data = require('../data');
const doctorData = Data.doctors;

router
    .route('')
    .get(async (req, res) => {
        try {
            const specialities = await doctorData.getAllSpecialities();
            const topDoctors = await doctorData.highestRatedDoctor(specialities);
            res.render('pages/home_page', { docs: topDoctors });
        } catch (e) {
            res.status(404).json(e);
        }

    });

module.exports = router;
