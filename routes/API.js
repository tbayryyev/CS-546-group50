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
            if (req.session.username) {
                res.render('pages/home_page', { docs: topDoctors, authenticated: true, username: req.session.username});
            } else {
                res.render('pages/home_page', { docs: topDoctors, authenticated: false});
            }
        } catch (e) {
            res.status(404).json({ error: e });
        }
    });

module.exports = router;
