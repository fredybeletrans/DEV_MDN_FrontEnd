'use strict'
let validCambiar;
$(document).ready(function () {

    $("#btnvalida").click(function () {
        fn_Cambiar(xmytoken);
    });
});



let fn_Cambiar = (tokenverif) => {
    kendo.ui.progress($(document.body), true);
    $.ajax({
        url: Web_ApiMdn + "Usuarios/VerifEmailUsuario/" + tokenverif,
        type: "POST",
        dataType: "json",
        //data: JSON.stringify({
        //    PasswordHash: $("#txtNuevoPassWord").val(),
        //    PasswordConfirmarHash: $("#txtConfirmarNuevoPassWord").val()
        //}),
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            $("#btnvalida").hide();
            kendo.ui.progress($(document.body), false);
            fn_showAlert();
        },
        error: function (error) {
            kendo.ui.progress($(document.body), false);
            msg_Error("Verificar", error.responseJSON !== undefined ? error.responseJSON.message : error.statusText);
        }
    });

};

let fn_showAlert = () => {
    let Alert = $("#AlertValidEmail");
    Alert.children().remove();
    Alert.append('<div class="col-lg-12" style="text-align: center;width:100%;">' +
        '<div class= "alert alert-success alert-dismissible fade show" role = "alert">' +
        '<strong>usuario validado!</strong> ¡Tu correo ha sido validado! haga clic en login para accesar al portal. <a href="/LoginUsuarios" class="alert-link">Ir a login</a>' +
        '</div>' +
        '</div>');
}
