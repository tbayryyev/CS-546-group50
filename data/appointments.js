let { ObjectId } = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const appointments = mongoCollections.appointments;
const doctors = mongoCollections.doctors;


const errChkIsString = function errChkIsString(str){
    if(typeof str !== 'string'){
        throw str+", in the argument is not a string";
    }
}
const errChkStringIsEmpty = function errChkStringIsEmpty(str){
    if(str.trim().length === 0){
        throw "Length of String in the argument should be greater than zero";
    }
}

const addDaysdateStr = function addDaysdateStr(dtStr,numDays){
  const dt = new Date(dtStr);

  dt.setDate(dt.getDate() + numDays);
  const curDay = new Date(dt);
const year = curDay.getFullYear();
let month = curDay.getMonth() + 1;
let day = curDay.getDate();

if (day < 10) day = '0' + day;
if (month < 10) month = '0' + month;
return month + '-' + day + '-' + year;

}
const curDateStr = function curDateStr(){
    const curDay = new Date();
  const year = curDay.getFullYear();
  let month = curDay.getMonth() + 1;
  let day = curDay.getDate();
  
  if (day < 10) day = '0' + day;
  if (month < 10) month = '0' + month;
  return month + '-' + day + '-' + year;
  
  }

async function updateDoctorCalendar(doctorId,aptDate,aptTime,mode){
  resArray = []
  max_date = "";
  var docUpdtOne = {};
  const doctorCollection = await doctors();
  const doctorOne = await doctorCollection.findOne({ _id: ObjectId(doctorId) });
  if (doctorOne === null || doctorOne === undefined) throw 'No doctor with that id';
  
if(mode === "pull"){
   docUpdtOne = await doctorCollection.findOneAndUpdate(
    { _id: ObjectId(doctorId),"timeSlots.dt" : aptDate},
    { $pull: {"timeSlots.$.tm": aptTime}},
    { returnDocument: "after" }
  );}
  else if (mode === "push"){
    docUpdtOne = await doctorCollection.findOneAndUpdate(
      { _id: ObjectId(doctorId),"timeSlots.dt" : aptDate},
      { $push: {"timeSlots.$.tm": aptTime}},
      { returnDocument: "after" }
    );
  }

  for (let x of docUpdtOne.value.timeSlots){

    if(x.dt > max_date){
      max_date = x.dt;
    }
    if(x.dt >= curDateStr()){
      resArray.push(x);
    }
  }

  if(resArray.length < 7){
    resArray.push({"dt":addDaysdateStr(max_date,1),"tm":["8:00","9:00","10:00"]})
  }
  
  await doctorCollection.updateOne(
    { _id: ObjectId(doctorId)},
    { $set: {"timeSlots": resArray}}
  );
}



module.exports = {
    async getAll() {
        var resultArr = [];
        const appointmentCollection = await appointments();
        const appointmentList = await appointmentCollection.find({}).toArray();
        if (!appointmentList) throw 'Could not get all appointments';
        for(x of appointmentList){
            let resObj = {
                _id : x._id.toString(),
                doctorId: x.doctorId,
                userId: x.userId,
                aptDate: x.aptDate,
                aptTime: x.aptTime,
                message: x.message,
                conditions: x.conditions
            }
            resultArr.push(resObj)
        }
        return resultArr;
      },

    async getAllAppointmentsForUser(userId){
      var resultArr = [];
      const appointmentCollection = await appointments();
      const appointmentList = await appointmentCollection.find({userId:userId.trim()}).toArray();
      if (!appointmentList) throw 'Could not get all appointments';
      for(x of appointmentList){
          let resObj = {
              _id : x._id.toString(),
              doctorId: x.doctorId,
              userId: x.userId,
              aptDate: x.aptDate,
              aptTime: x.aptTime,
              message: x.message,
              conditions: x.conditions
          }
          resultArr.push(resObj)
      }
      return resultArr;
    },
    async createAppointment(doctorId,userId,aptDate,aptTime,message,conditions){
        if(arguments.length < 6){
            throw "All fields need to have valid values";
        }
        if(arguments.length > 6){
            throw "Too many Aruguments, should pass Six arguments";
        }
        //doctorId check
        errChkIsString(doctorId);
        errChkStringIsEmpty(doctorId);
        doctorId = doctorId.trim();
        if (!ObjectId.isValid(doctorId)) throw 'Invalid object ID';

        //userId check
        errChkIsString(userId);
        errChkStringIsEmpty(userId);
        userId = userId.trim();
        if (!ObjectId.isValid(userId)) throw 'Invalid object ID';

        //aptDate check
        errChkIsString(aptDate);
        errChkStringIsEmpty(aptDate);
        //validDate(aptDate);
        //const aptDateMod = aptDate.trim();

        //aptTime check
        errChkIsString(aptTime);
        errChkStringIsEmpty(aptTime);
        //validTime(aptTime);
        //const aptTimeMod = aptTime.trim();

        //message check
        errChkIsString(message);
        errChkStringIsEmpty(message);
        message = message.trim();
        
        //conditions check
        errChkIsString(conditions);
        errChkStringIsEmpty(conditions); 
               
         const newAppointmentObjId = new ObjectId();
        const newAppointment ={
            _id: newAppointmentObjId,
            doctorId: doctorId,
            userId: userId,
            aptDate: aptDate,
            aptTime: aptTime,
            message: message,
            conditions: conditions
        }
        
        const appointmentsCollection = await appointments();
        const insertInfo = await appointmentsCollection.insertOne(newAppointment);
        if (!insertInfo.acknowledged || !insertInfo.insertedId){
            throw 'Could not add Appointment';
        }
       await updateDoctorCalendar(doctorId,aptDate,aptTime,"pull");
      const newId = insertInfo.insertedId.toString();
      const appointmentCreated = await this.get(newId);
      return appointmentCreated;
    },

    async get(id){
        if(arguments.length < 1){
          throw "All fields need to have valid values";
      }
      if(arguments.length > 1){
          throw "Too many Aruguments, should pass one argument";
      }
          var result = {};
        if (!id) throw 'Must Provide an id to search for';
        if (typeof id !== 'string') throw 'Id must be a string';
        if (id.trim().length === 0)
          throw 'Id cannot be an empty string or just spaces';
        id = id.trim();
        if (!ObjectId.isValid(id)) throw 'Invalid object ID';
        const appointmentCollection = await appointments();
        const appointmentOne = await appointmentCollection.findOne({ _id: ObjectId(id) });
        if (appointmentOne === null || appointmentOne === undefined) throw 'No appointment with that id';
        result = {
            _id : appointmentOne._id.toString(),
            doctorId: appointmentOne.doctorId,
            userId: appointmentOne.userId,
            aptDate: appointmentOne.aptDate,
            aptTime: appointmentOne.aptTime,
            message: appointmentOne.message,
            conditions: appointmentOne.conditions
        }
        return result;
      },
      
      async updateAppointment(id, aptDatePrv,aptTimePrv,aptDate, aptTime){
        if(arguments.length < 5){
            throw "All fields need to have valid values";
        }
        if(arguments.length > 5){
            throw "Too many Aruguments, should pass five arguments";
        }
        //id check
        errChkIsString(id);
        errChkStringIsEmpty(id);
        id = id.trim();
        if (!ObjectId.isValid(id)) throw 'Invalid object ID';

        //aptDate check
        errChkIsString(aptDate);
        errChkStringIsEmpty(aptDate);
       const aptDateMod = aptDate.trim();

        //aptTime check
        errChkIsString(aptTime);
        errChkStringIsEmpty(aptTime);
        const aptTimeMod = aptTime.trim();

         try{
            fetchObj = await this.get(id);
            
        }
        catch(e){
            throw 'Could not update appointment with id of '+id;
        }

        
          const updatedAppointment = {
            aptDate: aptDateMod,
            aptTime: aptTimeMod,
          };
          const appointmentCollection = await appointments();
          const updatedInfo = await appointmentCollection.updateOne(
            { _id: ObjectId(id) },
            { $set: updatedAppointment }
          );
         /*
          if (updatedInfo.modifiedCount === 0) {
            throw 'could not update band successfully';
          }
          */
          await updateDoctorCalendar(fetchObj.doctorId,aptDatePrv,aptTimePrv,"push");
          await updateDoctorCalendar(fetchObj.doctorId,aptDateMod,aptTimeMod,"pull");
          return await this.get(id);  
        },

      async remove(id) {
        if(arguments.length < 1){
          throw "All fields need to have valid values";
      }
      if(arguments.length > 1){
          throw "Too many Aruguments, should pass one arguments";
      }
        if (!id) throw 'Must Provide an id to search for';
        if (typeof id !== 'string') throw 'Id must be a string';
        if (id.trim().length === 0)
          throw 'id cannot be an empty string or just spaces';
        id = id.trim();
        if (!ObjectId.isValid(id)) throw 'Invalid object ID';
    try{
        var  fetchObj = await this.get(id);
    }
    catch(e){
        throw 'Appointment with id of '+id+' does not exist';
    }
        const appointmentCollection = await appointments();
        const deletionInfo = await appointmentCollection.deleteOne({ _id: ObjectId(id) });
        
        if (deletionInfo.deletedCount === 0) {
          throw 'Could not delete appointment with id of '+id;
        }
        await updateDoctorCalendar(fetchObj.doctorId,fetchObj.aptDate,fetchObj.aptTime,"push");
        return {"appointmentId": '+id+',userId:fetchObj.userId, "deleted" : true};
      },
      async getdocCalender(id) {
        if(arguments.length < 1){
            throw "All fields need to have valid values";
        }
        if(arguments.length > 1){
            throw "Too many Aruguments, should pass one argument";
        }
            var result = {};
          if (!id) throw 'Must Provide an id to search for';
          if (typeof id !== 'string') throw 'Id must be a string';
          if (id.trim().length === 0)
            throw 'Id cannot be an empty string or just spaces';
          id = id.trim();
          if (!ObjectId.isValid(id)) throw 'Invalid object ID';
          const doctorCollection = await doctors();
          const doctorOne = await doctorCollection.findOne({ _id: ObjectId(id) });
          if (doctorOne === null || doctorOne === undefined) throw 'No doctor with that id';
          result = {
              _id : doctorOne._id.toString(),
              timeSlots: doctorOne.timeSlots
          }
          return result;
    },
      errChkIsString,
      errChkStringIsEmpty
}