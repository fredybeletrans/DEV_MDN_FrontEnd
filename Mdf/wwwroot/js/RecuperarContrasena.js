'use strict'
let validRecuperar;
$(document).ready(function () {
    //crear boton de ingreso
    fn_K_Button($("#btnRecuperar"), "user", "Recuperar Contraseña");
    fn_K_TextBox($("#txtEmail"), "name@example.com");
    $("#txtEmail").val("");


    validRecuperar = $("#frmRecuperarContrasena").kendoValidator({
        rules: {
            Requerido: function (input) {

                if (input.is("[name=txtEmail]")) {
                    return input.val() !== "";
                }
                return true;
            }
        },
        messages: {
            Requerido: "Campo requerido"
        }
    }).data("kendoValidator");


    $("#btnRecuperar").data("kendoButton").bind("click", function () {
        if (!validRecuperar.validate()) {
            msg_Error("Recuperar", "Valide si hay campos requeridos");
        } else {
            fn_Recuperar();
        }
    })

    $("#txtEmail").focus();
});


let fn_Recuperar = () => {
    kendo.ui.progress($(document.body), true);
    $.ajax({
        url: "https://www.mocky.io/v2/596a5f03110000920701cd92",
        type: "POST",
        dataType: "json",
        data: JSON.stringify({
            CORREO: $("#txtEmail").val()
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            kendo.ui.progress($(document.body), false);
            fn_K_ButtonEnable($("#btnRecuperar"), false);
            fn_K_TextBoxEnable($("#txtEmail"),false);
            fn_showAlert();
        },
        error: function (data) {
            kendo.ui.progress($(document.body), false);
        }
    });

};

let fn_showAlert = () => {
    let Alert = $("#AlertEnvEmail");
    Alert.children().remove();
    Alert.append('<div class="col-lg-12" style="text-align: center;width:100%;">'+
        '<div class= "alert alert-success alert-dismissible fade show" role = "alert">'+
        '<strong>Restablecer!</strong> Consulte su correo electrónico para obtener instrucciones para restablecer la contraseña. <a href="/LoginUsuarios" class="alert-link">Ir a login</a>'+
         '</div>'+
         '</div>');
}