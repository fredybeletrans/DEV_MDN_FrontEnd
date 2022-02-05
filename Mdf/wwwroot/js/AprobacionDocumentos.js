'use strict'

let xIdRegTraDocApro = 0;

$(document).ready(function () {

    //let dtfecha = new Date();

    //$("#dFechaDesde").kendoDatePicker({ format: "dd/MM/yyyy" });
    //$("#dFechaDesde").data("kendoDatePicker").value( kendo.toString(kendo.parseDate(new Date(dtfecha.getFullYear(), dtfecha.getMonth() - 1, dtfecha.getUTCDate())), 's'));
    //$("#dFechaHasta").kendoDatePicker({ format: "dd/MM/yyyy" });
    //$("#dFechaHasta").data("kendoDatePicker").value(fn_hoy());

    fn_K_ComboBox($("#CmbTramite"), Web_ApiMdn + "Tramites/ObtenerTramites", "nombre", "idtramite", "Selecione un tramite...");
    fn_ComboboxData($("#cmbOpciones"), "[]", "nombre", "idtramiteopcion", "Seleccione ....");


/*    $('#chkRangFechas').prop('checked', 1);*/

    //#region tramites
    var Ds = new kendo.data.DataSource({
        transport: {
            read: {
                url: function(datos) { return Web_ApiMdn + "RegistrosTramites/ObtenerRegistrosTramiteAprobaciones/" + (fn_K_ComboBoxGetValue($("#CmbTramite")) === null ? 0 : fn_K_ComboBoxGetValue($("#CmbTramite"))) + "/" + (fn_K_ComboBoxGetValue($("#cmbOpciones")) === null ? 0 : fn_K_ComboBoxGetValue($("#cmbOpciones"))); },
                dataType: "json",
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
                id: "IDREGISTROTRAMITE",
                fields: {

                    idregistrotramite:  {
                        type: "string"
                    },
                    idpersona: {
                        type: "number"

                    },
                    idtramite:  {
                        type: "number"
                    },
                    nombretramite: {
                        type: "string"

                    },
                    idtramiteopcion: {
                        type: "number"
                    },
                    nombretramiteopcion: {
                        type: "string"
                    },
                    idtipotramite: {
                        type: "string"
                    },
                    nombretipotramite: {
                        type: "string"
                    },
                    nombrepersona: {
                        type: "string"
                    },
                    fechasolicitud: {
                        type: "date"
                    },
                    estado: {
                        type: "string"
                    }

                }
            }
        }
    });

    $("#gTramitesSinAprobacion").kendoGrid({
        autoBind: false,
        dataBound: function () {
            for (var i = 0; i < this.columns.length; i++) {
                this.autoFitColumn(i);
                this.columnResizeHandleWidth;
            }
        },
        edit: function (e) {
            // Ocultar
            fn_K_OcultarCampoGridPopup(e.container, "idregistrotramite");
            fn_K_OcultarCampoGridPopup(e.container, "idpersona");
            fn_K_OcultarCampoGridPopup(e.container, "idtramite");
            fn_K_OcultarCampoGridPopup(e.container, "idtramiteopcion");
            fn_K_OcultarCampoGridPopup(e.container, "fechasolicitud");
            fn_K_OcultarCampoGridPopup(e.container, "estado");
        },
        columns: [
            {
                field: "aprobar", title: "&nbsp;",
                command: {
                    name: "Aprobar",
                    iconClass: "k-icon k-i-success",
                    text: "",
                    title: "&nbsp;",
                    click: function (e) {
                        let dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                        var lstparam = {
                            idregistrotramite: dataItem.idregistrotramite
                        };
                        fn_CambioEstadoVistaModal("vModalCambioEstado", "REGISTROSTRAMITES_PW",
                            dataItem.estado, Web_ApiMdn + "RegistrosTramites/CambiarEstado",
                            lstparam, function () { return fn_refresh(); });

                    }
                },
                width: "70px",
                attributes: {
                    style: "text-align: center"
                }
            },
            { field: "idregistrotramite", title: "No Trámite", minResizableWidth: 150 },
            { field: "nombrepersona", title: "Cliente", minResizableWidth: 200 },
            { field: "idpersona", title: "id Persona", hidden: true, minResizableWidth: 150 },
            { field: "idtramite", title: "id Trámite", hidden: true, minResizableWidth: 150 },
            { field: "nombretramite", title: "Trámite", minResizableWidth: 200},
            { field: "idtramiteopcion", title: "id tramite Opcion", hidden: true, minResizableWidth: 150 },
            { field: "nombretramiteopcion", title: "Opción", minResizableWidth: 200},
            { field: "idtipotramite", title: "id Tipo Tramite", hidden: true, minResizableWidth: 150  },
            { field: "nombretipotramite", title: "Tipo Tramite", minResizableWidth: 200 },
            { field: "fechasolicitud", title: "Fecha Solicitud", format: "{0: dd/MM/yyyy}", minResizableWidth: 150},
            { field: "estado", title: "Estado", minResizableWidth: 100 }
          
        ]
    });

    fn_K_GridConfigurar($("#gTramitesSinAprobacion").data("kendoGrid"), ModoEdicion.EnPopup, true, true, true, true, true, 650);
    fn_K_GridConfigurar_Add($("#gTramitesSinAprobacion").data("kendoGrid"), false);
    fn_K_GridConfigurar_Upd_Del($("#gTramitesSinAprobacion").data("kendoGrid"), false, false);
    fn_K_GridConfigurar_DataSource($("#gTramitesSinAprobacion").data("kendoGrid"), Ds);

    


    $("#gTramitesSinAprobacion").data("kendoGrid").dataSource.read();
    //#endregion 


    //#region tramites opciones
    var Dsopciones = new kendo.data.DataSource({
        transport: {
            read: {
                url: function (datos) { return Web_ApiMdn + "RegistrosTramitesDocumentos/ObtenerRegistrosTramiteDocumentosAprobaciones/" + Fn_getIdRegApro($("#gTramitesSinAprobacion").data("kendoGrid")); },
                dataType: "json",
                contentType: "application/json; charset=utf-8"
            },
            parameterMap: function (data, type) {
                if (type !== "read") {

                    return kendo.stringify(data);
                }
            }
        },
        group: {
            field: "nombredocumento"
        },
        schema: {
            model: {
                id: "idregistrotramitedocumento",
                fields: {
                    idregistrotramitedocumento: {
                        type: "number"
                    },
                    item: {
                        type: "number"
                    },
                    idregistrotramite: {
                        type: "number"
                    },
                    iddocumento: {
                        type: "number"
                    },
                    nombredocumento: {
                        type: "string"

                    },
                    partedocumento: {
                        type: "string"
                    },
                    nombrearchivo: {
                        type: "string"
                    },
                    ruta: {
                        type: "string"
                    },
                    idpersona: {
                        type: "number"

                    },
                    idtramite: {
                        type: "number"
                    },
                    nombretramite: {
                        type: "string"

                    },
                    idtramiteopcion: {
                        type: "number"
                    },
                    nombretramiteopcion: {
                        type: "string"
                    },
                    idtipotramite: {
                        type: "string"
                    },
                    nombretipotramite: {
                        type: "string"
                    },
                    nombrepersona: {
                        type: "string"
                    }

                }
            }
        }
    });

    $("#gTramitesSinAprobDocumento").kendoGrid({
        autoBind: false,
  
        edit: function (e) {
            // Ocultar
            fn_K_OcultarCampoGridPopup(e.container, "idregistrotramitedocumento");
            fn_K_OcultarCampoGridPopup(e.container, "item");
            fn_K_OcultarCampoGridPopup(e.container, "iddocumento");
            fn_K_OcultarCampoGridPopup(e.container, "nombredocumento");
            fn_K_OcultarCampoGridPopup(e.container, "partedocumento");
            fn_K_OcultarCampoGridPopup(e.container, "nombrearchivo");
            fn_K_OcultarCampoGridPopup(e.container, "ruta");

        },
        columns: [
            { field: "idregistrotramitedocumento", title: "id reg. tramite documento", hidden: true },
            { field: "item", title: "item", hidden: true },
            { field: "idregistrotramite", title: "id registro tramite", hidden: true },
            { field: "iddocumento", title: "id documento", hidden: true },
            { field: "nombredocumento", title: "Documento", hidden: true },
            { field: "partedocumento", title: "Parte" },
            { field: "ruta", title: "ruta", hidden: true },
            { field: "idpersona", title: "id Persona", hidden: true },
            { field: "idtramite", title: "id Trámite", hidden: true },
            { field: "nombretramite", title: "Trámite", hidden: true },
            { field: "idtramiteopcion", title: "id tramite Opcion", hidden: true },
            { field: "nombretramiteopcion", title: "Opción", hidden: true  },
            { field: "nombrepersona", title: "Cliente", hidden: true },
            { field: "idtipotramite", title: "id Tipo Trámite", hidden: true  },
            { field: "nombretipotramite", title: "Tipo Tramite", hidden: true },
            { field: "nombrearchivo", title: "Archivo", template: function (data) { return "<a href='/Documentos/" + `${data["nombretramite"]}/${data["nombretipotramite"]}/${pad(data["idpersona"].toString(), 9)}/${pad(data["idregistrotramite"].toString(), 9)}/${data["nombrearchivo"]}`  + "' target='_self' style='text-decoration: underline;'>" + (data["nombrearchivo"] === null ? "" : data["nombrearchivo"]) + "</a>"; } }
            
            
        ]
    });

    fn_K_GridConfigurar($("#gTramitesSinAprobDocumento").data("kendoGrid"), ModoEdicion.EnPopup, true, true, true, true, true,370);
    fn_K_GridConfigurar_Add($("#gTramitesSinAprobDocumento").data("kendoGrid"), false);
    fn_K_GridConfigurar_Upd_Del($("#gTramitesSinAprobDocumento").data("kendoGrid"), false, false);
    fn_K_GridConfigurar_DataSource($("#gTramitesSinAprobDocumento").data("kendoGrid"), Dsopciones);


    let seRows = [];
    $("#gTramitesSinAprobacion").data("kendoGrid").bind("dataBound", function (e) { //foco en la fila
        fn_K_gridSetSelectRow($("#gTramitesSinAprobacion"), seRows);
    });

    $("#gTramitesSinAprobacion").data("kendoGrid").bind("change", function (e) { //foco en la fila
        fn_k_gridSelectRow($("#gTramitesSinAprobacion"), seRows);
        $("#gTramitesSinAprobDocumento").data("kendoGrid").dataSource.data([]);
        $("#gTramitesSinAprobDocumento").data("kendoGrid").dataSource.read();
    });


    let seRows1 = [];
    $("#gTramitesSinAprobDocumento").data("kendoGrid").bind("dataBound", function (e) { //foco en la fila
        fn_K_gridSetSelectRow($("#gTramitesSinAprobDocumento"), seRows1);
    });

    $("#gTramitesSinAprobDocumento").data("kendoGrid").bind("change", function () {
        fn_k_gridSelectRow($("#gTramitesSinAprobacion"), seRows1);
        let vImg = $("#divdoc")
        vImg.children().remove();
        let sItem = this.dataItem(this.select());
        /* if (sItem.nombrearchivo !== null) {*/
        let vArchivo = sItem === null ? 0 : sItem.nombrearchivo;
        let vIdreg = sItem === null ? 0 : sItem.idregistrotramite;
        let vnombretramite =sItem=== null ? "" : sItem.nombretramite;
        let vnombretipotramite = sItem === null ? "" : sItem.nombretipotramite;
        let vidpersona = sItem === null ? 0 : sItem.idpersona;
        let vidregistrotramite = sItem === null ? 0 : sItem.idregistrotramite;

        let strruta = `${vnombretramite}/${vnombretipotramite}/${pad(vidpersona, 9)}/${pad(vidregistrotramite, 9)}/${vArchivo}`;

        /*  vImg.append('<img src="/Documentos/' + strruta + '" id="img-' + vIdreg + '" />');*/
        vImg.append('<div class="border border-2 container" style="text-align: -webkit-center;">'+
            '<div class="col-md-4" style="padding-left: 0px;  padding-right: 0px;">' +
            '<img src="/Documentos/' + strruta + '" id="img-' + vIdreg + '" class="img-responsive" style="width:100%;height:100%" onerror="fn_img_Error(this)">' +
            '</div>' +
            '</div>');

        let vid = "img-" + vIdreg.toString()

        let viewer = new Viewer(document.getElementById(vid));
        /*   }*/


    });

    $("#gTramitesSinAprobDocumento").data("kendoGrid").dataSource.read();
    //#endregion

    $("#CmbTramite").data("kendoComboBox").bind("change", function (e) {
        let iden = this.value();
        //Si se vacía el control
        if (iden === "") {
            fn_K_ComboBoxSetValue($("#cmbOpciones"), "");
            $("#gTramitesSinAprobacion").data("kendoGrid").dataSource.read().then(function () { $("#gTramitesSinAprobDocumento").data("kendoGrid").dataSource.read(); });
        } else {
            $("#cmbOpciones").data("kendoComboBox").setDataSource(fn_GetOpciones(iden));
            $("#gTramitesSinAprobacion").data("kendoGrid").dataSource.read().then(function () { $("#gTramitesSinAprobDocumento").data("kendoGrid").dataSource.read(); });
          
        }
    });

    $("#cmbOpciones").data("kendoComboBox").bind("change", function (e) {
        let iden = this.value();
        //Si se vacía el control
        if (iden === "") {
            $("#gTramitesSinAprobacion").data("kendoGrid").dataSource.read().then(function () { $("#gTramitesSinAprobDocumento").data("kendoGrid").dataSource.read();});
       
        } else {
            $("#gTramitesSinAprobacion").data("kendoGrid").dataSource.read().then(function () { $("#gTramitesSinAprobDocumento").data("kendoGrid").dataSource.read(); });
           
        }
    });

});


var fn_GetOpciones =  (viden) =>{
    //preparar crear datasource para obtner la tecnica filtrado por base
    return new kendo.data.DataSource({
        sort: { field: "nombre", dir: "asc" },
        dataType: 'json',
        transport: {
            read: function (datos) {
                $.ajax({
                    dataType: 'json',
                    async: false,
                    url: Web_ApiMdn + "RelacionTramiteOpciones/ObtenerRelacionTramiteOpc/" + (viden !== null ? viden.toString() : 0),
                    contentType: "application/json; charset=utf-8",
                    success: function (result) {
                        datos.success(result);
                    }
                });
            }
        }
    });
};

let Fn_getIdRegApro = function (g) {
    var SelItem = g.dataItem(g.select());
    return SelItem === null ? 0 : SelItem.idregistrotramite;
};

let fn_refresh = () => {
    $("#gTramitesSinAprobacion").data("kendoGrid").dataSource.read().then(function () { $("#gTramitesSinAprobDocumento").data("kendoGrid").dataSource.read(); })
};