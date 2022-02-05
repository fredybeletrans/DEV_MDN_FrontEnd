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
let strapi = "";
let aPer = "";
let numIdTramite = 0;
let xIdRetraDoc = 0;
let xItem = 0;
let NombreTramite;
let NombreTipoTramite;
let Noidpersona;
let Noidregistrotramite;
let xEstadoTramite = "";
$(document).ready(function () {

    //#region kendo modal


    $("#dialogPending").kendoDialog({
        width: "450px",
        title: "Tramite pendiente encontrado",
        buttonLayout: "stretched",
        closable: false,
        modal: true,
        visible:false,
/*        content: "<p>El número de tramite # " + `${numIdTramite}`+  " aun esta activo de iniciar ¿Qué desea hacer con este tramite?<p>",*/
        actions: [
            {
                text: 'Cancelar tramite',id:"Cancelar",
                action: function (e) {
                    fn_CambiarEstado(numIdTramite, "ANULADO", "TRAMITE ANULADO POR EL USUARIO", function () { return window.location.href = "/TramitesPortal";  }  )
                }
            },
            { text: 'Continuar', primary: true, }
        ]
       /* close: onClose*/
    });

    $("#dialogValidacion").kendoDialog({
        width: "450px",
        title: "Tramite",
        buttonLayout: "stretched",
        closable: false,
        modal: true,
        visible: false,
        actions: [
           
            {
                text: 'Continuar', primary: true, action: function () {
                    window.location.href = "/TramitesPortal";
                }
            }
        ]
        /* close: onClose*/
    });

    //#endregion

    $("#txtNumTramite").val(xidSolicitud);

    aPer = fn_getPersona(fn_get_User());
    fn_K_ComboBox($("#cmbTipoTramite"), Web_ApiMdn + "RelacionTramitesTipos/ObtenerRelacionTramiteOpc/" + xidTramite, "nombre", "idtipotramite", "Seleccione...");
    //crear boton de ingreso

    fn_K_Button($("#btnConfirmar"), "check", "Ingresar");
    fn_K_TextBox($("#txtNumTramite"), "Tramite");
    fn_K_TextBoxEnable($("#txtNumTramite"), false);

    // buscar tramite pendiente;
    fn_getTramitePendiente(xidPersona, xidTramite, xidTramiteOpcion);


    fn_K_TextBox($("#txtEx_Nombre1"), "Primer Nombre");
    fn_K_TextBox($("#txtEx_Nombre2"), "Segundo Nombre");
    fn_K_TextBox($("#txtEx_Nombre3"), "Tercer Nombre");
    fn_K_TextBox($("#txtEx_Apellido1"), "Primer Apellido");
    fn_K_TextBox($("#txtEx_Apellido2"), "Segundo Apellido");
    fn_K_Date($("#txtEx_FechaNac"), "dd/MM/yyyy");
    fn_k_DateSetValue($("#txtEx_FechaNac"), fn_hoy());

    fn_K_Button($("#btnStep0Next"), "forward-sm", "Continuar...");
    fn_K_Button($("#btnStep1Prev"), "rewind-sm", "volver...");
    fn_K_Button($("#btnStep1Next"), "forward-sm", "Continuar...");
    fn_K_Button($("#btnStep2Prev"), "rewind-sm", "volver...");
    fn_K_Button($("#btnStep2Next"), "forward-sm", "Continuar...");
    fn_K_Button($("#btnStep3Prev"), "rewind-sm", "volver...");
    fn_K_Button($("#btnConfirmar"), "check", "Finalizar Tramite");

    fn_K_TextBox($("#txtLic_Nombre1"), "Primer Nombre");
    fn_K_TextBox($("#txtLic_Nombre2"), "Segundo Nombre");
    fn_K_TextBox($("#txtLic_Nombre3"), "Tercer Nombre");
    fn_K_TextBox($("#txtLic_Apellido1"), "Primer Apellido");
    fn_K_TextBox($("#txtLic_Apellido2"), "Segundo Apellido");
    fn_K_TextBox($("#txtLic_ProfesionOficio"), "Profesion u Oficio");
    fn_K_TextMasked($("#txtLic_DUI"), "00000000-0", " ");
    fn_K_TextMasked($("#txtLic_Nit"), "0000-000000-000-0", " "); //espacio para quitar el promt
    fn_K_Date($("#txtLic_FechaExpedicion"), "dd/MM/yyyy");
    fn_k_DateSetValue($("#txtLic_FechaExpedicion"), fn_hoy());
    fn_K_Date($("#txtLic_FechaExpiracion"), "dd/MM/yyyy");
    fn_k_DateSetValue($("#txtLic_FechaExpiracion"), fn_hoy());
    fn_K_TextBox($("#txtLic_Direccion"), "Dirección");
    fn_K_TextBox($("#txtLic_NumCasa"), "#casa o lote");
    fn_K_ComboBox($("#cmbLic_Pais"), Web_APi + "/v3/08a8799d-e0d0-4572-8a51-90cd2492d473", "NOMBRE", "IDPAIS", "Seleccione...");
    fn_K_ComboBox($("#cmbLic_Depto"), Web_APi + "/v3/5046c9e0-3f41-41f9-9150-e01ecb36b28b", "NOMBRE", "IDPARTAMENTO", "Seleccione...");
    fn_K_ComboBox($("#cmbLic_Municipio"), Web_APi + "/v3/68a10465-3fe2-4ead-9d82-58856e658a4f", "NOMBRE", "IDMUNICIPIO", "Seleccione...");
    fn_K_ComboBox($("#cmbLic_canton"), Web_APi + "/v3/1a1ff030-e555-4b14-ba98-8d5e2c160d47", "NOMBRE", "IDCANTON", "Seleccione...");
    fn_K_TextBox($("#txtLic_PartidaNac"), "Partida de nacimiento");
    fn_K_Date($("#txtLic_FechaNac"), "dd/MM/yyyy");
    fn_k_DateSetValue($("#txtLic_FechaNac"), fn_hoy());

    fn_K_TextBox($("#txtMat_Nombre1"), "Primer Nombre");
    fn_K_TextBox($("#txtMat_Nombre2"), "Segundo Nombre");
    fn_K_TextBox($("#txtMat_Nombre3"), "Tercer Nombre");
    fn_K_TextBox($("#txtMat_Apellido1"), "Primer Apellido");
    fn_K_TextBox($("#txtMat_Apellido2"), "Segundo Apellido");
    fn_K_TextBox($("#txtMat_ProfesionOficio"), "Profesion u Oficio");
    fn_K_TextMasked($("#txtMat_DUI"), "00000000-0", " ");
    fn_K_TextMasked($("#txtMat_Nit"), "0000-000000-000-0", " "); //espacio para quitar el promt
    fn_K_Date($("#txtMat_FechaExpedicion"), "dd/MM/yyyy");
    fn_k_DateSetValue($("#txtMat_FechaExpedicion"), fn_hoy());
    fn_K_Date($("#txtMat_FechaExpiracion"), "dd/MM/yyyy");
    fn_k_DateSetValue($("#txtMat_FechaExpiracion"), fn_hoy());
    fn_K_TextBox($("#txtMat_Direccion"), "Dirección");
    fn_K_TextBox($("#txtMat_NumCasa"), "#casa o lote");
    fn_K_ComboBox($("#cmbMat_Pais"), Web_APi + strapi + "5", "NOMBRE", "IdTipoPersonas", "Seleccione...");
    fn_K_ComboBox($("#cmbMat_Depto"), Web_APi + strapi + "5", "NOMBRE", "IdTipoPersonas", "Seleccione...");
    fn_K_ComboBox($("#cmbMat_Municipio"), Web_APi + strapi + "5", "NOMBRE", "IdTipoPersonas", "Seleccione...");
    fn_K_ComboBox($("#cmbMat_canton"), Web_APi + strapi + "5", "NOMBRE", "IdTipoPersonas", "Seleccione...");

    fn_K_TextBox($("#txtMat_PartidaNac"), "Partida de nacimiento");
    fn_K_Date($("#txtMat_FechaNac"), "dd/MM/yyyy");
    fn_k_DateSetValue($("#txtMat_FechaNac"), fn_hoy());

    switch (xidTramite) {
        case "1":
            fn_K_TextBoxEnable($("#txtEx_Nombre1"));
            fn_K_TextBoxEnable($("#txtEx_Nombre2"));
            fn_K_TextBoxEnable($("#txtEx_Nombre3"));
            fn_K_TextBoxEnable($("#txtEx_Apellido1"));
            fn_K_TextBoxEnable($("#txtEx_Apellido2"));
            fn_k_DateSetValue($("#txtEx_FechaNac"),)
            $("#txtEx_FechaNac").data("kendoDatePicker").enable(false)

            $("#txtEx_Nombre1").val(aPer[0].primernombre);
            $("#txtEx_Nombre2").val(aPer[0].segundonombre);
            $("#txtEx_Nombre3").val(aPer[0].tercernombre);
            $("#txtEx_Apellido1").val(aPer[0].primerapellido);
            $("#txtEx_Apellido2").val(aPer[0].segundoapellido);
            fn_k_DateSetValue($("#txtEx_FechaNac"), kendo.toString(kendo.parseDate(aPer[0].fechanacimiento), 's'))
            break
        case "2":
            fn_K_TextBoxEnable($("#txtMat_Nombre1"));
            fn_K_TextBoxEnable($("#txtMat_Nombre2"));
            fn_K_TextBoxEnable($("#txtMat_Nombre3"));
            fn_K_TextBoxEnable($("#txtMat_Apellido1"));
            fn_K_TextBoxEnable($("#txtMat_Apellido2"));
            fn_k_DateSetValue($("#txtMat_FechaNac"),)
            $("#txtMat_FechaNac").data("kendoDatePicker").enable(false)

            $("#txtMat_Nombre1").val(aPer[0].primernombre);
            $("#txtMat_Nombre2").val(aPer[0].segundonombre);
            $("#txtMat_Nombre3").val(aPer[0].tercernombre);
            $("#txtMat_Apellido1").val(aPer[0].primerapellido);
            $("#txtMat_Apellido2").val(aPer[0].segundoapellido);
            fn_k_DateSetValue($("#txtMat_FechaNac"), kendo.toString(kendo.parseDate(aPer[0].fechanacimiento), 's'))
            fn_K_TextMaskSetValue($("#txtMat_DUI"), aPer[0].idtipoidentificacionpersonal === 1 ? aPer[0].numdocumento : "");
            fn_K_TextMaskSetValue($("#txtMat_Nit"), aPer[0].Nit);
            fn_K_TextMaskEnable($("#txtMat_Nit"), false);
            fn_K_TextMaskEnable($("#txtMat_DUI"), false);

            break
        case "3":
            fn_K_TextBoxEnable($("#txtLic_Nombre1"));
            fn_K_TextBoxEnable($("#txtLic_Nombre2"));
            fn_K_TextBoxEnable($("#txtLic_Nombre3"));
            fn_K_TextBoxEnable($("#txtLic_Apellido1"));
            fn_K_TextBoxEnable($("#txtLic_Apellido2"));
            fn_k_DateSetValue($("#txtLic_FechaNac"),)
            $("#txtLic_FechaNac").data("kendoDatePicker").enable(false)

            $("#txtLic_Nombre1").val(aPer[0].primernombre);
            $("#txtLic_Nombre2").val(aPer[0].segundonombre);
            $("#txtLic_Nombre3").val(aPer[0].tercernombre);
            $("#txtLic_Apellido1").val(aPer[0].primerapellido);
            $("#txtLic_Apellido2").val(aPer[0].segundoapellido);
            fn_k_DateSetValue($("#txtLic_FechaNac"), kendo.toString(kendo.parseDate(aPer[0].fechanacimiento), 's'))
            fn_K_TextMaskSetValue($("#txtLic_DUI"), aPer[0].idtipoidentificacionpersonal === 1 ? aPer[0].numdocumento : "");
            fn_K_TextMaskSetValue($("#txtLic_Nit"), aPer[0].Nit);
            fn_K_TextMaskEnable($("#txtLic_Nit"), false);
            fn_K_TextMaskEnable($("#txtLic_DUI"), false);
            break
        case "4":
            /* $("#TramiteNombre").html("Registro de Avisos");*/
            break
        default:
    }

    fn_K_Date($("#txt_Fechacita"), "dd/MM/yyyy");
    fn_k_DateSetValue($("#txt_Fechacita"), fn_hoy());
    fn_K_ComboBox($("#cmb_Oficinas"), Web_APi + "/v3/577ce1ea-1d43-4c76-8b3e-425a7855f9bb", "NOMBRE", "IDOFICINA", "Seleccione...");
    //#region configuracion de pasos
      $("#step_Registro_sol").kendoStepper({
        linear: true,
        steps: [{
            label: "Datos del tramite",
            iconTemplate: function (e) {
                return '<strong>Paso<br>1</strong>';
            }
        }, {
            label: "Subir Documentos",
            iconTemplate: function (e) {
                return '<strong>Paso<br>2</strong>';
            }

        }, {
            label: "Agendar Cita",
            iconTemplate: function (e) {
                return '<strong>Paso<br>3</strong>';
            }
        }, {
            label: "Mandamiento de pago",
            iconTemplate: function (e) {
                return '<strong>Paso<br>4</strong>';
            }

        }

        ],
        activate: fn_onActivate,
        select: fn_onSelect
      });

     $("#step_Registro_sol").data("kendoStepper").steps()[2].enable(false);
     $("#step_Registro_sol").data("kendoStepper").steps()[3].enable(false);
    //#endregion 
    $("#cmbTipoTramite").data("kendoComboBox").bind("change", function () {

    });

    //#region validarciion de campos

    validInf = $("#frmRegistroSolicitud").kendoValidator({
        rules: {
            Requerido: function (input) {
                if (pasoActual === 0) {
                    //if (input.is("[name=txtUsuario]")) {
                    //    return input.val() !== "";
                    //}
                    //if (input.is("[name=txtEmail]")) {
                    //    return input.val() !== "";
                    //}
                    //if (input.is("[name=txtPassWordUsuario]")) {
                    //    return input.val() !== "";
                    //}
                    //if (input.is("[name=txtConfirmarPassWordUsuario]")) {
                    //    return input.val() !== "";
                    //}
                    if (input.is("[name=cmbTipoTramite]")) {
                        return fn_K_ComboBoxGetselectedIndex($("#cmbTipoTramite")) >= 0;
                    }
                    //if (input.is("[name=CmbTipoIdentificacion]")) {
                    //    return fn_K_ComboBoxGetselectedIndex($("#CmbTipoIdentificacion")) >= 0;
                    //}
                }
                //if (pasoActual === 1) {
                //    switch (opcionPartialView) {
                //        case '1':
                //            if (input.is("[name='txtLic_DUI']")) {
                //                return input.val() !== "";
                //            }
                //            if (input.is("[name='txtLic_Nombre1']")) {
                //                return input.val() !== "";
                //            }
                //            if (input.is("[name='txtLic_Apellido1']")) {
                //                return input.val() !== "";
                //            }
                //            if (input.is("[name='cmbSNInstitucion']")) {
                //                return fn_K_ComboBoxGetselectedIndex($("#CmbTipoIdentificacion")) >= 0;
                //            }
                //            break;
                //        case '2':
                //            if (input.is("[name='txtPJ_NitUsuario']")) {
                //                return input.val() !== "";
                //            }
                //            if (input.is("[name='txtPJ_RazonSocial']")) {
                //                return input.val() !== "";
                //            }
                //            if (input.is("[name='txtPJ_NombreEmpresa']")) {
                //                return input.val() !== "";
                //            }

                //            break;
                //        case '3':
                //            if (input.is("[name='txtEx_NitUsuario']")) {
                //                return input.val() !== "";
                //            }
                //            if (input.is("[name='txtEx_CarnetResidente']")) {
                //                return input.val() !== "";
                //            }
                //            if (input.is("[name='txtEx_Nombre1']")) {
                //                return input.val() !== "";
                //            }
                //            if (input.is("[name='txtEx_Apellido1']")) {
                //                return input.val() !== "";
                //            }

                //            break;
                //        case '4':
                //            if (input.is("[name='txtIns_NitUsuario']")) {
                //                return input.val() !== "";
                //            }
                //            if (input.is("[name='txtIns_RazonSocial']")) {
                //                return input.val() !== "";
                //            }
                //            if (input.is("[name='txtIns_NombreInstitucion']")) {
                //                return input.val() !== "";
                //            }

                //            break;
                //        default:
                //    }

                //}

                return true;
            }
            //FMayorIgualHoy: function (input) {
            //    if (pasoActual === 1) {
            //        switch (opcionPartialView) {
            //            case '1':
            //                if (input.is("[name='txtLic_FechaNac']")) {
            //                    return kendo.parseDate(input.val()) < kendo.parseDate(kendo.toString(kendo.parseDate(fn_hoy()), 'dd/MM/yyyy'))
            //                }
            //                break;
            //            case '3':
            //                if (input.is("[name='txtEx_FechaNac']")) {
            //                    return kendo.parseDate(input.val()) < kendo.parseDate(kendo.toString(kendo.parseDate(fn_hoy()), 'dd/MM/yyyy'))
            //                }
            //                break;

            //            default:
            //        }

            //    }
            //    return true;
            //},
            //FMenor18: function (input) {
            //    if (pasoActual === 1) {
            //        switch (opcionPartialView) {
            //            case '1':
            //                if (input.is("[name='txtLic_FechaNac']")) {
            //                    return fn_edad(input.val()) >= 18
            //                }
            //                break;
            //            case '3':
            //                if (input.is("[name='txtEx_FechaNac']")) {
            //                    return fn_edad(input.val()) >= 18
            //                }
            //                break;

            //            default:
            //        }

            //    }
            //    return true;
            //}
        },
        messages: {
            Requerido: "Campo requerido"
            //FMayorIgualHoy: "no debe ser mayor o igual a la fecha de hoy",
            //FMenor18: "No debe ser menor de edad (18+)"
        }
    }).data("kendoValidator");


    //#endregion

    fn_k_ComboBoxFocus($("#cmbTipoTramite"));
    fn_SeleccionPartialView(xidTramite);


    //#region Programacion de grid para Listar Documentos a subir
    var DsAdj = new kendo.data.DataSource({
        transport: {
            read: {
                url: function (datos) { return Web_ApiMdn + "RegistrosTramitesDocumentos/ObtenerRegistrosTramiteDocumentosConsulta/" + `${numIdTramite}`; },
                dataType: "json",
                contentType: "application/json; charset=utf-8"
            },
            update: {
                url: function (datos) { return Web_ApiMdn + "RegistrosTramitesDocumentos/Modify/" + datos.idregistrotramitedocumento; },
                type: "PUT",
                contentType: "application/json; charset=utf-8"
            },
            parameterMap: function (data, type) {
                if (type !== "read") {
                    return kendo.stringify(data);
                }
            }
        },
        schema: {
            model: {
                id: "idregistrotramitedocumento",
                fields: {
                    idregistrotramitedocumento: {
                        type: "number"

                    },
                    idregistrotramite: {
                        type: "number"

                    },
                    iddocumento: {
                        type: "number"
                    },
                    nombredoc: {
                        type: "string"

                    },
                    fechavigencia: {
                        type: "date"

                    },
                    fechaexpiracion: {
                        type: "date"

                    },
                    fechaemision: {
                        type: "date"

                    },
                    fechamodificacion: {
                        type: "date"

                    },
                    usuariomod: {
                        type: "string"

                    },
                    estado: {
                        type: "string"
                    },
                    requerirfechaemision: {
                        type: "number"
                    },
                    requerirfechaexpiracion: {
                        type: "number"
                    },
                    requerirfechavigencia: {
                        type: "number"
                    }

                }
            }
        }
    });


    $("#GridDocumentos").kendoGrid({
        autoBind: false,
        edit: function (e) {
            fn_K_OcultarCampoGridPopup(e.container, "idregistrotramitedocumento");
            fn_K_OcultarCampoGridPopup(e.container, "idregistrotramite");
            fn_K_OcultarCampoGridPopup(e.container, "iddocumento");
            fn_K_OcultarCampoGridPopup(e.container, "usuariomod");
            fn_K_OcultarCampoGridPopup(e.container, "estado");
            fn_K_OcultarCampoGridPopup(e.container, "nombredoc");
            fn_K_OcultarCampoGridPopup(e.container, "fechamodificacion");

            if (!e.model.isNew()) {
                fn_k_DateEnable($("#fechaemision"), e.model.requerirfechaemision === 0 ? false : true);
                fn_k_DateEnable($("#fechaexpiracion"), e.model.requerirfechaexpiracion === 0 ? false : true);
                fn_k_DateEnable($("#fechavigencia"), e.model.requerirfechavigencia === 0 ? false : true);
            } 
        },
        editable: {
            "window": {
                "width": 500
            }
        },
        columns: [
            { field: "idregistrotramitedocumento", title: "Id Registro Doc", hidden: true },
            { field: "idregistrotramite", title: "Registro tramite", hidden: true },
            { field: "iddocumento", title: "Documento", hidden: true },
            { field: "nombredoc", title: "Documentos" },
            { field: "fechaemision", title: "Emisión", format: "{0: dd/MM/yyyy}" },
            { field: "fechaexpiracion", title: "Expiración", format: "{0: dd/MM/yyyy}" },
            { field: "fechavigencia", title: "Vigencia" ,format: "{0: dd/MM/yyyy}" },
            { field: "fechamodificacion", title: "Fecha modificacion", hidden: true },
            /*  { field: "Documento", title: "Documento:", editor: fileUploadEditor, hidden: true },*/
            { field: "usuariomod", title: "usuariomod", hidden: true },
            { field: "estado", title: "Estado", hidden: true }

        ]
    });

    fn_K_GridConfigurar($("#GridDocumentos").data("kendoGrid"), ModoEdicion.EnPopup, false, true, true, true, true);
    fn_K_GridConfigurar_Add($("#GridDocumentos").data("kendoGrid"), false);
    fn_K_GridConfigurar_Upd_Del($("#GridDocumentos").data("kendoGrid"), true, false);
    fn_K_GridConfigurar_DataSource($("#GridDocumentos").data("kendoGrid"), DsAdj);


    //function fileUploadEditor(container, options) {
    //    $('<input type="file" id="Adjunto" name="files" />')
    //        .appendTo(container)
    //        .kendoUpload({
    //            async: {
    //                /* chunkSize: 11000,// bytes*/
    //                saveUrl: "/TramitesPortal/chunksave",
    //                removeUrl: "/TramitesPortal/remove",
    //                autoUpload: true
    //            },
    //            upload: function (e) {
    //                e.sender.options.async.saveUrl = "/TramitesPortal/chunksave/" + `${xidTramite}/${xidTramiteOpcion}/${fn_K_ComboBoxGetValue($("#cmbTipoTramite"))}/${numIdTramite}`;
    //            },
    //            localization: {
    //                select: '<div class="k-icon k-i-attachment-45"></div>&nbsp;Adjuntos'
    //            },
    //            showFileList: false,
    //            validation: {
    //                maxFileSize: 20000000
    //            },
    //            success: {


    //            }
    //        });



    //}

  


    //#endregion

    //#region subir archivos

    var Dssube = new kendo.data.DataSource({
        transport: {
            read: {
                url: function (datos) { return Web_ApiMdn + "RegistrosTramitesArchivos/ObtenerRegistrosTramiteArchivos/" + Fn_getIdRegDoc($("#GridDocumentos").data("kendoGrid")); },
                dataType: "json",
                contentType: "application/json; charset=utf-8"
            },
            parameterMap: function (data, type) {
                if (type !== "read") {

                    return kendo.stringify(data);
                }
            }
        },
        //requestEnd: function (e) {
        //    Grid_requestEnd(e);
        //    if (e.type === "destroy" || e.type === "update") {
        //        getAdjun(UrlApiArteAdj + "/GetVistaImagenes/" + $("#IdArte").val());
        //        if (e.type === "update") {
        //            if (e.response[0].IdTipoAdjunto === 1) {
        //                var dsres = [{
        //                    NoDocumento: $("#NoDocumento").val(),
        //                    NoReferencia: $("#NoReferencia").val(),
        //                    NombreArchivo: e.response[0].NombreArchivo
        //                }];
        //                fn_SubirArchivoCatalogo(dsres);
        //            }
        //        }
        //    }

        //},
        /*    error: Grid_error,*/
        schema: {
            model: {
                id: "item",
                fields: {
                    idregistrotramitedocumento: {
                        type: "number", defaultValue: function () { return Fn_getIdRegDoc($("#GridDocumentos").data("kendoGrid")); }

                    },
                    item: {
                        type: "number"
                    },
                    nombrearchivo: {
                        type: "string"
                    },
                    ruta: {
                        type: "string"
                    },
                    fechamodificacion: {
                        type: "date"
                    },
                    usuariomod: {
                        type: "string"
                    },
                    partedocumento: {
                        type: "string"
                    },
                    fechacarga: {
                        type: "date"
                    }
                }
            }
        }
    });

    //Grid de ArtesAdjuntos
    $("#GridArchivos").kendoGrid({
        autoBind: false,
        edit: function (e) {
            // Ocultar
            KdoHideCampoPopup(e.container, "idregistrotramitedocumento");
            KdoHideCampoPopup(e.container, "item");
            KdoHideCampoPopup(e.container, "ruta");
            KdoHideCampoPopup(e.container, "nombrearchivo");
            KdoHideCampoPopup(e.container, "fechamodificacion");
            KdoHideCampoPopup(e.container, "usuariomod");
        },
        columns: [
            { field: "idregistrotramitedocumento", title: "idregistrotramitedocumento", hidden: true },
            { field: "item", title: "item", hidden: true },
            { field: "ruta", title: "ruta", hidden: true },
            { field: "partedocumento", title: "Parte" },
            { field: "nombrearchivo", title: "Archivo" },
            { field: "fechacarga", title: "Subido", format: "{0: dd/MM/yyyy}" },
            {
                field: "SubirDoc", title: "&nbsp;",
                command: {
                    name: "SubirDoc",
                    iconClass: "k-icon k-i-attachment",
                    text: "",
                    title: "&nbsp;",
                    click: function (e) {
                        let dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                        xItem = dataItem.item;
                        xIdRetraDoc = dataItem.idregistrotramitedocumento;
                        $("#modalSubirDoc").data("kendoDialog").open().toFront();
                    }
                },
                width: "70px",
                attributes: {
                    style: "text-align: center"
                }
            }

        ]
    });

    fn_K_GridConfigurar($("#GridArchivos").data("kendoGrid"), ModoEdicion.EnPopup, false, true, true, true, true);
    fn_K_GridConfigurar_Add($("#GridArchivos").data("kendoGrid"), false);
    fn_K_GridConfigurar_Upd_Del($("#GridArchivos").data("kendoGrid"), false, false);
    fn_K_GridConfigurar_DataSource($("#GridArchivos").data("kendoGrid"), Dssube);


 
   //#endregion

    //#region modalsubir documentos

    $("#modalSubirDoc").kendoDialog({
        height: "20%",
        width: "30%",
        title: "Subir documentos",
        closable: true,
        modal: true,
        visible: false,
        maxHeight: 900
    });

    $("#Adjunto").kendoUpload({
        async: {
            /* chunkSize: 11000,// bytes*/
            saveUrl: "/TramitesPortal/chunksave",
            removeUrl: "/TramitesPortal/remove",
            autoUpload: true
        },
        upload: function (e) {
            let AsignacionNombre = `DOC${pad(fn_K_ComboBoxGetValue($("#cmbTipoTramite")), 3)}${pad(xIdRetraDoc, 9)}${pad(xItem, 3)}`;
            e.sender.options.async.saveUrl = "/TramitesPortal/chunksave/" + `${NombreTramite}/${NombreTipoTramite}/${xidPersona}/${numIdTramite}/${AsignacionNombre}`;
        },
        localization: {
            select: '<div class="k-icon k-i-attachment-45"></div>&nbsp;Subir Documentos'
        },
        showFileList: false,
        validation: {
            maxFileSize: 20000000,
            allowedExtensions: [".jpg", ".pdf"]
        },
        success: function (e) {
            if (e.response.Resultado === true) {
                if (e.operation === "upload") {
                    fn_RegistrarArchivoCargado(xIdRetraDoc, xItem, e.response.NombreArchivo.toString(), e.response.ruta.toString())
                }
            } else {
                msg_Error("Tramite", "error en carga de archivos");
            }
        }


    });

    //#endregion 

    let seRows = [];
    $("#GridDocumentos").data("kendoGrid").bind("dataBound", function (e) { //foco en la fila
        fn_K_gridSetSelectRow($("#GridDocumentos"), seRows);

    });

    $("#GridDocumentos").data("kendoGrid").bind("change", function (e) { //foco en la fila
        fn_k_gridSelectRow($("#GridDocumentos"), seRows);
        $("#GridArchivos").data("kendoGrid").dataSource.data([]);
        $("#GridArchivos").data("kendoGrid").dataSource.read();
        xIdRetraDoc = Fn_getIdRegDoc($("#GridDocumentos").data("kendoGrid"));
    });


    let seRows1 = [];
    $("#GridArchivos").data("kendoGrid").bind("dataBound", function (e) { //foco en la fila
        fn_K_gridSetSelectRow($("#GridArchivos"), seRows1);

    });

    $("#GridArchivos").data("kendoGrid").bind("change", function (e) { //foco en la fila
        fn_k_gridSelectRow($("#GridArchivos"), seRows1);
    });


    $("#btnStep0Next").data("kendoButton").bind("click", function () {
        if (fn_CambiarPasoTramite(0, 1)) {
            $("#step_Registro_sol").data("kendoStepper").next();
            $("#step_Registro_sol").data("kendoStepper").select(1);
            fn_registrarTramite();
        }
    });

    $("#btnStep1Next").data("kendoButton").bind("click", function () {
        if (xEstadoTramite === "REGISTRADO") {
            fn_CambiarEstado(numIdTramite, "VERIFICACION", "TRAMITE EN VERIFICACION DE DOCUMENTOS", function () { return fn_msgVerificacion(); });
        }else{
            if (fn_CambiarPasoTramite(1, 2)) {
                $("#step_Registro_sol").data("kendoStepper").next();
                $("#step_Registro_sol").data("kendoStepper").select(2);
            }
        }
       
    });

    $("#btnStep1Prev").data("kendoButton").bind("click", function () {
        if (fn_CambiarPasoTramite(1, 0)) {
            $("#step_Registro_sol").data("kendoStepper").previous();
            $("#step_Registro_sol").data("kendoStepper").select(0);
        }
    });


    $("#btnStep2Next").data("kendoButton").bind("click", function () {
        if (fn_CambiarPasoTramite(2, 3)) {
            $("#step_Registro_sol").data("kendoStepper").next();
            $("#step_Registro_sol").data("kendoStepper").select(3);
        }
    });

    $("#btnStep2Prev").data("kendoButton").bind("click", function () {
        if (fn_CambiarPasoTramite(2, 1)) {
            $("#step_Registro_sol").data("kendoStepper").previous();
            $("#step_Registro_sol").data("kendoStepper").select(1);
        }
    });


    $("#btnStep3Prev").data("kendoButton").bind("click", function () {
        if (fn_CambiarPasoTramite(3, 2)) {
            $("#step_Registro_sol").data("kendoStepper").previous();
            $("#step_Registro_sol").data("kendoStepper").select(2);
 
        }
    });

    $("#btnConfirmar").data("kendoButton").bind("click", function () {

        var exampleModal = document.getElementById('ModalMsgSol')
        exampleModal.addEventListener('show.bs.modal', function (event) {

            // Update the modal's content.
            var modalTitle = exampleModal.querySelector('.modal-title')
            var modalBodyInput = exampleModal.querySelector('.modal-body h4')

            modalTitle.textContent = 'Solicitud finalizada ';
            modalBodyInput.textContent = 'Su solicitud ha sido recibida. Numero de Tramite asignado : ' + $("#txtNumTramite").val();
      
        })
        var myModal = new bootstrap.Modal(document.getElementById('ModalMsgSol'), {
            keyboard: false,
            backdrop: 'static'
        })
        myModal.show();
    });

    $("#btnCloseMsg").click(function () {
        window.location.href = "/TramitesPortal";
    });


});
let fn_onActivate = (e) => {
    if (e.step.options.index === 0) {
        fn_k_ComboBoxFocus($("#cmbTipoTramite"));
    }
};
let fn_onSelect = (e) => {
    let indexAct = e.sender.selectedStep.options.index;
    let indexSig = e.step.options.index;

    if (indexAct === 1 && indexSig === 2) {
        if (xEstadoTramite === "REGISTRADO") {
            fn_CambiarEstado(numIdTramite, "VERIFICACION", "TRAMITE EN VERIFICACION DE DOCUMENTOS", function () { return fn_msgVerificacion(); });
            return;
        }
    }
    fn_CambiarPasoTramite(indexAct, indexSig)
    if (indexAct === 0 && indexSig===1) {
        fn_registrarTramite();
    }
};
let fn_CambiarPasoTramite = (actual, siguiente) => {
    let cambio = false;
    pasoActual = actual;
    if (siguiente > actual ? !validInf.validate() : false) {
        msg_Error("Paso Siguiente", "Valide si hay campos requeridos");
        cambio = false;
    } else {
        mostrarSeccion('step' + `${siguiente}`);
        ocultarSeccion('step' + `${actual}`);
        cambio = true;
    };

    return cambio;
}
let mostrarSeccion = (id) => {
    let seccion = document.getElementById(id);
    if (seccion !== null) seccion.style.display = 'flex';
};
let ocultarSeccion = (id) => {
    let seccion = document.getElementById(id);
    if (seccion !== null) seccion.style.display = 'none';
};
let fn_SeleccionPartialView = (value) => {
    switch (value) {
        case '1':
         
            mostrarSeccion('peVista');
            ocultarSeccion('pjVista');
            ocultarSeccion('pnVista');
            ocultarSeccion('insVista');
            break;
        case '2':
            mostrarSeccion('pjVista');
            ocultarSeccion('peVista');
            ocultarSeccion('pnVista');
            ocultarSeccion('insVista');
            break;
        case '3':
            mostrarSeccion('pnVista');
            ocultarSeccion('peVista');
            ocultarSeccion('pjVista');
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
let fn_edad = (fechanac) => {
    let fecha = kendo.parseDate(fechanac);
    return new Number((new Date().getTime() - fecha.getTime()) / 31536000000).toFixed(0);
};
// funcion registra tramite padre
let fn_registrarTramite = () => {
    if (numIdTramite === 0) {
        kendo.ui.progress($(document.body), true);
        //nuevo
        $.ajax({
            url: Web_ApiMdn + "RegistrosTramites/register",
            type: "POST",
            dataType: "json",
            data: JSON.stringify({
                idregistrotramite: 0,
                idpersona: xidPersona ,
                idtramite: xidTramite ,
                idtramiteopcion: xidTramiteOpcion ,
                idtipotramite: fn_K_ComboBoxGetValue($("#cmbTipoTramite")),
                numtramite: 0,
                fechamodificacion:fn_hoy(),
                usuariomod: fn_get_User(),
                numsolicitud: 0,
                fechasolicitud: fn_hoy(),
                estado: "REGISTRADO"

            }),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                numIdTramite = data.idRegistroTramite;
                $("#txtNumTramite").val(data.idRegistroTramite);
                xEstadoTramite = data.estado;
                fn_generarListaDocumentos(data.idRegistroTramite, xidTramiteOpcion, fn_K_ComboBoxGetValue($("#cmbTipoTramite")));
                fn_getTramitesRuta(data.idRegistroTramite);
            },
            error: function (error) {
                kendo.ui.progress($(document.body), false);
                msg_Error("Tramite", error.responseJSON !== undefined ? error.responseJSON.message : error.statusText);
            }
        });

    } else {
        //modificacion
        $.ajax({
            url: Web_ApiMdn + "RegistrosTramites/Modify/" +`${numIdTramite}`,
            type: "PUT",
            dataType: "json",
            data: JSON.stringify({
                idregistrotramite: numIdTramite,
                idpersona: xidPersona,
                idtramite: xidTramite,
                idtramiteopcion: xidTramiteOpcion,
                idtipotramite: fn_K_ComboBoxGetValue($("#cmbTipoTramite")),
                numtramite: 0,
                fechamodificacion: fn_hoy(),
                usuariomod: fn_get_User(),
                numsolicitud: 0,
                fechasolicitud: fn_hoy(),
                estado: "REGISTRADO"

            }),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                kendo.ui.progress($(document.body), false);
                numIdTramite = data.idRegistroTramite;
                xEstadoTramite = data.estado;
                $("#txtNumTramite").val(data.idRegistroTramite);
                fn_generarListaDocumentos(data.idRegistroTramite, xidTramiteOpcion, fn_K_ComboBoxGetValue($("#cmbTipoTramite")));

            },
            error: function (error) {
                kendo.ui.progress($(document.body), false);
                msg_Error("Tramite", error.responseJSON !== undefined ? error.responseJSON.message : error.statusText);
            }
        });

    }
}
//leer tramites pendientes
let fn_getTramitePendiente =  (idPersona, idtramite, idTramiteOpcion)=> {
    kendo.ui.progress($(document.body), true);
    $.ajax({
        url: Web_ApiMdn + "RegistrosTramites/ObtenerRegistrosTramitePendiente/" + `${idPersona}/${idtramite}/${idTramiteOpcion}`,
        dataType: 'json',
        type: 'GET',
        success: function (dato) {
            if (dato.length > 0) {
                $("#txtNumTramite").val(dato[0].idregistrotramite);
                numIdTramite = dato[0].idregistrotramite;
                fn_K_ComboBoxSetValue($("#cmbTipoTramite"), dato[0].idtipotramite);
                fn_k_ComboBoxEnable($("#cmbTipoTramite"), false);
                fn_getTramitesRuta(dato[0].idregistrotramite);
                xEstadoTramite = dato[0].estado;
                fn_msgPendiente();
            } else {
                $("#txtNumTramite").val(0);
                numIdTramite = 0;
                fn_k_ComboBoxEnable($("#cmbTipoTramite"), true);
                xEstadoTramite = "REGISTRADO";

            }
            
            kendo.ui.progress($(document.body), false);
        },
        error: function () {
            kendo.ui.progress($(document.body), false);
        }
    });

};
//genera la lista de los documentos a subir
let fn_generarListaDocumentos = (xIdregistrotramite, xIdtramiteopcion, xIdtipotramite) => {

    $.ajax({
        url: Web_ApiMdn + "RegistrosTramitesDocumentos/register_batch",
        type: "POST",
        dataType: "json",
        data: JSON.stringify({
            idregistrotramite: xIdregistrotramite,
            idtramiteopcion: xIdtramiteopcion,
            idtipotramite: xIdtipotramite
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            $("#GridDocumentos").data("kendoGrid").dataSource.read();
            fn_generarPrecargaArchivos(xIdregistrotramite);
        },
        error: function (error) {
            kendo.ui.progress($(document.body), false);
            msg_Error("Tramite", error.responseJSON !== undefined ? error.responseJSON.message : error.statusText);
        }
    });

};
// generar la precarga (filas) de los archivos a subir
let fn_generarPrecargaArchivos = (xIdregistrotramite) => {

    $.ajax({
        url: Web_ApiMdn + "RegistrosTramitesArchivos/register_batch",
        type: "POST",
        dataType: "json",
        data: JSON.stringify({
            idregistrotramite: xIdregistrotramite
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            kendo.ui.progress($(document.body), false);
            $("#GridArchivos").data("kendoGrid").dataSource.read();
        },
        error: function (error) {
            kendo.ui.progress($(document.body), false);
            msg_Error("Tramite", error.responseJSON !== undefined ? error.responseJSON.message : error.statusText);
        }
    });

};
let Fn_getIdRegDoc= function (g) {
    var SelItem = g.dataItem(g.select());
    return SelItem === null ? 0 : SelItem.idregistrotramitedocumento;
};
let Fn_getItemRegDoc= function (g) {
    var SelItem = g.dataItem(g.select());
    return SelItem === null ? 0 : SelItem.item;
};

//registra el nombre y la ruta del archivo cargado
let fn_RegistrarArchivoCargado = (xid,xitem, xnombrearchivo,xruta) => {
    $.ajax({
        url: Web_ApiMdn + "RegistrosTramitesArchivos/Modify_PreCarga/" + `${xid}/${xitem}`,
        type: "PUT",
        dataType: "json",
        data: JSON.stringify({
            idregistrotramitedocumento: xid,
            item: xitem,
            nombrearchivo: xnombrearchivo,
            ruta: xruta,
            fechamodificacion: fn_hoy(),
            usuariomod: "USRSYSMDN",
            fechacarga: fn_hoy()
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            kendo.ui.progress($(document.body), false);
            $("#GridArchivos").data("kendoGrid").dataSource.read();
            $("#modalSubirDoc").data("kendoDialog").open().close();
        },
        error: function (error) {
            kendo.ui.progress($(document.body), false);
            msg_Error("Tramite", error.responseJSON !== undefined ? error.responseJSON.message : error.statusText);
        }
    });

}
//utilizado para obtener la ruta para crear las carpetas
let fn_getTramitesRuta = (xid) => {
    $.ajax({
        url: Web_ApiMdn + "RegistrosTramites/ObtenerRegistrosTramiteRuta/" + `${xid}`,
        dataType: 'json',
        type: 'GET',
        success: function (dato) {
            if (dato.length > 0) {
                NombreTramite = dato[0].nombreTramite;
                NombreTipoTramite = dato[0].nombreTipoTramite;
                Noidpersona = dato[0].idpersona;
                Noidregistrotramite = dato[0].noidregistrotramite;

            } else {
                NombreTramite = "";
                NombreTipoTramite = "";
                Noidpersona = "";
                Noidregistrotramite = "";
            }
        }

    });

};
//BORRRAR TRAMITE
let fn_DeleteTramite = () => {
    $.ajax({
        url: Web_ApiMdn + "RegistrosTramites/delete/" + `${numIdTramite}`,
        type: "DELETE",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            kendo.ui.progress($(document.body), false);
            window.location.href = "/TramitesPortal";
        },
        error: function (error) {
            kendo.ui.progress($(document.body), false);
            msg_Error("Tramite", error.responseJSON !== undefined ? error.responseJSON.message : error.statusText);
        }
    });
}

let fn_msgPendiente = () => {
    var strinMsg = '<div class="alert alert-warning d-flex align-items-center" role="alert">' +
        /* '<span class="k-icon k-i-gear k-icon-32"></span>'+*/
        '<div class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:" ><span class="k-icon k-i-warning k-icon-48"></span></div>' +
        '<div><p>El tramite # ' + `${pad(numIdTramite, 9)}` + ' aun se encuentra activo sin pasar a validación de documentos <strong>¿Qué desea hacer con este tramite?</strong><p> </div>' +
        '</div>';
    $("#dialogPending").data("kendoDialog").content(strinMsg);
    /*  $("#dialogPending").data("kendoDialog").content("<p>El tramite # " + `${pad(numIdTramite,9)}` + " aun se encuentra activo sin pasar a validación de documentos ¿Qué desea hacer con este tramite?<p>");*/
    $("#dialogPending").data("kendoDialog").open();
    $("#dialogPending").data("kendoDialog").actio
}

let fn_msgVerificacion = () => {
    var strinMsg = '<div class="alert alert-primary d-flex align-items-center" role="alert">'+
        '<div class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:" ><span class="k-icon k-i-information k-icon-48"></span></div>' +
        '<div><p>El tramite # ' + `${pad(numIdTramite, 9)}` + ' pasa a validacion de documentos <strong>haga clic en continuar</strong><p> </div>' +
        '</div>';
    $("#dialogValidacion").data("kendoDialog").content(strinMsg);
    $("#dialogValidacion").data("kendoDialog").open();
}

let fn_CambiarEstado = (xidregistrotramite, xEstado, xmotivo,fn_OnSucces) => {
    $.ajax({
        url: Web_ApiMdn + "RegistrosTramites/CambiarEstado",
        type: "POST",
        dataType: "json",
        data: JSON.stringify({
            idregistrotramite: xidregistrotramite,
            estado: xEstado,
            motivo: xmotivo,
            usuario: fn_get_User(),
            fecha: fn_hoy()
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            kendo.ui.progress($(document.body), false);
            if (fn_OnSucces !== undefined) {
                fn_OnSucces();
            }
         
        },
        error: function (error) {
            kendo.ui.progress($(document.body), false);
            msg_Error("Tramite","Error en cambio de estado");
        }
    });

}