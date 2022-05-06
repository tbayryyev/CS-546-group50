
const express = require('express');
const router = express.Router();
const appointmentData = require('../data/appointments');
const flash = require('connect-flash');
const Data = require('../data');
const doctorData = Data.doctors;
const userData = Data.users;


let { ObjectId, ConnectionClosedEvent } = require('mongodb');


router.route('/schedule/:doctorId/:aptDate/:aptTime')
    .get(async (req,res) => {
      var aptDate = "";
      var aptTime = "";
      var doctorId = "";
      var userId = "";
      var userFullName = "";
      var doctorName = "";
      var authenticateFlag = false;

      try{
      
         aptDate = req.params.aptDate.trim();
         aptTime = req.params.aptTime.trim();
         doctorId = req.params.doctorId.trim();
        
         if(!aptDate || !aptTime || !doctorId){
          throw "apointment Date/Time or doctorId is mising in the request"
        }
        
        //console.log("req.username : schedule "+req.session.username);
        
        //if(req.session.username === undefined || req.session.username === ""){
          if(!req.session.username){
          throw "No User Logged in";
        }
       else {
          authenticateFlag = true;
        }
        let userOne = await userData.getUserByUsername(req.session.username);
        userId = userOne._id.toString();
        userFullName = userOne.firstName+" "+userOne.lastName;
        const doctorRSI = await doctorData.getDoctor(doctorId);
        doctorName = doctorRSI.name;
      
 
       res.render('pages/appointments',{userId:userId,
                                        userFullName:userFullName,
                                        doctorId:doctorId,
                                        doctorName:doctorName,
                                        aptDate: aptDate, aptTime:aptTime,
                                        authenticated:authenticateFlag
                                    });
        }
        catch(e){
          
          const errorMessage = typeof e === 'string' ? e : e.message;
          //console.log("In catch block ********* "+errorMessage); 
            //res.status(404).json(e.message);
            res.status(404).render('pages/appointments',{
              userId:userId,
              userFullName:userFullName,
              doctorId:doctorId,
              doctorName:doctorName,
              aptDate: aptDate, aptTime:aptTime,
              authenticated:authenticateFlag,
              hasError: true, errorMessage:errorMessage
          });
            return;
        }
    });

    router.route('/reschedule/:doctorId/:aptDate/:aptTime')
    .post(async (req,res) => {
      var authenticateFlag = false;
        try{

        const aptDate = req.params.aptDate.trim();
        const aptTime = req.params.aptTime.trim();
        const doctorId = req.params.doctorId.trim();
        const doctorRSI = await doctorData.getDoctor(doctorId);
      

        const postResAppointmentData = req.body;
        const { appointmentId,aptDatePrvRs,aptTimePrvRs,messagePrvRs,conditionsPrvRs} = postResAppointmentData;
        console.log("req.username : "+req.session.username);

        if(!req.session.username ){
          throw "No User Logged in";
        }
        else{
          authenticateFlag = true;
        }
        userOne = await userData.getUserByUsername(req.session.username)
      
        console.log("From rescheduleAppointment => "+" appointmentId :"+appointmentId+" aptDatePrvRs : "+aptDatePrvRs +" aptTimePrvRs : "+aptTimePrvRs+
        " messagePrvRS : "+messagePrvRs+" conditionsPrvRS :"+conditionsPrvRs+" doctorId : "+doctorRSI.name)

        res.render('pages/appointmentReschedule',{userId:userOne._id.toString(),appointmentId:appointmentId,
                                        doctorId:doctorId,
                                        doctorName:doctorRSI.name,
                                        aptDate: aptDate, aptTime:aptTime,
                                        aptDatePrv:aptDatePrvRs,aptTimePrv:aptTimePrvRs,
                                        message:messagePrvRs, conditions:conditionsPrvRs,
                                        authenticated:authenticateFlag});
        }
        catch(e){
          const errorMessage = typeof e === 'string' ? e : e.message;
          //res.status(404).json(e.message);
          res.status(404).render('pages/appointmentReschedule',{hasError: true, 
          errorMessage:errorMessage,authenticated:authenticateFlag});
            return;
        }
    });


    router.route('/userappointmentlist/:userId')
    .get(async (req,res) => {
      var authenticateFlag = false;
        try{
        const userId = req.params.userId.trim();
        const appointmentRS = await appointmentData.getAllAppointmentsForUser(userId);
        const userRS = await userData.getUser(userId);
        

        if(!req.session.username ){
          throw "No User Logged in";
        }
        else{
          authenticateFlag = true;
        }
        
        res.render('pages/patients',{title:'Patient Home Page',
                                     appointmentResultSet:appointmentRS,
                                    userFullName: userRS.firstName+" "+userRS.lastName,
                                    userEmail: userRS.email,
                                    userPhoneNumber:userRS.phoneNumber,
                                  userProfilePicture:userRS.profilePicture,
                                  authenticated:authenticateFlag});
        }
        catch(e){
            const errorMessage = typeof e === 'string' ? e : e.message;
            //res.status(404).json(e.message);
            res.status(404).render('pages/patients',{hasError: true, 
              errorMessage:errorMessage,
              authenticated:authenticateFlag});
            return;
        }
    });


router.route('/:userId')
.post(async (req,res) =>{
const postAppointmentData = req.body;
const userId = req.params.userId.trim();
aptDateMod = '';
aptTimeMod = '';
conditionsMod = [];

const { userFullName,doctorName,doctorId,aptDate,aptTime,message,conditions } = postAppointmentData;
console.log("doctorId : "+doctorId +" aptDate : "+aptDate+
" aptTime : "+aptTime+" message :"+message+" conditions : "+conditions)
  if (!doctorId || !aptDate || !aptTime || !message || !conditions ) {

    //res.status(400).json(JSON.stringify({ error: 'All fields need to have valid values' }));
   
    res.status(400).render('pages/appointments',{hasError: true,userId:userId,
      userFullName:userFullName,doctorName:doctorName,
      doctorId:doctorId,aptDate:aptDate,aptTime:aptTime,message:message,conditions:conditions,
       errorMessage : 'All fields need to have valid values'});
       
    return;
  }

  try{


    //message check
    appointmentData.errChkIsString(message);
    appointmentData.errChkStringIsEmpty(message);


    //conditions check
    appointmentData.errChkIsString(conditions);
    appointmentData.errChkStringIsEmpty(conditions);


  }
  catch (e) {
    const errorMessage = typeof e === 'string' ? e : e.message;
    res.status(400).json({ error: errorMessage });
    return;
  }

  try {

    const newAppointmentPost = await appointmentData.createAppointment( doctorId.trim(),
                                                             userId.trim(),
                                                             aptDate.trim(),
                                                             aptTime.trim(),
                                                             message.trim(),
                                                             conditions.trim()
                                                             );
  req.flash('success',"Appointment on "+
  newAppointmentPost.aptDate+" "+newAppointmentPost.aptTime+
  " created successfully");
    res.redirect('/appointments/userappointmentlist/'+newAppointmentPost.userId);
  } catch (e) {
    const errorMessage = typeof e === 'string' ? e : e.message;
    res.status(500).json({ error: errorMessage });
    return;
  }
});

router.route('/:id')
    .get(async (req,res) => {

        if (!ObjectId.isValid(req.params.id.trim())) {
            res.status(400).json({ error: 'Invalid ObjectId' });
            return;
        }
        try{

        const appointmentRSI = await appointmentData.get(req.params.id.trim());

        res.json(appointmentRSI)

        }
        catch(e){
          const errorMessage = typeof e === 'string' ? e : e.message;
          res.status(404).json(errorMessage);
          return;
        }
    });

    router.route('/reschedule/:id')
    .get(async (req,res) => {
      
      var authenticateFlag = false;
        if (!ObjectId.isValid(req.params.id.trim())) {
            res.status(400).json({ error: 'Invalid ObjectId' });
            return;
        }
        if (!req.session.username) {
          "No user logged in";
        }
        else{
          authenticateFlag = true;
        }
        try{

        const appointmentRSI = await appointmentData.get(req.params.id.trim());
        res.render('pages/appointmentReschedule',{appointmentId:appointmentRSI._id.toString(),
                                                  userId:appointmentRSI.userId,
                                                  doctorId:appointmentRSI.doctorId,
                                                  doctorName:appointmentRSI.doctorName,
                                                  aptDate: appointmentRSI.aptDate,
                                                  aptTime:appointmentRSI.aptTime,
                                                  message:appointmentRSI.message,
                                                  conditions:appointmentRSI.conditions,
                                                  rescheduleFlag:true,
                                                  authenticated:authenticateFlag});
        }
        catch(e){
          const errorMessage = typeof e === 'string' ? e : e.message;
         // res.status(404).json(errorMessage);
          res.status(404).render('pages/appointmentReschedule',{hasError: true, 
            errorMessage:errorMessage,
            authenticated:authenticateFlag});
          return;
        }
    });

    router.route('/update/:id')
    .post(async (req,res) =>{
      const objId = req.params.id.trim();
      if (!ObjectId.isValid(objId)) {
        res.status(400).json({ error: 'Invalid ObjectId' });
        return;
    }

    try{

      await appointmentData.get(objId);
      }
      catch(e){
        const errorMessage = typeof e === 'string' ? e : e.message;
        res.status(404).json(errorMessage);
          return;
      }

    const putAppointmentData = req.body;


    const { aptDatePrv,aptTimePrv,aptDate,aptTime } = putAppointmentData;

      if (!aptDate || !aptTime  ) {
        //res.status(400).json({ error: 'All fields need to have valid values' });
        res.status(404).render('pages/appointmentReschedule',{hasError: true, errorMessage : 'All fields need to have valid values'});
        return;
      }

      try{


        //aptDate check
        appointmentData.errChkIsString(aptDate);
        appointmentData.errChkStringIsEmpty(aptDate);



        //aptTime check
        appointmentData.errChkIsString(aptTime);
        appointmentData.errChkStringIsEmpty(aptTime);


        console.log("putAppointmentData : "+aptDate+" : "+aptTime)


      }
      catch (e) {
        const errorMessage = typeof e === 'string' ? e : e.message;
        //res.status(400).json(errorMessage);
        res.status(400).render('pages/appointmentReschedule',{hasError: true, errorMessage : errorMessage});
        return;
      }

      try {

        const newAppointmentPut = await appointmentData.updateAppointment(objId,
                                                               aptDatePrv,
                                                               aptTimePrv,
                                                               aptDate.trim(),
                                                               aptTime.trim()
                                                               );

      req.flash('success',"Appointment on "+
      newAppointmentPut.aptDate+" "+newAppointmentPut.aptTime+
                " rescheduled successfully");
      
      res.redirect('/appointments/userappointmentlist/'+newAppointmentPut.userId);

      } catch (e) {
        const errorMessage = typeof e === 'string' ? e : e.message;
        //res.status(500).json(errorMessage );
        res.status(500).render('pages/appointmentReschedule',{hasError: true, errorMessage : errorMessage});
        return;
      }
    });

    router.route('/delete/:id')
    .delete(async (req,res) => {
        if (!ObjectId.isValid(req.params.id.trim())) {
            res.status(400).json({ error: 'Invalid ObjectId' });
            return;
        }
        try{

        const appointmentRSD = await appointmentData.remove(req.params.id.trim());

        res.json(appointmentRSD);
        }
        catch(e){
          const errorMessage = typeof e === 'string' ? e : e.message;
          //res.status(404).json(errorMessage);
          res.status(404).render('pages/patients',{title:'Patient Home Page'
            //, appointmentResultSet:appointmentRS
            ,hasError: true,
             errorMessage : errorMessage});
            return;
        }
    });

    router.route('/doctorcalendar/:id')
    .get(async (req,res) => {

        if (!ObjectId.isValid(req.params.id.trim())) {
            res.status(400).json({ error: 'Invalid ObjectId' });
            return;
        }
        try{

        const doctorRSI = await appointmentData.getdocCalender(req.params.id.trim());

        res.render('pages/doctorcalendar',{title:'Doctor Home Page',doctorId :doctorRSI._id.toString(),timeSlotList : doctorRSI.timeSlots});
        }
        catch(e){
          const errorMessage = typeof e === 'string' ? e : e.message;
          res.status(404).json(errorMessage);
          return;
        }
    });
    router.route('/doctorcalendar/reschedule/:id')
    .post(async (req,res) => {
      var authenticateFlag = false;
        if (!ObjectId.isValid(req.params.id.trim())) {
            res.status(400).json({ error: 'Invalid ObjectId' });
            return;
        }

        if (!req.session.username) {
          "No user logged in";
        }
        else{
          authenticateFlag = true;
        }

        try{
       //Commented below for integration of doc clendar with doc home page
        //const doctorRSI = await appointmentData.getdocCalender(req.params.id.trim());
        const doctorRSI = await doctorData.getDoctor(req.params.id.trim());
        const postAppointmentData = req.body;
        const { appointmentId,doctorId,aptDate,aptTime,message,conditions } = postAppointmentData;
        console.log("From reschedule => "+" appointmentId: "+appointmentId+" doctorId : "+doctorId +" aptDate : "+aptDate+
    " aptTime : "+aptTime+" message :"+message+" conditions : "+conditions)
//Commented below for integration of doc clendar with doc home page
    /*
        res.render('pages/doctorcalendar',{title:'Doctor Home Page',appointmentId:appointmentId,
                                           doctorId :doctorId,rescheduleFlag:true,
                                           aptDatePrv:aptDate,aptTimePrv:aptTime,messagePrv:message,
                                           conditionsPrv:conditions,timeSlotList : doctorRSI.timeSlots});
       */
         res.render('pages/indivDoctor',{doctor:doctorRSI,
                                            appointmentId:appointmentId,
                                            doctorId :doctorId,rescheduleFlag:true,aptDatePrv:aptDate,
                                            aptTimePrv:aptTime,
                                            messagePrv:message,conditionsPrv:conditions,doctorRSI,
                                            authenticated:authenticateFlag});
                                          }
        catch(e){
          const errorMessage = typeof e === 'string' ? e : e.message;
          //res.status(404).json(errorMessage);
          res.status(404).render('pages/indivDoctor',{hasError: true, 
            errorMessage:errorMessage,
            authenticated:authenticateFlag});
          //Commented below for integration of doc clendar with doc home page
          /* res.status(400).render('pages/doctorcalendar',{title:'Doctor Home Page',
                                          appointmentId:appointmentId,
                                           doctorId :doctorId,
                                          timeSlotList : doctorRSI.timeSlots,
                                          hasError: true,
                                          errorMessage : errorMessage});
                                          */
            return;
        }
    });

    module.exports = router;
