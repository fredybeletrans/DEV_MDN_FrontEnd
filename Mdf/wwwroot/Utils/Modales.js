
//#region vista modal cambio de estado
/**
 * 
 * @param {any} div
 * @param {any} tabla
 * @param {any} estadoActual
 * @param {any} urlCambioEstado
 * @param {any} idParam
 */
let fn_CambioEstadoVistaModal = (div, tabla, estadoActual, urlCambioEstado, idParam, fnclose) => {
    kendo.ui.progress($(document.activeElement), true);
    if ($("#" + div + "").children().length === 0) {
        $.ajax({
            url: "/Modales/CambioEstado",
            type: 'GET',
            contentType: "text/html; charset=utf-8",
            datatype: "html",
            success: function (resultado) {
                kendo.ui.progress($(document.activeElement), false);
                fn_loadVistaModalCambioEstado(resultado, div, tabla, estadoActual, urlCambioEstado, idParam, fnclose);

            }
        });
    } else {
        kendo.ui.progress($(document.activeElement), false);
        fn_loadVistaModalCambioEstado("", div, tabla, estadoActual, urlCambioEstado, idParam, fnclose);

    }
};
/**
 * 
 * @param {any} data
 * @param {any} div
 * @param {any} tabla
 * @param {any} estadoActual
 * @param {any} urlCambioEstado
 * @param {any} idParam
 * @param {any} fnclose
 */

let fn_loadVistaModalCambioEstado = (data, div, tabla, estadoActual, urlCambioEstado, idParam, fnclose) => {

    let a = document.getElementsByTagName("script");
    let listJs = [];
    $.each(a, function (index, elemento) {
        listJs.push(elemento.src.toString());
    });
    let fileJs = "CambioEstado.js";

    if (listJs.filter(listJs => listJs.toString().endsWith(fileJs)).length === 0) {
        script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "/js/" + fileJs;
        script.onload = function () {
            fn_showCambioEstado(true, data, div, tabla, estadoActual, urlCambioEstado, idParam, fnclose);
        };
        document.getElementsByTagName('head')[0].appendChild(script);
    } else {

        fn_showCambioEstado(false, data, div, tabla, estadoActual, urlCambioEstado, idParam, fnclose);
    }
};
/**
 * 
 * @param {any} cargarJs
 * @param {any} data
 * @param {any} div
 * @param {any} tabla
 * @param {any} estadoActual
 * @param {any} urlCambioEstado
 * @param {any} idParam
 * @param {any} fnclose
 */
let fn_showCambioEstado = (cargarJs, data, div, tabla, estadoActual, urlCambioEstado, idParam, fnclose) => {
    let onShow = function () {
        if (cargarJs === true) {
            fn_iniCambio_Estado(tabla, estadoActual, urlCambioEstado, idParam, div);
        } else {
            fn_Cambio_Estado(tabla, estadoActual, urlCambioEstado, idParam, div);
        }
    };

    let fn_CloseSIC = function () {
        if (fnclose === undefined) {
            return true;
        } else {
            return fnclose();
        }
    };

    $("#" + div + "").kendoDialog({
        height: "40%",
        width: "30%",
        title: "Cambio de estado",
        closable: true,
        modal: true,
        content: data,
        visible: false,
        //maxHeight: 800,
        minWidth: "30%",
        show: onShow,
        close: fn_CloseSIC,
        actions: [
            { text: '<span class="k-icon k-i-check"></span>&nbspCambiar', primary: true, action: fn_realizarCambio },
            { text: '<span class="k-icon k-i-cancel"></span>&nbspCancelar' }

        ]
    });

    $("#" + div + "").data("kendoDialog").open().toFront();

};
//#endregion
