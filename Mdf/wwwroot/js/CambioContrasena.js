'use strict'
let validCambiar;
$(document).ready(function () {
    //crear boton de ingreso
    fn_K_Button($("#btnCambiar"), "user", "Cambiar Password");
    fn_K_TextBox($("#txtNuevoPassWord"), "Password");
    $("#txtNuevoPassWord").val("");

    fn_K_TextBox($("#txtConfirmarNuevoPassWord"), "Password");
    $("#txtConfirmarNuevoPassWord").val("");


    validCambiar = $("#frmCambiarContrasena").kendoValidator({
        rules: {
            Requerido: function (input) {

                if (input.is("[name=txtNuevoPassWord]")) {
                    return input.val() !== "";
                }

                if (input.is("[name=txtConfirmarNuevoPassWord]")) {
                    return input.val() !== "";
                }
                return true;
            }
        },
        messages: {
            Requerido: "Campo requerido"
        }
    }).data("kendoValidator");


    $("#btnCambiar").data("kendoButton").bind("click", function () {
        if (!validCambiar.validate()) {
            msg_Error("Cambiar Password", "Valide si hay campos requeridos");
        } else {
            if ($("#txtNuevoPassWord").val() === $("#txtConfirmarNuevoPassWord").val()) {
                fn_Cambiar();
            } else {
                msg_Error("Cambiar Password", "Password de confirmacion no es el mismo verifique por favor !");
            }

        }
    })

    $("#txtNuevoPassWord").focus();
});


let fn_Cambiar = () => {
    kendo.ui.progress($(document.body), true);
    $.ajax({
        url: "https://www.mocky.io/v2/596a5f03110000920701cd92",
        type: "POST",
        dataType: "json",
        data: JSON.stringify({
            PasswordHash: $("#txtNuevoPassWord").val(),
            PasswordConfirmarHash: $("#txtConfirmarNuevoPassWord").val()
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            kendo.ui.progress($(document.body), false);
            fn_showAlert();
        },
        error: function (data) {
            kendo.ui.progress($(document.body), false);
        }
    });

};

let fn_showAlert = () => {
    let Alert = $("#AlertCambioPass");
    Alert.children().remove();
    Alert.append('<div class="col-lg-12" style="text-align: center;width:100%;">' +
        '<div class= "alert alert-success alert-dismissible fade show" role = "alert">' +
        '<strong>Cambio contraseña!</strong> ¡Tu contraseña ha sido modificada! haga clic en login para accesar al portal. <a href="/LoginUsuarios" class="alert-link">Ir a login</a>' +
        '</div>' +
        '</div>');
}
