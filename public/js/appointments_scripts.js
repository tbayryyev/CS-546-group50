(function ($) {


 
  $('.btn-primary-appointment-view-button').click(function (event) {
      try{
        
        var viewButtonFormAction = $(this).attr('formaction');       
        //alert("viewButtonFormAction : "+viewButtonFormAction);
        
        var requestConfigSFS = {
          method: 'GET',
         url: viewButtonFormAction
     };
     $.ajax(requestConfigSFS).then(function (responseMsg){
      $( '#viewUserId' ).val(responseMsg.userId);
      $( '#viewDoctorId' ).val(responseMsg.doctorId);
      $( '#viewAptDate' ).val(responseMsg.aptDate);
      $( '#viewAptTime' ).val(responseMsg.aptTime);
      $( '#viewAptMessage' ).val(responseMsg.message);
      $( '#viewAptConditions' ).val(responseMsg.conditions);
          
         $( '#viewModal' ).modal('show');
     });
     
      
  }catch (e) {
      
      const message = typeof e === 'string' ? e : e.message;
      console.log("message! : "+message);
     
    }
  });

  $('.btn-primary-appointment-delete-button').click(function (event) {
    try{
      //var button_id = $(this).attr('id');
      var deleteButtonFormAction = $(this).attr('formaction');       
      //alert("deleteButtonFormAction : "+ deleteButtonFormAction);

      if(confirm("Are you sure you want to delete")){
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