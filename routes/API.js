const express = require('express');
const router = express.Router();
const Data = require('../data');
const doctorData = Data.doctors;

router
    .route('')
    .get(async (req, res) => {
        try {
            const specialities = await doctorData.getAllSpecialities();
            res.render('pages/home_page', { specialities: specialities, });
        } catch (e) {
            res.status(404).json(e.message);
        }

    });

module.exports = router;