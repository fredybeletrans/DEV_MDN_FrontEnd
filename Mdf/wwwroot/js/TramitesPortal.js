'use strict'
let aPersonas = "";
$(document).ready(function () {

    fn_Mostra_PanelTramites();
    aPersonas = fn_getPersona(fn_get_User());
    
});


let fn_Mostra_PanelTramites = () => {
 
    $.ajax({
        url: Web_ApiMdn + "Tramites/ObtenerTramites", //"/v3/ec67eb95-c63c-499a-b824-2b1517c616e2",
        type: 'GET',
        dataType: "json",
        success: function (data) {
            $("#PanTramites").children().remove();
            $.each(data, function (i, item) {
                let vIcon = item.icono === "" || item.icono === null ? "k-icon k-i-image" : item.icono;
                let htmltextElemnt =
                    '<div class="card" id="SolCntServ-' + item.idtramite.toString() + '">' +
                    '<div class="card__image-holder">' +
                    '<img class="card__image" src="/css/Images/' + vIcon + '" alt="wave" style=" width: 300px;height: 225px;"/>' +
                    '</div>' +
                    '<div class="card-title">' +
                    '<a href="#" class="toggle-info btn">' +
                    '<span class="left"></span>' +
                    '<span class="right"></span>' +
                    '</a>' +
                    '<h2 class="truncate">' + item.nombre +
                    /*'<small>Image from unsplash.com</small>' +*/
                    '</h2>' +
                    '</div>' +
                    '<div class="card-flap flap1">' +
                    '<div class="card-description">' + item.descripcion +
                    '</div>' +
                    '<div class="card-flap flap2">' +
                    '<div class="card-actions">' +
                    '<a  class="btn" data-idtramite="' + item.idtramite.toString() + '" onclick="fn_IniciarTramite(this)">Ingresar</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';

                $("#PanTramites").append(htmltextElemnt);

            });

            var zindex = 10;

            $("div.card").click(function (e) {
                e.preventDefault();

                var isShowing = false;

                if ($(this).hasClass("show")) {
                    isShowing = true
                }

                if ($("div.cards").hasClass("showing")) {
                    // a card is already in view
                    $("div.card.show")
                        .removeClass("show");

                    if (isShowing) {
                        // this card was showing - reset the grid
                        $("div.cards")
                            .removeClass("showing");
                    } else {
                        // this card isn't showing - get in with it
                        $(this)
                            .css({ zIndex: zindex })
                            .addClass("show");

                    }

                    zindex++;

                } else {
                    // no cards in view
                    $("div.cards")
                        .addClass("showing");
                    $(this)
                        .css({ zIndex: zindex })
                        .addClass("show");

                    zindex++;
                }

            });
        }
    });
};
let fn_IniciarTramite = (e) => {
    let obj = $(e);
    let vIdTramite = obj.data("idtramite").toString();
    /*  if (vIdTramite === "1") {*/
    window.location.href = "/TramitesPortal/TramitesOpciones/" + `${aPersonas[0].idpersona.toString()}/${vIdTramite.toString()}`;
   /* }*/
   
}
