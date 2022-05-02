const express = require('express');
const router = express.Router();
const appointmentData = require('../data/appointments');

let { ObjectId, ConnectionClosedEvent } = require('mongodb');


router.route('/schedule/:doctorId/:aptDate/:aptTime')
    .get(async (req,res) => {
        try{
       
        const aptDate = req.params.aptDate.trim();
        const aptTime = req.params.aptTime.trim();
        const doctorId = req.params.doctorId.trim();
        
        res.render('pages/appointments',{userId:"621c02ba2e53ab2ba3b45f7a",doctorId:doctorId,
                                        aptDate: aptDate, aptTime:aptTime
                                        //,message:"", conditions:""
                                      });
        }
        catch(e){
           const errorMessage = typeof e === 'string' ? e : e.message;
            //res.status(404).json(e.message);
           
            res.status(400).render('pages/appointments',{userId:"621c02ba2e53ab2ba3b45f7a",doctorId:doctorId,
            aptDate: aptDate, aptTime:aptTime,hasError: true, errorMessage : errorMessage});
            return;
        }
    });

    router.route('/reschedule/:doctorId/:aptDate/:aptTime')
    .post(async (req,res) => {
        try{
       
        const aptDate = req.params.aptDate.trim();
        const aptTime = req.params.aptTime.trim();
        const doctorId = req.params.doctorId.trim();
        const postResAppointmentData = req.body;
        const { appointmentId,aptDatePrvRs,aptTimePrvRs,messagePrvRs,conditionsPrvRs} = postResAppointmentData;
        console.log("From rescheduleAppointment => "+" appointmentId :"+appointmentId+" aptDatePrvRs : "+aptDatePrvRs +" aptTimePrvRs : "+aptTimePrvRs+
        " messagePrvRS : "+messagePrvRs+" conditionsPrvRS :"+conditionsPrvRs+" doctorId : "+doctorId)
        
        res.render('pages/appointmentReschedule',{userId:"621c02ba2e53ab2ba3b45f7a",appointmentId:appointmentId,
                                        doctorId:doctorId
                                        //,rescheduleFlag:true
                                        ,reBookFlag:true
                                        ,aptDate: aptDate, aptTime:aptTime,
                                        aptDatePrv:aptDatePrvRs,aptTimePrv:aptTimePrvRs,
                                        message:messagePrvRs, conditions:conditionsPrvRs});
        }
        catch(e){
          const errorMessage = typeof e === 'string' ? e : e.message;  
         // res.status(404).json(e.message);
            
            res.status(400).render('pages/appointmentReschedule',{userId:"621c02ba2e53ab2ba3b45f7a",
            appointmentId:appointmentId
            //,doctorId:doctorId
            //,rescheduleFlag:true
            //,reBookFlag:true
            ,aptDate: aptDate, aptTime:aptTime,
           // aptDatePrv:aptDatePrvRs,aptTimePrv:aptTimePrvRs,
            message:messagePrvRs, conditions:conditionsPrvRs,
            hasError: true,
            errorMessage : errorMessage});
            return;
        }
    });


    router.route('/userappointmentlist/:userId')
    .get(async (req,res) => {
        try{
        const userId = req.params.userId.trim();
        const appointmentRS = await appointmentData.getAllAppointmentsForUser(userId);
        //console.log("appointmentRS : "+JSON.stringify(appointmentRS));
        res.render('pages/patients',{title:'Patient Home Page', appointmentResultSet:appointmentRS});
        }
        catch(e){
            const errorMessage = typeof e === 'string' ? e : e.message;
            //res.status(404).json(e.message);
            
            res.status(400).render('pages/patients',{title:'Patient Home Page'
            //, appointmentResultSet:appointmentRS
            ,hasError: true,
             errorMessage : errorMessage});
            
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

const { doctorId,aptDate,aptTime,message,conditions } = postAppointmentData;
console.log("doctorId : "+doctorId +" aptDate : "+aptDate+
" aptTime : "+aptTime+" message :"+message+" conditions : "+conditions)
  if (!doctorId || !aptDate || !aptTime || !message || !conditions ) {
    
    //res.status(400).json({ error: 'All fields need to have valid values' });
    res.status(400).render('pages/appointments',{hasError: true,userId:userId,
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
    //res.status(400).json({ error: errorMessage });
    res.status(400).render('pages/appointments',{hasError: true,class: 'error', errorMessage : errorMessage});
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
                                                                     

    res.redirect('/appointments/userappointmentlist/'+newAppointmentPost.userId);
  } catch (e) {
    const errorMessage = typeof e === 'string' ? e : e.message;
    //res.status(500).json({ error: errorMessage });
    res.status(500).render('pages/appointments',{hasError: true, errorMessage : errorMessage});
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
       /*
        res.render('pages/appointmentview',{userId:appointmentRSI.userId,
                                              doctorId:appointmentRSI.doctorId,
                                              aptDate:appointmentRSI.aptDate,
                                              aptTime:appointmentRSI.aptTime,
                                              message:appointmentRSI.message,
                                              conditions:appointmentRSI.conditions}
        );*/
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
        
        if (!ObjectId.isValid(req.params.id.trim())) {
            res.status(400).json({ error: 'Invalid ObjectId' });
            return;
        }
        try{
        
        const appointmentRSI = await appointmentData.get(req.params.id.trim());
        res.render('pages/appointmentReschedule',{appointmentId:appointmentRSI._id.toString(),
                                                  userId:appointmentRSI.userId,
                                                  doctorId:appointmentRSI.doctorId,                               
                                                  aptDate: appointmentRSI.aptDate, 
                                                  aptTime:appointmentRSI.aptTime,
                                                  message:appointmentRSI.message, 
                                                  conditions:appointmentRSI.conditions,
                                                  rescheduleFlag:true});
        }
        catch(e){
          const errorMessage = typeof e === 'string' ? e : e.message;  
          //res.status(404).json(errorMessage);
          res.status(404).render('pages/appointmentReschedule',{hasError: true, errorMessage : errorMessage});
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
        //res.redirect('/appointments/userappointmentlist/'+appointmentRSD.userId);
        }
        catch(e){
          const errorMessage = typeof e === 'string' ? e : e.message;  
          //res.status(404).json(errorMessage);
          res.status(400).render('pages/patients',{title:'Patient Home Page'
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
         // res.status(404).json(errorMessage);
          res.status(400).render('pages/doctorcalendar',{title:'Doctor Home Page',
          doctorId :doctorRSI._id.toString(),timeSlotList : doctorRSI.timeSlots,
          hasError: true,
          errorMessage : errorMessage});
            return;
        }
    });
    router.route('/doctorcalendar/reschedule/:id')
    .post(async (req,res) => {
        
        if (!ObjectId.isValid(req.params.id.trim())) {
            res.status(400).json({ error: 'Invalid ObjectId' });
            return;
        }
        try{
        
        const doctorRSI = await appointmentData.getdocCalender(req.params.id.trim());
        const postAppointmentData = req.body;
        const { appointmentId,doctorId,aptDate,aptTime,message,conditions } = postAppointmentData;
        console.log("From reschedule => "+" appointmentId: "+appointmentId+" doctorId : "+doctorId +" aptDate : "+aptDate+
    " aptTime : "+aptTime+" message :"+message+" conditions : "+conditions)

        res.render('pages/doctorcalendar',{title:'Doctor Home Page',appointmentId:appointmentId,
                                           doctorId :doctorId,rescheduleFlag:true,
                                           aptDatePrv:aptDate,aptTimePrv:aptTime,messagePrv:message,
                                           conditionsPrv:conditions,timeSlotList : doctorRSI.timeSlots});
        }
        catch(e){
          const errorMessage = typeof e === 'string' ? e : e.message;  
          //res.status(404).json(errorMessage);
          res.status(400).render('pages/doctorcalendar',{title:'Doctor Home Page',
                                          appointmentId:appointmentId,
                                           doctorId :doctorId,
                                          timeSlotList : doctorRSI.timeSlots,
                                          hasError: true,
                                          errorMessage : errorMessage});
            return;
        }
    });
    
    module.exports = router;