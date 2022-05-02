const mongoCollections = require("../config/mongoCollections");
const REVIEWS = mongoCollections.reviews;
const USERS = mongoCollections.users;
const DOCTORS = mongoCollections.doctors;
let { ObjectId } = require('mongodb');
const validation = require('../validation');



const exported = {
    getDoctor : async (doctorId) => {
      doctorId = validation.checkId(doctorId,"doctorId");
      const doctorCollection = await DOCTORS();
      const doctor = await doctorCollection.findOne({ _id: ObjectId(doctorId) });
      if (doctor === null || doctor === undefined) throw 'No doctor with that id';
      doctor._id = doctor._id.toString();
      return doctor;
    },
    createDoctor: async (name, profilePicture, speciality, about, languages, address, city, state, zip, rating) => {

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
        speciality = speciality.toLowerCase();


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
        zip = zip.toUpperCase();


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
            rating: rating,

        }

        const updateInfo = await doctorCollection.insertOne(newDoctor);

        if (updateInfo.modifiedCount === 0) {
            throw "could not add the doctor successfully";

        }

        newDoctor._id = newDoctor._id.toString();

        return newDoctor;
    },
    getAllSpecialities: async () => {
        const doctorCollection = await DOCTORS();

        const docs = await doctorCollection.find({}).toArray();

        let specialities = [];

        for (doctor of docs) {
            if (specialities.indexOf(doctor.speciality) == -1) {
                specialities.push(doctor.speciality);

            }
        }
        return specialities;


    },
    highestRatedDoctors: async (speciality) => {
        if (!speciality) {
            throw "speciality not supplied or undefined";
        }
        if (typeof speciality !== 'string' || speciality.trim().length === 0) {
            throw "speciality has to be a nonempty string";
        }
        speciality = speciality.trim();
        // speciality should be lowercase so that we can always find it when doing the rating system
        //speciality = speciality.toLowerCase();

        const doctorCollection = await DOCTORS();

        const docs = await doctorCollection.find({ speciality: speciality }).toArray();

        if (docs.length == 0) {
            throw "No doctors exist with that speciality";
        }



        let topRated = docs.sort(function (a, b) {
            return Number(a.rating) < Number(b.rating) ? 1 : -1;
        });

        return topRated;


    },
    highestRatedDoctor: async (specialities) => {
      //validation checkstringArray
      specialities = validation.checkStringArray(specialities,"specialities");

        // if (!Array.isArray(specialities)) {
        //     throw "specialities parameter must be an array";
        // }
        //
        // if (specialities.length === 0) {
        //     throw "must include at least 1 speciality";
        // }
        //
        // specialities.forEach(value => {
        //     if (typeof value !== 'string' || value.trim().length == 0) {
        //         throw "specialities elements must be non-empty strings";
        //     }
        // });

        let highestRatedDocs = [];

        for (specialitity of specialities) {
            const hd = await exported.highestRatedDoctors(specialitity);
            highestRatedDocs.push(hd[0]);


        }

        let highestRatedDocs1 = [];
        let count = 0;
        for (highest of highestRatedDocs) {
            highestRatedDocs1.push({ speciality: specialities[count], doctor: highest });
            count++;

        }

        return highestRatedDocs1;



    }


}
module.exports = exported;
