

let fn_valorPorDefecto=(valor, porDefecto) =>{
    if (typeof valor !== "undefined") {
        return valor;
    } else {
        return porDefecto;
    }
}

//#region componte boton

/**
 *  Crear boton kendo UI
 * @param {HTMLDivElement} div selector div 
 * @param {string} icono icono a utilizar
 * @param {string} toolTips mensaje tooltips
 */
let fn_K_Button = (div,icono,toolTips) => {

    div.kendoButton({ icon: icono });

    if (fn_valorPorDefecto(toolTips, "undefined") !== "undefined") {
        div.kendoTooltip({
            content: function (e) {
                return toolTips;
            }

        });
    }
};

/**
 * activa modo lectura campo Button
 * @param {HTMLDivElement} BotonElem elemento div que contiene la funcion del Button
 * @param {boolean} enable true o false
 */

var fn_K_ButtonEnable = (BotonElem, enable) => {
    var Button = BotonElem.data("kendoButton");
    Button.enable(enable);
};

//#endregion

//#region componete textbox

/**
 * Crea campo de texto kendo UI
 * @param {HTMLDivElement} div selector Div
 * @param {string} marcadorPosicion marcador de posicion dentro del textbox
 */
let fn_K_TextBox = (div,marcadorPosicion) => {
    div.kendoTextBox({
        placeholder: fn_valorPorDefecto(marcadorPosicion, "")
    });
}

/**
 * Habilita o Inhabilita campo Text Box
 * @param {HTMLDivElement} InputElem elemento div que contiene la funcion Text Box
 * @param {boolean} enable true o false
 */

var fn_K_TextBoxEnable = (InputElem, enable) => {
    InputElem.prop("disabled", !enable);
};

//#endregion

//#region componete combobox
/**
 * crea Objeto combo box
 * @param {HTMLDivElement} div selector Div
 * @param {string} webApi URL de la web api
 * @param {string} textField campo texto
 * @param {string} valueField campo valor
 * @param {string} marcadorPosicion
 * @param {number} alto
 * @param {string   } Cascada
 * @param {boolean} botonBorrar
 */
let fn_K_ComboBox = (div, webApi, textField, valueField, marcadorPosicion, alto, Cascada, botonBorrar) => {
    div.kendoComboBox({
        dataTextField: textField,
        dataValueField: valueField,
        autoWidth: true,
        filter: "contains",
        autoBind: false,
        clearButton: fn_valorPorDefecto(botonBorrar, true),
        placeholder: fn_valorPorDefecto(marcadorPosicion, "Seleccione un valor ...."),
        height: fn_valorPorDefecto(alto === "" || alto === 0 ? undefined : alto, 550),
        cascadeFrom: fn_valorPorDefecto(Cascada, ""),
        dataSource: {
            sort: { field: textField, dir: "asc" },
            transport: {
                read: {
                    url: webApi
                }
            }
        }
    });
};
/**
 * setear o color valor al combo box
 * @param {HTMLDivElement} InputElem
 * @param {any} value
 */
let fn_K_ComboBoxSetValue = (InputElem, value) => {
    let cmb = InputElem.data("kendoComboBox");
    cmb.value(value);

};
/**
 * obtener el valor de un combobox
 * @param {HTMLDivElement} InputElem
 */
let fn_K_ComboBoxGetValue =  (InputElem)=> {
    var cmb = InputElem.data("kendoComboBox");
    return cmb.value() === "" ? null : cmb.selectedIndex >= 0 ? cmb.value() : null;

};
/**
 * Devuelve el indice seleccionado
 * @param {HTMLDivElement} element selector Div
 */
let fn_K_ComboBoxGetselectedIndex = (element) => {
    return element.data("kendoComboBox").selectedIndex;
}
/**
 * colcoar el foco en el combo box
 * @param {HTMLDivElement} element
 */
let fn_k_ComboBoxFocus = (element) => {
    let cmb = element.data("kendoComboBox");
    cmb.focus();
}

let fn_ComboboxData = (e, datos, textField, valueField, opcPlaceHolder, opcHeight, parentCascade, clearButton) =>{
    e.kendoComboBox({
        dataTextField: textField,
        dataValueField: valueField,
        autoWidth: true,
        filter: "contains",
        autoBind: false,
        clearButton: fn_valorPorDefecto(clearButton, true),
        placeholder: fn_valorPorDefecto(opcPlaceHolder, "Seleccione un valor ...."),
        height: fn_valorPorDefecto(opcHeight === "" || opcHeight === 0 ? undefined : opcHeight, 550),
        cascadeFrom: fn_valorPorDefecto(parentCascade, ""),
        dataSource: function () { return datos; }
    });
};
/**
 * habiliar combo
 * @param {any} div
 * @param {any} value
 */
let fn_k_ComboBoxEnable = (div, value) => {
    div.data("kendoComboBox").enable(value);
};
//#endregion

//#region componete Fecha 
/**
 * crea apartir de un div un objeto de tipo datepicker
 * @param {HTMLDivElement} div selector div
 * @param {string} xformat formato de fecha
 */
let fn_K_Date = (div, xFormat) => {
    div.kendoDatePicker({ format: xFormat});
};



//#endregion 

//#region MaskedTextBox

/**
 * Crea campo maskara
 * @param {HTMLDivElement} InputElem elemento div que tendra la funcion de input mask
 * @param {string} mascara mascara por ejemplo "(000) 000-0000"
 * @param {string} promptChar por ejemplo "_", " " sin prompt
 */
let fn_K_TextMasked = (InputElem, mascara, promptChar) => {
    InputElem.kendoMaskedTextBox({
        mask: mascara,
        culture: "es-SV",
        promptChar: promptChar
        
    });
}
/**
 * setear o colcar valor  kendoMaskedTextBox
 * @param {HTMLDivElement} InputElem
 * @param {string} valor
 */
let fn_K_TextMaskSetValue = (InputElem, valor) => {
    var mk = InputElem.data("kendoMaskedTextBox");
    mk.value(valor);
}
/**
 * obtener el valor de la text Mask
 * @param {HTMLDivElement} InputElem
 */
let fn_K_TextMaskGetValue = (InputElem) => {
    var mk = InputElem.data("kendoMaskedTextBox");
    return mk.value();
}
/**
 *  Habilita o Inhabilita campo Masktext
 * @param {HTMLDivElement} InputElem
 * @param {string} enable
 */
let fn_K_TextMaskEnable = (InputElem, enable) => {
    var mk = InputElem.data("kendoMaskedTextBox");
    mk.enable(enable);
}
/**
 * obteer el valor sin mascara
 * @param {any} InputElem
 */
let fn_k_TextMaskGetValueRaw = (InputElem) => {
    var mk = InputElem.data("kendoMaskedTextBox");
    return mk.raw();
}

//#endregion

//#region  Funciones genericas

/**devuelve las fecho de hoy */
let fn_hoy = () => {
    return kendo.toString(kendo.parseDate(new Date()), 's');
};

/**
 * Asiganar el valor al campo fecha
 * @param {HTMLDivElement} div
 * @param {any} valor
 */
let fn_k_DateSetValue = (div,valor) => {

    div.data("kendoDatePicker").value(valor);
};
/**
 * HABILITAR CAMPO FECHA
 * @param {any} div 
 * @param {any} valor
 */
let fn_k_DateEnable = (div, valor) => {
    div.data("kendoDatePicker").enable(valor);
}
//#endregion

//#region Notificaciones
let msg_Success = (xmessage) => {
    $("#kdo_NotificacionMDF").data("kendoNotification").show({
        message: xmessage
    }, "success");
};

let msg_Error = (xtitle, xmessage) => {
    $("#kdo_NotificacionMDF").data("kendoNotification").show({
        title: xtitle,
        message: xmessage
    }, "error");

};

let msg_Info = (xtitle, xmessage) => {
    $("#kdo_NotificacionMDF").data("kendoNotification").show({
        title: xtitle,
        message: xmessage
    }, "info");

};
//#endregion


//#region GRid

const ModoEdicion = {
    EnLinea: "inline",
    EnPopup: "popup",
    Batch: "batch",
    NoEditable: false
};
// opciones redimencional.
const redimensionable = {
    Si: true,
    No: false
};

var windowMensaje;
// configuracion de propiedades standares del grid.
/**
 * Activa o Desactiva propiedades del grid.
 * @param {kendo.ui.Grid} e Grid contenedor de la funcion
 * @param {const} ModoEdicion opciones ModoEdicion.EnLinea, ModoEdicion.EnPopup o ModoEdicion.NoEditable
 * @param {boolean} Paginable Muesta u Oculta barra de paginación.
 * @param {boolean} Filtrable Activa filtro para cada una de las columnas del grid.
 * @param {boolean} Ordenable Activa en el grid la ordenación Asc o Desc.
 * @param {boolean} ColMenu Activa el menu emergente para las columnas del grid, que contiene las opciones: 1. Columnas: para mostrar o ocultar , 2. Orden Ascendente y  3. Orden Descendente
 * @param {boolean} redimensionable colocar true para que los usuarios puedan cambiar el tamaño de la columna
 * @param {number} Opcheight valor opcional puede colocar alto del grid.
 * @param {string} selectable Si se establece en trueel usuario sería capaz de seleccionar filas de la cuadrícula. Por defecto la selección está deshabilitada.
                        También se puede establecer en los siguientes valores de cadena:
                            "fila": el usuario puede seleccionar una sola fila.
                             "celda": el usuario puede seleccionar una sola celda.
                                "multiple, row": el usuario puede seleccionar varias filas.
                                "múltiple, celda": el usuario puede seleccionar varias celdas.
 * @param {string} FiltroModo modo de filtros puede ser :"row", "menu", "menu,row" las tres son validas siempre y cuando este activo el filtro.


 */
let fn_K_GridConfigurar = (e, ModoEdicion, Paginable, Filtrable, Ordenable, ColMenu, redimensionable, Opcheight, selectable, FiltroModo) => {

    ModoEdicion: fn_valorPorDefecto(ModoEdicion, "popup");
    OpcGrid = {
        sortable: fn_valorPorDefecto(Ordenable, true),
        filterable: fn_valorPorDefecto(Filtrable, true) === true ? fn_valorPorDefecto(FiltroModo, "") === "" ? true : { mode: FiltroModo } : false,
        columnMenu: fn_valorPorDefecto(ColMenu, true),
        editable: ModoEdicion !== "popup" ? ModoEdicion === "batch" ? true : ModoEdicion : {
            mode: ModoEdicion,
            update: true,
            createAt: "bottom",
            window: {
                title: "Editar"
            }
        },
        scrollable: true,
        navigatable: true,
        resizable: fn_valorPorDefecto(redimensionable, true),
        selectable: fn_valorPorDefecto(selectable, true),
        pageable: !fn_valorPorDefecto(Paginable, true) ? false : {
            input: true,
            refresh: true,
            pageSizes: [20, 50, 100, "all"]
        },
        height: Opcheight === 0 ? "100 %" : fn_valorPorDefecto(Opcheight, 600)

    };

    e.setOptions($.extend({}, e.getOptions(), OpcGrid));
};


/**
 * Activa CRUD en la toolbar de grid
 * @param {kendo.ui.Grid} e  Grid contenedor de la funcion
 * @param {boolean} agregar Muestra boton Agregar.
 */
let fn_K_GridConfigurar_Add = (e, agregar) => {
    var opciones = [];
    if (agregar) opciones.push({ name: "create", text: "", iconClass: "k-icon k-i-plus" });


    if (agregar === false) {
        Opctoolbar = { toolbar: false };
    }
    else {
        Opctoolbar = { toolbar: opciones };
    }

    e.setOptions($.extend({}, e.getOptions(), Opctoolbar));
    //shortcut para crear nuevas lineas 
    if (agregar) {
        $("#" + e.element.attr('id') + "").keydown(function (ev) {
            if (ev.altKey && ev.keyCode === 78) {
                e.addRow();
            }
        });
    }
};

// habilitar CRUD en la columna grid.
/**
 * Activa CRUD en la columna grid, 
 * @param {kendo.ui.Grid} e  Grid contenedor de la funcion
 * @param {boolean} editar Muestra boton Editar.
 * @param {boolean} borrar Muestra boton Eliminar.
 * @param {string} Id_GridDetalle colocar id cuando sea un grid detalle para el funcionamiento del boton elminar.
 */
let fn_K_GridConfigurar_Upd_Del = (e, editar, borrar, Id_GridDetalle) => {

    if (fn_valorPorDefecto(Id_GridDetalle, "") !== "" && e.element.parent().attr("class") === "k-detail-cell") {
        e.element.attr('id', Id_GridDetalle + Date.now().toString());
    }

    $("#" + Id_GridDetalle + "").children().remove();

    var EliminarTemplate = kendo.template("<span id='" + Id_GridDetalle + "'><div class='float-left'><span class='k-icon k-i-question' style='font-size: 55px; margin: 10px'></span></div><p style='height: 100px;'>¿Está seguro que desea eliminar el registro?</p><div class='float-right'><button class='k-button k-primary' id='yesButton_" + e.element.attr('id') + "' style='width: 75px;'>Si</button> <button class='k-button' id='noButton_" + e.element.attr('id') + "' style='width: 75px;'>No</button></div></span>");
    var windowEliminar = $("<div />").kendoWindow({
        title: "Confirmación",
        visible: false,
        width: "400px",
        height: "30%",
        modal: true
    }).data("kendoWindow");

    var EliminarClick = function (ep) {
        ep.preventDefault();
        var tr = $(ep.target).closest("tr");
        var data = this.dataItem(tr);
        windowEliminar.content(EliminarTemplate(data));
        windowEliminar.center().open();

        $("#yesButton_" + e.element.attr('id') + "").click(function () {
            e.dataSource.remove(data);
            e.dataSource.sync();
            windowEliminar.close();
        });
        $("#noButton_" + e.element.attr('id') + "").click(function () {
            windowEliminar.close();
        });
    };

    var opciones = [];
    var columns = e.columns;
    var w = 0;

    if (editar) opciones.push({ name: "edit", text: "", iconClass: "k-icon k-i-edit" });

    if (fn_valorPorDefecto(Id_GridDetalle, "") !== "" && e.element.parent().attr("class") === "k-detail-cell") {
        // cuando es un grid detalle
        if (borrar) opciones.push({ name: "EliminarDet", click: EliminarClick, iconClass: "k-icon k-i-delete", text: "" });
    }
    else {
        // grdi maestro.
        if (borrar) opciones.push({ name: "Eliminar", click: EliminarClick, iconClass: "k-icon k-i-delete", text: "" });
    }

    // habilitar o deshabilitar el modo edicion cuando el usuario presiona <enter> en la fila
    e.options.editable.update = editar;

    //if (editar) w = w + 120;
    //if (borrar) w = w + 120;

    if (editar === true || borrar === true) {
        var Opccommand = "";
        if (editar) {
            Opccommand = {
                columns: columns.concat([{
                    field: "cmdEdit", title: "&nbsp;", menu: false, filterable: { cell: { enabled: false } },
                    command: opciones[0], width: (e.options.editable === "inline" ? 120 : 70) + "px", attributes: {
                        style: "text-align: center"
                    }
                }])
            };
        }
        e.setOptions($.extend({}, e.getOptions(), Opccommand));

        if (borrar) {
            Opccommand = {
                columns: Opccommand === "" ? columns.concat([{
                    field: "cmdDel", title: "&nbsp;", menu: false, filterable: { cell: { enabled: false } },
                    command: opciones[0], width: 70 + "px", attributes: {

                        style: "text-align: center"
                    }
                }]) : Opccommand.columns.concat([{
                    field: "cmdDel", title: "&nbsp;", menu: false, filterable: { cell: { enabled: false } },
                    command: opciones[1], width: 70 + "px", attributes: {

                        style: "text-align: center"
                    }
                }])
            };
        }
        e.setOptions($.extend({}, e.getOptions(), Opccommand));

    }

};
/**
 * Asignar la fuente de datos, a través de la opción dataSource
 * @param {kendo.ui.Grid} e  Grid contenedor de la funcion
 * @param {dataSource} ds configuracíon datasource
 * @param {number} TamañoPagina Paremtro Opcional, Numero de registros de datos que se mostrarán en la cuadrícula 
 */
let fn_K_GridConfigurar_DataSource = (e, ds, TamañoPagina) => {

    DSource = {
        dataSource: ds,
        noRecords: {
            template: e.getOptions().pageable !== false ? "No hay datos disponibles. La pagina actual es: #=this.dataSource.page()#" : "No hay datos disponibles."
        }
    };
    e.setOptions($.extend({}, e.getOptions(), DSource));

    if (e.getOptions().pageable !== false) {
        e.dataSource.pageSize(fn_valorPorDefecto(TamañoPagina, 50));
    }
    // aplicar tooltips a botones de edicion y eliminacion del grid

    $("#" + e.element.attr('id') + "").kendoTooltip({
        filter: ".k-grid-edit",
        content: function (e) {
            return "Editar";
        }
    });

    $("#" + e.element.attr('id') + "").kendoTooltip({
        filter: ".k-grid-Eliminar",
        content: function (e) {
            return "Eliminar";
        }
    });

    $("#" + e.element.attr('id') + "").kendoTooltip({
        filter: ".k-grid-add",
        content: function (e) {
            return "Agregar";
        }
    });
};

/**
 * ocultar campo en ventana modal de edicion popup
 * @param {container} container recibe  e.container
 * @param {string} campo nombre del campo a ocultar
 */
let fn_K_OcultarCampoGridPopup = (container, campo) => {
    container.find("label[for=" + campo + "]").parent("div .k-edit-label").hide();
    container.find("label[for=" + campo + "]").parent().next("div .k-edit-field").hide();
};


let fn_k_gridSelectRow = (e, selectedRows) => {
    e = e.data("kendoGrid");
    var items = e.items();
    items.each(function (idx, row) {
        var idValue = e.dataItem(row).get(e.dataSource.options.schema.model.id);
        if (row.className.indexOf("k-state-selected") >= 0) {
            selectedRows[idValue] = true;
        } else if (selectedRows[idValue]) {
            delete selectedRows[idValue];
        }
    });
};

let fn_K_gridSetSelectRow = (e, selectedRows) => {
    var grid = e.data("kendoGrid");
    var items = grid.items();
    var itemsToSelect = [];
    items.each(function (idx, row) {
        var dataItem = grid.dataItem(row);
        if (selectedRows[dataItem[grid.dataSource.options.schema.model.id]]) {
            itemsToSelect.push(row);
        }
    });

    if (itemsToSelect.length === 0) {
        grid.select("tr:eq(0)");
        $("tr:eq(1) td:eq(0)", e).closest('table').focus();
    }
    else
        grid.select(itemsToSelect);
}

function fn_k_grid_RetornarRow(e, uid) {
    var el = e;
    grid = el.data("kendoGrid");
    row = el.find("tbody>tr[data-uid='" + uid + "']");
    return row;

}
//#endregion


//#region Metodos
let  fn_getPersona = function (xusuario) {
    var datos;
    $.ajax({
        url: Web_ApiMdn + "Personas/ObtenerPersona/" + `${xusuario}`,
        dataType: 'json',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (respuesta) {
            datos = respuesta;
        },
        error: function (respuesta) {
            datos = null;
        }
    });

    return datos;
};



//#endregion 

//#region Rellenar valor
/**
 * rellenar de ceros
 * @param {any} str valor string
 * @param {any} max catidad de ceros
 */
let pad = (str, max) => {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
};

//

//#region prueba
let srcNo = "/css/Images/No_Disponible.png";
let fn_img_Error = (image) => {
    image.onerror = "";
    image.src = srcNo;
};


//#endregion