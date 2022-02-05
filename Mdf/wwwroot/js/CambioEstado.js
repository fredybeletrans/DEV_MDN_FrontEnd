let xUrlCambioEstado = "";
var ValidCambio = "";
let xParametro = "";
let xdiv = "";
let ParamSeleccionado;
let fn_iniCambio_Estado = (tabla, estadoActual, urlCambioEstado, idParam, div) => {
    fn_K_ComboBox($("#cmbEstados"), Web_ApiMdn + "EstadosSiguentes/ObtenerEstadosSiguientesTabla/" + `${tabla}/${estadoActual}/1`, "nombre", "estadosiguiente", "Selecione un estado...");
    fn_K_TextBox($("#txtMotivoCambio"), "Motivo de cambio");
    $("#txtMotivoCambio").val("");

    ValidCambio = $("#frmCambioEstado").kendoValidator(
        {
            rules: {
                MsgcmbEstados: function (input) {
                    if (input.is("[name='cmbEstados']")) {
                        return $("#cmbEstados").data("kendoComboBox").selectedIndex >= 0;
                    }
                    return true;
                },
                MsgMotivo: function (input) {
                    if (input.is("[name='txtMotivoCambio']")) {
                        return (input.val().length > 0 && input.val().length <= 2000);
                    }
                    return true;
                }
            },
            messages: {
                MsgcmbEstados: "Requerido",
                MsgMotivo: "Campo requerido, logitud  máxima del campo es 2000"
            }
        }).data("kendoValidator");
    xUrlCambioEstado = urlCambioEstado;
    xParametro = idParam;
    xdiv = div;
};

let fn_Cambio_Estado = (tabla, estadoActual, urlCambioEstado, idParam, div) => {

    var DSestado = new kendo.data.DataSource({
        transport: {
            read: function (datos) {
                $.ajax({
                    dataType: 'json',
                    url: Web_ApiMdn + "EstadosSiguentes/ObtenerEstadosSiguientesTabla/" + `${tabla}/${estadoActual}/1`,
                    contentType: "application/json; charset=utf-8",
                    success: function (result) {
                        datos.success(result);
                    }
                });
            }
        }
    });
    xUrlCambioEstado = urlCambioEstado;
    xParametro = idParam;
    xdiv = div;
    $("#cmbEstados").data("kendoComboBox").setDataSource(DSestado);
    $("#cmbEstados").data("kendoComboBox").value("");
    $("#txtMotivoCambio").val("");
};

let fn_realizarCambio = () => {

    if (ValidCambio.validate()) {
         ParamSeleccionado = {
            estado: fn_K_ComboBoxGetValue($("#cmbEstados")),
            motivo: $("#txtMotivoCambio").val(),
            usuario: fn_get_User(),
            fecha: fn_hoy(),
        };

        ParamSeleccionado = $.extend(ParamSeleccionado, xParametro);
        fn_CambiarEstado(ParamSeleccionado, xUrlCambioEstado);
    } else {
        return false;
    }
}

let fn_CambiarEstado = (xparam,xurlcambio) => {
    kendo.ui.progress($(".k-dialog"), true);
    $.ajax({
        url: xurlcambio,
        type: "POST",
        async: false,
        dataType: "json",
        data: JSON.stringify(xparam),
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            kendo.ui.progress($(".k-dialog"), false);
        },
        error: function (error) {
            kendo.ui.progress($(".k-dialog"), false);
            msg_Error("Tramite", "Error en cambio de estado");
        }
    });

}