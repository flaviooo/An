//(function ($) {}(jQuery))
$(document).ready(function () {

  $('#schedaTable').DataTable(
    { pageLength: 50 }
  );
/*   $('#ordineTable').DataTable(
    { pageLength: 50 }
  );
 */
  var a = $("input[type='number']");
  $(":input").bind('keyup mouseup', function (event) {
    event.preventDefault(); //prevent default action
    var _this = $(this);
    var baseURIForm = $(location).attr('href');
    console.log("baseURIForm : " + baseURIForm);
    var idDettaglio = _this.prev().attr("id");
    var idOrdine = baseURIForm = baseURIForm.substring(baseURIForm.lastIndexOf('/') + 1, baseURIForm.length);

    let url_setOrder = "/ordini/viewDettaglioOrdinazione/" + idDettaglio + "/" + idOrdine;
    console.log("idDettaglio: " + url_setOrder);

//    $.post(url_setOrder, function (){});
     $.post(url_setOrder, function() { alert( "success" ); })
    .done(function (result, status, xhr) {

       var m= $('.alert').html(result);
     //  alert alert-success
     $(".alert" ).replaceWith( '<div class="alert alert-success" role="alert"><h3>Yeah!!</h3></div>');
       
    })
    .fail(function (xhr, status, error) {
        $(".alert").html("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
        //alert alert-danger
    })
    .always(function(result, status, xhr) {
      $(".alert" ).replaceWith( '<div class="alert alert-success" role="alert"><h3>Yeah!!</h3></div>');
    });
   

  });
});