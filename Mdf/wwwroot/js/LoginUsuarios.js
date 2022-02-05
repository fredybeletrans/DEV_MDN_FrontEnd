'use strict'
let validLogin;
$(document).ready(function () {
    //crear boton de ingreso
    fn_K_Button($("#btnIngresar"), "user", "Ingresar     ");
    fn_K_TextBox($("#txtUsuario"), "Usuario");
    fn_K_TextBox($("#txtPassWordUsuario"), "Password");
    /* $("#btnIngresar").ke*/
    $("#txtUsuario").val("");
    $("#txtPassWordUsuario").val("");

    validLogin = $("#frmLogin").kendoValidator({
        rules: {
            Requerido: function (input) {

                if (input.is("[name=txtUsuario]")) {
                    return input.val() !== "";
                }
                if (input.is("[name=txtEmail]")) {
                    return input.val() !== "";
                }
                if (input.is("[name=txtPassWordUsuario]")) {
                    return input.val() !== "";
                }
               
    
                return true;
            }
           
        },
        messages: {
            Requerido: "Campo requerido"
            /*      customRule2: "Your town must be New York"*/
        }
    }).data("kendoValidator");

    //#region "boton iniciar"
    $("#btnIngresar").data("kendoButton").bind("click", function (e) {
        if (!validLogin.validate()) {
            msg_Error("Login", "Valide si hay campos requeridos");
        } else {
            kendo.ui.progress($(document.body), true);
            var response = grecaptcha.getResponse();

            if (response.length === 0) {
                msg_Error("Login", "Este campo es requerido");
                kendo.ui.progress($(document.body), false);
                grecaptcha.reset();
            } else {

                $.ajax({
                    url: "LoginUsuarios/ValidaCaptcha",
                    dataType: "json",
                    type: 'post',
                    data: JSON.stringify({ Token: response }),
                    contentType: 'application/json; charset=utf-8',
                    async: false,
                    success: function (respuesta) {
                        if (respuesta.Validacion === 'true') {
                            kendo.ui.progress($(document.body), true);
                            $.ajax({
                                url: Web_ApiMdn + "Usuarios/authenticate" ,
                                dataType: "json",
                                data: JSON.stringify({
                                    usuario: $("#txtUsuario").val(),
                                    passwordhash: $("#txtPassWordUsuario").val()
                                }),
                                type: 'post',
                                contentType: 'application/json; charset=utf-8',
                                async: false,
                                success: function (respuesta) {
                                    if (respuesta.length === 0) {
                                        fn_showAlert();
                                        $("#txtUsuario").focus();
                                    } else {
                                        var UsuarioRegPortal = true;
                                        if (UsuarioRegPortal === true) {
                                            window.sessionStorage.setItem("user", $("#txtUsuario").val());
                                            window.location.href = "/TramitesPortal";
                                   
                                        } else {
                                            window.location.href = "/ValidacionDatosComplementarios";
                                            window.sessionStorage.removeItem("user");
                                        }
                                        
                                    }
                                  
                                    kendo.ui.progress($(document.body), false);
                                },
                                error: function (error) {
                                    kendo.ui.progress($(document.body), false);
                                    msg_Error("Login", error.responseJSON !== undefined ? error.responseJSON.message : error.statusText);
                                    grecaptcha.reset();  
                                }
                            });



                        } else {
                            msg_Error("Login", respuesta.Mensaje);
                            kendo.ui.progress($(document.body), false);
                        }
                       
                    },
                    error: function () {
                        kendo.ui.progress($(document.body), false);
                    }
                });
            }

        }

    })
    //#endregion
   

    $("#txtUsuario").focus();
});

let fn_showAlert = () => {
    let Alert = $("#AlertUsuarioNoExiste");
    Alert.children().remove();
    Alert.append('<div class="col-lg-12" style="text-align: center;width:100%;">' +
        '<div class= "alert alert-warning alert-dismissible fade show" role = "alert">' +
        '<strong>Restablecer!</strong>Valide usuario y contraseña que exista en el sistema en caso de no tener cuenta ir opcion registrate.'+ 
        'si ólvido su usuario ir a la ocpion de recuperación. ' +
        '</div>' +
        '</div>');
}