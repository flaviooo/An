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

    $.post(url_setOrder, function (){});
    /* 
       
    $.ajax({
      url: '/ordini/viewDettaglioOrdinazione',
      dataType: 'text',
      type: 'post',
      contentType: 'application/x-www-form-urlencoded',
      data:'2/2' ,
      success: function( data, textStatus, jQxhr ){
        console.log(data );
      },
      error: function( jqXhr, textStatus, errorThrown ){
          console.log( errorThrown );
      }
    });
     */     /* $.post( "/ordini/viewDettaglioOrdinazione/", function(idDettaglio, idOrdine) {
         alert( "Data Loaded: " + idDettaglio );
         alert( "Data Loaded: " + idOrdine );
       }); */
  });
});