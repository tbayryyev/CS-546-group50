(function ($) {


 
  $('.btn-primary-appointment-view-button').click(function (event) {
      try{
        
        var viewButtonFormAction = $(this).attr('value');       
        //alert("viewButtonFormAction : "+viewButtonFormAction);
        
        var requestConfigSFS = {
          method: 'GET',
         url: viewButtonFormAction
     };
     $.ajax(requestConfigSFS).then(function (responseMsg){
      $( '#viewUserId' ).val(responseMsg.userId);
      $( '#viewDoctorName' ).val(responseMsg.doctorName);
      $( '#viewAptDate' ).val(responseMsg.aptDate);
      $( '#viewAptTime' ).val(responseMsg.aptTime);
      $( '#viewAptMessage' ).val(responseMsg.message);
      $( '#viewAptConditions' ).val(responseMsg.conditions);

      console.log("responseMsg.doctorName : "+responseMsg.doctorName);
      console.log("responseMsg.aptDate : "+responseMsg.aptDate);
          
         $( '#viewModal' ).modal('show');
     });
     
      
  }catch (e) {
      
      const message = typeof e === 'string' ? e : e.message;
      console.log("message! : "+message);
     
    }
  });

  $('.btn-primary-appointment-delete-button').click(function (event) {
    try{
      
      var deleteButtonFormAction = $(this).attr('value');       
      //alert("deleteButtonFormAction : "+ deleteButtonFormAction);

      if(confirm("Are you sure you want to cancel")){
        var requestConfigSFS = {
          method: 'DELETE',
         url: deleteButtonFormAction
     };
     $.ajax(requestConfigSFS).then(function (responseMsg){
    
     alert("Appointment @"+responseMsg.aptDate+":"+responseMsg.aptTime+" got successfully cancelled");
     window.location.replace("/appointments/userappointmentlist/"+responseMsg.userId);
     });
    }
    else{
        return false;
    }
    
    
}catch (e) {
    
    const message = typeof e === 'string' ? e : e.message;
    console.log("message! : "+message);
   
  }
});

   
})(window.jQuery);