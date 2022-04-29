const mongoCollections = require("../config/mongoCollections");
const REVIEWS = mongoCollections.reviews;
const USERS = mongoCollections.users;
const DOCTORS = mongoCollections.doctors;
let { ObjectId } = require('mongodb');


const exported = {
    createDoctor: async (name, profilePicture, speciality, about, languages, address, city, state, zip) => {

        if (!name) {
            throw "name not supplied or undefined";
        }
        if (typeof name !== 'string' || name.trim().length === 0) {
            throw "name parameter has to be a nonempty string";
        }
        name = name.trim();

        if (!speciality) {
            throw "speciality not supplied or undefined";
        }
        if (typeof speciality !== 'string' || speciality.trim().length === 0) {
            throw "speciality has to be a nonempty string";
        }
        speciality = speciality.trim();

        if (!about) {
            throw "about not supplied or undefined";
        }
        if (typeof about !== 'string' || about.trim().length === 0) {
            throw "about has to be a nonempty string";
        }
        about = about.trim();



        if (!Array.isArray(languages)) {
            throw "languages parameter must be an array";
        }

        if (languages.length === 0) {
            throw "must include at least 1 language for the doctor";
        }

        languages.forEach(value => {
            if (typeof value !== 'string' || value.trim().length == 0) {
                throw "language elements must be non-empty strings";
            }
        });

        if (!address) {
            throw "address not supplied or undefined";
        }
        if (typeof address !== 'string' || address.trim().length === 0) {
            throw "address parameter has to be a nonempty string";
        }
        address = address.trim();


        if (!city) {
            throw "address not supplied or undefined";
        }
        if (typeof city !== 'string' || city.trim().length === 0) {
            throw "address parameter has to be a nonempty string";
        }
        city = city.trim();

        if (!state) {
            throw "state not supplied or undefined";
        }
        if (typeof state !== 'string' || state.trim().length === 0) {
            throw "state parameter has to be a nonempty string";
        }
        state = state.trim();

        if (state.length != 2) {
            throw "invalid US state";
        }

        if (!zip) {
            throw "zipcode not supplied or undefined";

        }

        if (typeof zip !== 'string' || zip.trim().length === 0) {
            throw "zip parameter has to be a nonempty string";
        }
        zip = zip.trim();


        if (!(/^\d+$/.test(zip)) || zip.length != 5) {
            throw "invalid zip";
        }

        const doctorCollection = await DOCTORS();


        let newDoctor = {
            _id: ObjectId(),
            name: name,
            profilePicture: profilePicture,
            speciality: speciality,
            about: about,
            languages: languages,
            address: address,
            city: city,
            state: state,
            zip: zip,
            rating: null,
            reviews: []


        }

        const updateInfo = await doctorCollection.insertOne(newDoctor);

        if (updateInfo.modifiedCount === 0) {
            throw "could not add the doctor successfully";

        }

        newDoctor._id = newDoctor._id.toString();

        return newDoctor;
    },


}
module.exports = exported;
