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
                let states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
                res.render('pages/home_page', { docs: topDoctors, authenticated: false, states: states});
            }
        } catch (e) {
            res.status(404).json({ error: e });
        }

    });

module.exports = router;
