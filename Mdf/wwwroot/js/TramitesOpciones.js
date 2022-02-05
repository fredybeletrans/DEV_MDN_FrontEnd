'use strict'
let strapi = "";
$(document).ready(function () {
    switch (xidTramite) {
        case "1":
            $("#TramiteNombre").html("Registro de examenes");
            break
        case "2":
            $("#TramiteNombre").html("Registro de Matriculas");
            break
        case "3":
            $("#TramiteNombre").html("Registro de Licencias");
            break
        case "4":
            $("#TramiteNombre").html("Registro de Avisos");
            break
        default:
    }
    strapi = "RelacionTramiteOpciones/ObtenerRelacionTramiteOpc/" + xidTramite;
    fn_MostraPanel_TramitesOpciones();
});



let fn_MostraPanel_TramitesOpciones = () => {

    $.ajax({
        url: Web_ApiMdn + strapi,
        type: 'GET',
        dataType: "json",
        success: function (data) {
            $("#PanTramitesOpciones").children().remove();
            $.each(data, function (i, item) {
                let vIcon = item.icono === "" || item.icono === null ? "k-icon k-i-image" : item.icono;
                let htmltextElemnt =
                    '<div class="card">' +
                    '<div class="card__image-holder">' +
                    '<img class="card__image" src="/css/Images/' + vIcon + '" alt="wave" style=" width: 300px;height: 225px;" />' +
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
                    '<div class="card-description">' +
                    'This grid is an attempt to make something nice that works on touch devices. Ignoring hover states when they' +
                    '</div>' +
                    '<div class="card-flap flap2">' +
                    '<div class="card-actions">' +
                    '<a  class="btn" data-idtramiteopcion="' + item.idtramiteopcion.toString() +'" onclick="fn_IniciarTramiteOpcion(this)">Ingresar</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';

                $("#PanTramitesOpciones").append(htmltextElemnt);

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

let fn_IniciarTramiteOpcion = (e) => {
    let obj = $(e);
    let vIdTramiteOpcion = obj.data("idtramiteopcion").toString();
   /* if (vIdTramiteOpcion === "1") {*/
    window.location.href = "/TramitesPortal/RegistroSolicitudTramites/" + `${xidPersona.toString()}/${xidTramite.toString()}/${vIdTramiteOpcion.toString()}/0`;
   /* }*/

}

