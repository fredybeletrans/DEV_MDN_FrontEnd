'use strict'
let validInf;
let pasoActual;
let opcionPartialView = "0";
let IdUsuario = "";
let Nombre = "";
let PasswordHash = "";
let PasswordSalt = "";
let FechaVericacionCuenta = "";
let TokenVerificacion = "";
let Correo = "";
let Estado = "";
let IdPersona = "";
let IdTipoPersona = "";
let IdTipoIdentificacionPersonal = "";
let Nit = "";
let NumDocumento = "";
let PrimerNombre = "";
let SegundoNombre = "";
let TercerNombre = "";
let PrimerApellido = "";
let SegundoApellido = "";
let RazonSocial = "";
let NombrePersona = "";
let Particula = "";
let OrgEstatalMinisterio = "";
let FechaNacimiento = "";
let FechaCreacion = "";
let IdRol = "";
let NoResidente = "";
let PregutasSeguridad = false;
let xRespuestasFocus = "";
let xTipoResFocus = "";
let IdEstadoCivil = "";
$(document).ready(function () {
    //crear boton de ingreso
    fn_K_Button($("#btnConfirmar"), "check", "Ingresar");
    fn_K_TextBox($("#txtUsuario"), "Usuario");
    fn_K_TextBox($("#txtPassWordUsuario"), "Password");
    fn_K_TextBox($("#txtEmail"), "name@example.com");
    fn_K_TextBox($("#txtConfirmarPassWordUsuario"), "Password");
    fn_K_ComboBox($("#CmbTipoPersona"), Web_APi + "/v3/55561846-da4a-4704-bdf1-502b47a563d9", "Nombre", "IdTipoPersona", "Seleccione...");
    fn_K_ComboBox($("#CmbTipoIdentificacion"), Web_APi + "/v3/3564e239-7f77-44db-9288-5232f315ce58", "NOMBRE", "IDTIPOIDENTIFICACIONPERSONAL", "Seleccione...");
    fn_K_ComboBox($("#cmbPn_Genero"), Web_APi + "/v3/6f127947-4885-4b21-885c-f167bef59f5c", "NOMBRE", "IDGENERO", "Seleccione...");
    fn_K_ComboBox($("#cmbPe_Genero"), Web_APi + "/v3/6f127947-4885-4b21-885c-f167bef59f5c", "NOMBRE", "IDGENERO", "Seleccione...");
    fn_K_ComboBox($("#cmbPn_EstadoCivil"), Web_APi + "/v3/e4e2132a-e69f-440a-8c0f-af9107822ba1", "NOMBRE", "IDPARTICULA", "Seleccione...");
    fn_K_ComboBox($("#cmbPe_EstadoCivil"), Web_APi + "/v3/e4e2132a-e69f-440a-8c0f-af9107822ba1", "NOMBRE", "IDPARTICULA", "Seleccione...");
    // vista Parcial 1 persona extranjera
    fn_K_TextMasked($("#txtPe_NitUsuario"), "0000-000000-000-0", " "); //espacio para quitar el promt
    fn_K_TextBox($("#txtPe_CarnetResidente"), "Carnet Residente");
    fn_K_TextBox($("#txtPe_Nombre1"), "Primer Nombre");
    fn_K_TextBox($("#txtPe_Nombre2"), "Segundo Nombre");
    fn_K_TextBox($("#txtPe_Nombre3"), "Tercer Nombre");
    fn_K_TextBox($("#txtPe_Apellido1"), "Primer Apellido");
    fn_K_TextBox($("#txtPe_Apellido2"), "Segundo Apellido");

    fn_K_Date($("#txtPe_FechaNac"), "dd/MM/yyyy");
    fn_k_DateSetValue($("#txtPe_FechaNac"), fn_hoy());

    //vista parcial persona natural
    fn_K_ComboBox($("#cmbSNInstitucion"), Web_APi + "/v3/2c5e702c-c4a9-416e-8548-f39399b51712", "Descripcion", "Id", "Seleccione...");
    fn_K_TextMasked($("#txtPn_DUI"), "00000000-0", " "); //espacio para quitar el promt
    fn_K_TextBox($("#txtPn_Nombre1"), "Primer Nombre");
    fn_K_TextBox($("#txtPn_Nombre2"), "Segundo Nombre");
    fn_K_TextBox($("#txtPn_Nombre3"), "Tercer Nombre");
    fn_K_TextBox($("#txtPn_Apellido1"), "Primer Apellido");
    fn_K_TextBox($("#txtPn_Apellido2"), "Segundo Apellido");

    fn_K_TextBox($("#txtPe_Particula"), "Particula");
    fn_K_TextBoxEnable($("#txtPe_Particula"), false);

    fn_K_TextBox($("#txtPn_Particula"), "Particula");
    fn_K_TextBoxEnable($("#txtPn_Particula"), false);

    fn_K_Date($("#txtPn_FechaNac"), "dd/MM/yyyy");
    fn_k_DateSetValue($("#txtPn_FechaNac"), fn_hoy());
    fn_K_ComboBoxSetValue($("#cmbSNInstitucion"), 2);

    // persona juridica
    fn_K_TextMasked($("#txtPJ_NitUsuario"), "0000-000000-000-0", " "); //espacio para quitar el promt
    fn_K_TextBox($("#txtPJ_RazonSocial"), "Razon Social");
    fn_K_TextBox($("#txtPJ_NombreEmpresa"), "Nombre de la Empresa");


    // persona juridica
    fn_K_TextMasked($("#txtIns_NitUsuario"), "0000-000000-000-0", " "); //espacio para quitar el promt
    fn_K_TextBox($("#txtIns_RazonSocial"), "Razon Social");
    fn_K_TextBox($("#txtIns_NombreInstitucion"), "Nombre de la Institucion");


    $("#step_Registro").kendoStepper({
        linear: true,
        steps: [{
            label: "Autenticación",
            iconTemplate: function (e) {
                return '<strong>Paso<br>1</strong>';
            }
        }, {
            label: "Datos Complementarios",
            iconTemplate: function (e) {
                return '<strong>Paso<br>2</strong>';
            }

        }, {
            label: "Seguridad",
            iconTemplate: function (e) {
                return '<strong>Paso<br>3</strong>';
            }
        }, {
            label: "Confirmar",
            iconTemplate: function (e) {
                return '<strong>Paso<br>4</strong>';
            }
        }

        ],
        activate: fn_onActivate,
        select: fn_onSelect
    });


    $("#CmbTipoPersona").data("kendoComboBox").bind("change", function () {
        opcionPartialView = this.value();
        //si ocurre un cambio limbio los campos.
        $("#txtPn_Nombre1").val("");
        $("#txtPn_Apellido1").val("");
        $("#txtPn_Nombre2").val("");
        $("#txtPn_Nombre3").val("");
        $("#txtPn_Apellido2").val("");
        fn_K_ComboBoxSetValue($("#cmbPn_EstadoCivil"), "");
        fn_K_ComboBoxSetValue($("#cmbSNInstitucion"), 2);
        fn_k_DateSetValue($("#txtPn_FechaNac"), fn_hoy());
        fn_K_TextMaskSetValue($("#txtPJ_NitUsuario"), "");
        fn_K_TextMaskSetValue($("#txtPn_DUI"), "");
        $("#txtPJ_NombreEmpresa").val("");
        $("#txtPJ_RazonSocial").val();
        $("#txtPe_Nombre1").val("");
        $("#txtPe_Apellido1").val("");
        fn_K_TextMaskSetValue($("#txtPe_NitUsuario"), "");
        $("#txtPe_Nombre1").val("");
        $("#txtPe_Nombre2").val("");
        $("#txtPe_Nombre3").val("");
        $("#txtPe_Apellido1").val("");
        $("#txtPe_Apellido2").val("");
        $("#txtPe_CarnetResidente").val("");
        fn_K_ComboBoxSetValue($("#cmbPe_EstadoCivil"), "");
        fn_k_DateSetValue($("#txtPe_FechaNac"), fn_hoy());
        $("#txtIns_NombreInstitucion").val("");
        fn_K_TextMaskSetValue($("#txtIns_NitUsuario"), "");
        $("#txtIns_RazonSocial").val("");
        $("#txtPe_Particula").val("");
        $("#txtPn_Particula").val("");
    });

    //$(".alert").delay(5000).slideUp(200, function () {
    //    $(this).alert('close');
    //});

    $("#btnConfirmar").data("kendoButton").bind("click", function () {

        //msg_Error("Errror al guardar", "ESTE NIT ES INVALIDO.. NO EXISTE REGISTRO EN HACIENDA");
        //msg_Success("REGISTRO ACTUALIZADO CORRECTAMENTE");
        //msg_Info("Mensaje", "TIENES UN MENSAJE NUEVO.....");
        fn_Confirmar();
    })

    fn_GetPreguntasSeguridad();


    //#region validarciion de campos

    validInf = $("#frmIngresarDatosCom").kendoValidator({
        rules: {
            Requerido: function (input) {
                if (pasoActual === 0) {
                    if (input.is("[name=txtUsuario]")) {
                        return input.val() !== "";
                    }
                    if (input.is("[name=txtEmail]")) {
                        return input.val() !== "";
                    }
                    if (input.is("[name=txtPassWordUsuario]")) {
                        return input.val() !== "";
                    }
                    if (input.is("[name=txtConfirmarPassWordUsuario]")) {
                        return input.val() !== "";
                    }
                    if (input.is("[name=CmbTipoPersona]")) {
                        return fn_K_ComboBoxGetselectedIndex($("#CmbTipoPersona")) >= 0;
                    }
                    if (input.is("[name=CmbTipoIdentificacion]")) {
                        return fn_K_ComboBoxGetselectedIndex($("#CmbTipoIdentificacion")) >= 0;
                    }
                }
                if (pasoActual === 1) {
                    switch (opcionPartialView) {
                        case '1':
                            if (input.is("[name='txtPn_DUI']")) {
                                return input.val() !== "";
                            }
                            if (input.is("[name='txtPn_Nombre1']")) {
                                return input.val() !== "";
                            }
                            if (input.is("[name='txtPn_Apellido1']")) {
                                return input.val() !== "";
                            }
                            if (input.is("[name='cmbSNInstitucion']")) {
                                return fn_K_ComboBoxGetselectedIndex($("#CmbTipoIdentificacion")) >= 0;
                            }
                            break;
                        case '2':
                            if (input.is("[name='txtPJ_NitUsuario']")) {
                                return input.val() !== "";
                            }
                            if (input.is("[name='txtPJ_RazonSocial']")) {
                                return input.val() !== "";
                            }
                            if (input.is("[name='txtPJ_NombreEmpresa']")) {
                                return input.val() !== "";
                            }

                            break;
                        case '3':
                            if (input.is("[name='txtPe_NitUsuario']")) {
                                return input.val() !== "";
                            }
                            if (input.is("[name='txtPe_CarnetResidente']")) {
                                return input.val() !== "";
                            }
                            if (input.is("[name='txtPe_Nombre1']")) {
                                return input.val() !== "";
                            }
                            if (input.is("[name='txtPe_Apellido1']")) {
                                return input.val() !== "";
                            }

                            break;
                        case '4':
                            if (input.is("[name='txtIns_NitUsuario']")) {
                                return input.val() !== "";
                            }
                            if (input.is("[name='txtIns_RazonSocial']")) {
                                return input.val() !== "";
                            }
                            if (input.is("[name='txtIns_NombreInstitucion']")) {
                                return input.val() !== "";
                            }

                            break;
                        default:
                    }

                }

                return true;
            },
            FMayorIgualHoy: function (input) {
                if (pasoActual === 1) {
                    switch (opcionPartialView) {
                        case '1':
                            if (input.is("[name='txtPn_FechaNac']")) {
                                return kendo.parseDate(input.val()) < kendo.parseDate(kendo.toString(kendo.parseDate(fn_hoy()), 'dd/MM/yyyy'))
                            }
                            break;
                        case '3':
                            if (input.is("[name='txtPe_FechaNac']")) {
                                return kendo.parseDate(input.val()) < kendo.parseDate(kendo.toString(kendo.parseDate(fn_hoy()), 'dd/MM/yyyy'))
                            }
                            break;

                        default:
                    }

                }
                return true;
            },
            FMenor18: function (input) {
                if (pasoActual === 1) {
                    switch (opcionPartialView) {
                        case '1':
                            if (input.is("[name='txtPn_FechaNac']")) {
                                return fn_edad(input.val()) >= 18
                            }
                            break;
                        case '3':
                            if (input.is("[name='txtPe_FechaNac']")) {
                                return fn_edad(input.val()) >= 18
                            }
                            break;

                        default:
                    }

                }
                return true;
            }
        },
        messages: {
            Requerido: "Campo requerido",
            FMayorIgualHoy: "no debe ser mayor o igual a la fecha de hoy",
            FMenor18: "No debe ser menor de edad (18+)"
        }
    }).data("kendoValidator");


    //#endregion

    fn_k_ComboBoxFocus($("#CmbTipoPersona"));

});

let fn_onActivate = (e) => {

    if (e.step.options.index === 0) {
        fn_k_ComboBoxFocus($("#CmbTipoPersona"));

    }

    if (e.step.options.index === 1) {
        switch (opcionPartialView) {
            case '1':
                $("#txtPn_DUI").focus();
                break;
            case '2':
                $("#txtPJ_NitUsuario").focus();
                break;
            case '3':
                $("#txtPe_NitUsuario").focus();
                break;
            case '4':
                $("#txtIns_NitUsuario").focus();
                break;

        }
    }

    if (e.step.options.index === 2) {
        if (PregutasSeguridad === true) {
            /*  fn_k_ComboBoxFocus($(xRespuestasFocus));*/
        }
    }
};


let fn_onSelect = (e) => {

    pasoActual = e.sender.selectedStep.options.index;
    if (e.step.options.index > e.sender.selectedStep.options.index ? !validInf.validate() : false) {
        msg_Error("Paso Siguiente", "Valide si hay campos requeridos");
        e.preventDefault();
    } else {
        mostrarSeccion('step' + `${e.step.options.index}`);
        ocultarSeccion('step' + `${e.sender.selectedStep.options.index}`);

        if (e.step.options.index !== 1) {
            ocultarSeccion('insVista');
            ocultarSeccion('pjVista');
            ocultarSeccion('pnVista');
            ocultarSeccion('peVista');
        } else {
            fn_SeleccionPartialView(opcionPartialView);
        }

        IdUsuario = $("#txtUsuario").val();
        switch (opcionPartialView) {
            case '1':
                Nombre = $("#txtPn_Nombre1").val() + " " + $("#txtPn_Apellido1").val();
                Nit = null;
                NumDocumento = fn_k_TextMaskGetValueRaw($("#txtPn_DUI"));
                PrimerNombre = $("#txtPn_Nombre1").val();
                SegundoNombre = $("#txtPn_Nombre2").val();
                TercerNombre = $("#txtPn_Nombre3").val();
                PrimerApellido = $("#txtPn_Apellido1").val();
                SegundoApellido = $("#txtPn_Apellido2").val();
                NoResidente = null;
                RazonSocial = null;
                IdEstadoCivil = fn_K_ComboBoxGetValue($("#cmbPn_EstadoCivil"));
                Particula = $("#txtPn_Particula").val();
                OrgEstatalMinisterio = fn_K_ComboBoxGetValue($("#cmbSNInstitucion")) === 1 ? 1 : 0;
                FechaNacimiento = kendo.toString(kendo.parseDate($("#txtPn_FechaNac").val()), 's');
                FechaCreacion = fn_hoy();
                break;
            case '2':
                Nombre = $("#txtPJ_NombreEmpresa").val();
                Nit = fn_k_TextMaskGetValueRaw($("#txtPJ_NitUsuario"));
                PrimerNombre = null;
                SegundoNombre = null;
                TercerNombre = null;
                PrimerApellido = null;
                SegundoApellido = null;
                NoResidente = null;
                RazonSocial = $("#txtPJ_RazonSocial").val();
                Particula = 0;
                OrgEstatalMinisterio = 0;
                FechaNacimiento = null;
                FechaCreacion = fn_hoy();
                break;
            case '3':
                Nombre = $("#txtPe_Nombre1").val() + " " + $("#txtPe_Apellido1").val();
                Nit = fn_k_TextMaskGetValueRaw($("#txtPe_NitUsuario"));
                PrimerNombre = $("#txtPe_Nombre1").val();
                SegundoNombre = $("#txtPe_Nombre2").val();
                TercerNombre = $("#txtPe_Nombre3").val();
                PrimerApellido = $("#txtPe_Apellido1").val();
                SegundoApellido = $("#txtPe_Apellido2").val();
                NoResidente = $("#txtPe_CarnetResidente").val();
                RazonSocial = null;
                IdEstadoCivil = fn_K_ComboBoxGetValue($("#cmbPe_EstadoCivil"));
                Particula = $("#txtPe_Particula").val();
                OrgEstatalMinisterio = 0;
                FechaNacimiento = kendo.toString(kendo.parseDate($("#txtPe_FechaNac").val()), 's');
                FechaCreacion = fn_hoy();
                break;
            case '4':
                Nombre = $("#txtIns_NombreInstitucion").val();
                Nit = fn_k_TextMaskGetValueRaw($("#txtIns_NitUsuario"));
                PrimerNombre = null;
                SegundoNombre = null;
                TercerNombre = null;
                PrimerApellido = null;
                SegundoApellido = null;
                NoResidente = null;
                RazonSocial = $("#txtIns_RazonSocial").val();
                Particula = null;
                OrgEstatalMinisterio = 0;
                FechaNacimiento = null;
                FechaCreacion = fn_hoy();
                break;
        }


        PasswordHash = $("#txtPassWordUsuario").val();
        PasswordSalt = $("#txtPassWordUsuario").val();
        FechaVericacionCuenta = null;
        TokenVerificacion = null;
        Correo = $("#txtEmail").val();
        Estado = "REGISTRADO";
        IdPersona = 0;
        IdTipoPersona = fn_K_ComboBoxGetValue($("#CmbTipoPersona"));
        IdTipoIdentificacionPersonal = fn_K_ComboBoxGetValue($("#CmbTipoIdentificacion"));

    };

};


let mostrarSeccion = (id) => {
    let seccion = document.getElementById(id);
    if (seccion !== null) seccion.style.display = 'flex';
};


let ocultarSeccion = (id) => {
    let seccion = document.getElementById(id);
    if (seccion !== null) seccion.style.display = 'none';
};


let fn_GetPreguntasSeguridad = () => {
    let idobj = "";
    $.ajax({
        url: Web_APi + "/v3/6d45e6a7-13ed-484f-bf43-ce5193d7c310",
        type: 'GET',
        success: function (datos) {
            let lPreguntas = $("#listQuestion");
            lPreguntas.children().remove();
            if (datos.length > 0) {
                PregutasSeguridad = true;
                $.each(datos, function (index, elemento) {
                    lPreguntas.append(`<div class="col-lg-6">
                        <input type="radio" name="PreRes" id="txtPre_${elemento.IDPREGUNTA}" class="k-radio">
                        <label class="k-radio-label" for="txtPre_${elemento.IDPREGUNTA}">${elemento.DESCRIPCION}</label>
                </div>
                 <div class="col-lg-6">
                    <label for="txtRes_${elemento.IDPREGUNTA}" class="visually-hidden">Password</label>
                    <input type="text" class="form-control" id="txtRes_${elemento.IDPREGUNTA}" placeholder="repuesta">
                </div>`);

                    idobj = "#txtRes_" + elemento.IDPREGUNTA.toString();

                    switch (elemento.TIPODATO) {
                        case "N":
                            $(idobj).kendoNumericTextBox({
                                format: "#",
                                restrictDecimals: true,
                                decimals: 0,
                                value: 0,
                                max: 22
                            });
                            break;
                        case "D":
                            fn_K_Date($(idobj), "dd/MM/yyyy");
                            fn_k_DateSetValue($(idobj), fn_hoy());
                            break;
                        default:
                    }

                    if (index === 0) {
                        xRespuestasFocus = idobj;
                        xTipoResFocus = elemento.TIPODATO;
                    }
                });
            } else {
                PregutasSeguridad = false;
            }


        }
    });
};

let fn_SeleccionPartialView = (value) => {
    switch (value) {
        case '1':
            mostrarSeccion('pnVista');
            ocultarSeccion('peVista');
            ocultarSeccion('pjVista');
            ocultarSeccion('insVista');
            break;
        case '2':
            mostrarSeccion('pjVista');
            ocultarSeccion('peVista');
            ocultarSeccion('pnVista');
            ocultarSeccion('insVista');
            break;
        case '3':
            mostrarSeccion('peVista');
            ocultarSeccion('pjVista');
            ocultarSeccion('pnVista');
            ocultarSeccion('insVista');
            break;
        case '4':
            mostrarSeccion('insVista');
            ocultarSeccion('pjVista');
            ocultarSeccion('pnVista');
            ocultarSeccion('peVista');
            break;
        default:
            ocultarSeccion('insVista');
            ocultarSeccion('pjVista');
            ocultarSeccion('pnVista');
            ocultarSeccion('peVista');
            break;
    }
}

let fn_Confirmar = () => {
    kendo.ui.progress($(document.body), true);
    $.ajax({
        url: "https://www.mocky.io/v2/596a5f03110000920701cd92",
        type: "POST",
        dataType: "json",
        data: JSON.stringify({
            IDUSUARIO: IdUsuario,
            NOMBRE: Nombre,
            PASSWORHASH: PasswordHash,
            PASSWORDSALT: PasswordSalt,
            FECHAVERIFICACIONCUENTA: FechaVericacionCuenta,
            TOKENVERIFICACION: TokenVerificacion,
            CORREO: Correo,
            ESTADO: Estado,
            IDPERSONAL: IdPersona,
            IDTIPOPERSONA: IdTipoPersona,
            IDTIPOIDENTIFICACIONPERSONAL: IdTipoIdentificacionPersonal,
            NIT: Nit,
            NUMDOCUMENTO: NumDocumento,
            PRIMERNOMBRE: PrimerNombre,
            SEGUNDONOMBBRE: SegundoNombre,
            TERCERNOMBRE: TercerNombre,
            PRIMERAPELLIDO: PrimerApellido,
            SEGUNDOAPELLIDO: SegundoApellido,
            RAZONSOCIAL: RazonSocial,
            NOMBREPERSONA: NombrePersona,
            PARTICULA: Particular,
            ORGESTATALMINISTERIO: OrgEstatalMinisterio,
            FECHANACIMIENTO: FechaNacimiento,
            FECHACREACION: FechaCreacion,
            IDROL: IdRol,
            NORESIDENTE: NoResidente
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            kendo.ui.progress($(document.body), false);
            window.location.href = "/LoginUsuarios";
        },
        error: function (data) {
            kendo.ui.progress($(document.body), false);
        }
    });

};

let fn_edad = (fechanac) => {
    let fecha = kendo.parseDate(fechanac);
    return new Number((new Date().getTime() - fecha.getTime()) / 31536000000).toFixed(0);
};