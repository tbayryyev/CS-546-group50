const mongoCollections = require("../config/mongoCollections");
const REVIEWS = mongoCollections.reviews;
const USERS = mongoCollections.users;
const DOCTORS = mongoCollections.doctors;
let { ObjectId } = require('mongodb');
const validation = require('../validation');
const moment = require('moment');
const appointmentData = require('../data/appointments');

const refreshDoctorCalendar = function refreshDoctorCalendar  (docOne){
resArray = [];
max_date = "";
for (let x of docOne.timeSlots){
    var tmpTm = [];
    if(x.dt > max_date){
      max_date = x.dt;
    }
   if(x.dt >= appointmentData.curDateStr()){
     for (let arrTmElement of x.tm){
       if(new Date(x.dt+" "+arrTmElement) > new Date()) {
        tmpTm.push(arrTmElement);
       }
     }
     //console.log("tmpTm : "+tmpTm);
      resArray.push({"dt":x.dt,
     "tm":appointmentData.sortDistinctArray(tmpTm)} );
    }
  }
  if(resArray.length < 7){
    resArray.push({"dt":appointmentData.addDaysdateStr(max_date,1),"tm":["08:00","09:00","10:00",
                                                          "11:00","12:00","13:00",
                                                          "14:00","15:00","16:00"]})
  }
  return resArray;

}

const exported = {
   /*
    getDoctor: async (doctorId) => {
        doctorId = validation.checkId(doctorId, "doctorId");
        const doctorCollection = await DOCTORS();
        const doctor = await doctorCollection.findOne({ _id: ObjectId(doctorId) });
        if (doctor === null || doctor === undefined) throw 'No doctor with that id';
        doctor._id = doctor._id.toString();
        return doctor;
    },
    */
   //Commented the above getDoctor(doctorId) method, to accomodate the refresh of doctor calander 
   //during the doctor fetch in the below method
    getDoctor: async (doctorId) => {
        doctorId = validation.checkId(doctorId, "doctorId");
        const doctorCollection = await DOCTORS();
        const doctorOne = await doctorCollection.findOne({ _id: ObjectId(doctorId) });
        if (doctorOne === null || doctorOne === undefined) throw 'No doctor with that id';
        const timeSlotArr = refreshDoctorCalendar(doctorOne);
        const doctor = await doctorCollection.findOneAndUpdate(
            { _id: ObjectId(doctorId)},
            { $set: {"timeSlots" : timeSlotArr}},
            { returnDocument: "after" }
          );
        //console.log("Refreshed Doctor calander : "+JSON.stringify(doctor))
        doctor.value._id = doctor.value._id.toString();
        return doctor.value;
    },

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
//For doctor calender
        timeSlots = [];
        tm_val = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00"]
        
        curDate =  new Date();
        var startDate =  curDate.setDate(curDate.getDate() + 1);
        const endDate =  curDate.setDate(curDate.getDate() + 7);
        
        while (startDate < endDate){
            timeSlots.push({"dt":moment(startDate).format('MM-DD-YYYY'),"tm":tm_val});
            startDate = startDate + 86400000
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
            rating: 0,
            timeSlots: timeSlots

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
        // gets a sorted list of doctors from that speciality
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
            throw "No doctors exist with the supplied speciality";
        }



        let topRated = docs.sort(function (a, b) {
            return Number(a.rating) < Number(b.rating) ? 1 : -1;
        });

        return topRated;


    },
    highestRatedDoctor: async (specialities) => {
        //validation checkstringArray
        // gets the highest rated doctor from each speciality provided
        specialities = validation.checkStringArray(specialities, "specialities");



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
