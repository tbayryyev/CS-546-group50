(function ($) {

  //var deleteButtonFormAction = $ ( '#deleteModelButton' ).attr('formaction')
 
  $('.btn-primary-appointment-view-button').click(function (event) {
      try{
        //var button_id = $(this).attr('id');
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
     console.log("responseMsg form delete : "+responseMsg);
      
     /*$( '#deleteUserId' ).val(responseMsg.userId);
      $( '#deleteDoctorId' ).val(responseMsg.doctorId);
      $( '#deleteAptDate' ).val(responseMsg.aptDate);
      $( '#deleteAptTime' ).val(responseMsg.aptTime);
      $( '#deleteAptMessage' ).val(responseMsg.message);
      $( '#deleteAptConditions' ).val(responseMsg.conditions);
      */
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