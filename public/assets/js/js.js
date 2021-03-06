//(function ($) {}(jQuery))

$(window).on("load", function() { 
    if (window.addEventListener)
  {
    $("#loading_screen").hide();   
  }else{
    //window.attachEvent("onload", nascondi_loading_screen);
    $("#loading_screen").show();
  }}); 

$(document).ready(function () {
  
  $('#schedaTable').DataTable(
    { pageLength: 50 }
  );

  $('#ordineResocontoTable').DataTable(
      {
        paging:         false,
         "footerCallback": function ( row, data, start, end, display ) {
            var api = this.api(), data;
            var intVal = function ( i ) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '')*1 :
                    typeof i === 'number' ?
                        i : 0;
            };
 
            // Total over all pages
            total = api
                .column( 4 )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );
 
            // Total over this page
            pageTotal = api
                .column( 4, { page: 'current'} )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );
 
            // Update footer
            $( api.column( 4 ).footer() ).html(              
                '$'+number_format(pageTotal,2,',','.') +' ( $'+ number_format(pageTotal,2,',','.') +' total)'
            );
        }
      }    
);
   
  var a = $("input[type='number']");
  $(":input").bind('keyup mouseup', function (event) {
    event.preventDefault(); //prevent default action
    var _this = $(this);
    var baseURIForm = $(location).attr('href');
    var idOrdine = baseURIForm = baseURIForm.substring(baseURIForm.lastIndexOf('/') + 1, baseURIForm.length);
    
    let url_setOrder = "";
    if ($(event.target).attr("class") === 'plus') {
      var idDettaglio = _this.prev().attr("id");
      url_setOrder = "/ordini/viewDettaglioOrdinazione/" + idDettaglio + "/" + idOrdine;
    } else if ($(event.target).attr("class") === 'minus') {
      var idDettaglio = _this.next().attr("id");
      url_setOrder = "/ordini/viewDettaglioOrdinazione/sub/" + idDettaglio + "/" + idOrdine;
    } else {
      //alert("Url non valido!");
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
  function toFixedFix(n, precisione) {
    // Funzione per arrotondare valore
    var k = Math.pow(10, precisione);            
    return '' + Math.round(n * k) / k;
}

function number_format(numero, decimali, dec_separatore, mig_separatore){
    // Elimino i caratteri che non sono numeri (lascio il segno meno e il punto)
   // numero = (numero).replace(/[^0-9\.\-]?/gi,"");
    // Controllo se valore numerico
    var n = 0;
    if(isFinite(+numero)){
        n=numero;
    }
    // Controllo se i decimali sono accettabili
    var precisione = 0;
    if(isFinite(+decimali) && decimali>-1){
        precisione = decimali;
    }
    // Recupero caratteri separatori
    var separatore = '.';
    if(typeof mig_separatore != 'undefined'){
        separatore = mig_separatore;
    }
    var dec = ',';
    if(typeof dec_separatore != 'undefined'){
        var dec = dec_separatore;     
    }
    
    // Arrotondo il valore se necessario - Utilizzo funzione toFixedFix
    var s = '';
    if(precisione!=0){
        s = toFixedFix(n, precisione);    
    }else{
        s = '' + Math.round(n);
    }
    // Taglio il valore in parte intera e parte decimale
    s = s.split('.');
    // Aggiungo il separatore delle migliaia - ogni 3 numeri sulla parte intera
    if (s[0].length > 3) {        
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, separatore);
    }
    // Formatto la parte decimale - aggiungo degli 0 se necessari
    if ((s[1] || '').length < precisione) {
        s[1] = s[1] || '';
        s[1] += new Array(precisione - s[1].length + 1).join('0');    
    }
    // Aggiungo parte decimale a parte intera - separati da separatore decimali
    return s.join(dec);
}

var $tabButtonItem = $('#tab-button li'),
$tabSelect = $('#tab-select'),
$tabContents = $('.tab-contents'),
activeClass = 'is-active';

$tabButtonItem.first().addClass(activeClass);
$tabContents.not(':first').hide();

$tabButtonItem.find('a').on('click', function(e) {
var target = $(this).attr('href');

$tabButtonItem.removeClass(activeClass);
$(this).parent().addClass(activeClass);
$tabSelect.val(target);
$tabContents.hide();
$(target).show();
e.preventDefault();
});

$tabSelect.on('change', function() {
var target = $(this).val(),
  targetSelectNum = $(this).prop('selectedIndex');

$tabButtonItem.removeClass(activeClass);
$tabButtonItem.eq(targetSelectNum).addClass(activeClass);
$tabContents.hide();
$(target).show();
});
});