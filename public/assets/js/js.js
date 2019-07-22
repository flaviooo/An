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
    var idOrdine = baseURIForm = baseURIForm.substring(baseURIForm.lastIndexOf('/') + 1, baseURIForm.length);
    console.log($(event.target).get(0));
    console.log($(event.target).attr("class"));
    console.log($(event.currentTarget));
    console.log($(event.target).val());

    let url_setOrder = "";
    if ($(event.target).attr("class") === 'plus') {
      var idDettaglio = _this.prev().attr("id");
      url_setOrder = "/ordini/viewDettaglioOrdinazione/" + idDettaglio + "/" + idOrdine;
    } else if ($(event.target).attr("class") === 'minus') {
      var idDettaglio = _this.next().attr("id");
      url_setOrder = "/ordini/viewDettaglioOrdinazione/sub/" + idDettaglio + "/" + idOrdine;
    } else {
      alert("Url non valido!");
      throw new Error("Url non valido!");
    }

    console.log("idDettaglio: " + url_setOrder);

    // $.post(url_setOrder, function (){});
    $.post(url_setOrder, function () {
      /* 
    alert( "success" );
     */
    })
      .done(function (result, status, xhr) {
        //  var m= $('.alert').html(result);
        $(".alert").replaceWith('<div class="alert alert-success" role="alert"><h3>Yeah!!</h3></div>');
      })
      .fail(function (xhr, status, error) {
        //$(".alert").html("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
        $(".alert").replaceWith('<div class="alert alert-success" role="alert"><h3>Nuuuuuu :(!!</h3></div>');
      })
      .always(function (result, status, xhr) {
        $(".alert").replaceWith('<div class="alert alert-success" role="alert"><h3>Yeah!!</h3></div>');
      });
  });
});