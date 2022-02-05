let notificacionMdf;
let Incio = 0;
$(document).ready(function () {

    if (!(location.pathname !== "/" && location.pathname.startsWith("/Home") === false)) {
        window.location.href = "/LoginUsuarios";
    } else {
        if (location.pathname.startsWith("/LoginUsuarios") === false && location.pathname.startsWith("/IngresarDatosComplementarios")===false) {
            if (fn_get_User() === undefined || fn_get_User() === "" || fn_get_User() === null) {
                window.location.href = "/LoginUsuarios";
            }
        }

    };
    // #region configurar las Noticaciones

        notificacionMdf = $("#kdo_NotificacionMDF").kendoNotification({
            position: {
                pinned: true,
                top: $("#HeaderPageMdf").outerHeight(),
                right: 30
            },
            stacking: "down",
            templates: [{
                type: "info",
                template: $("#emailTemplate").html()
            },{
                type: "error",
                template: $("#errorTemplate").html()
            }, {
                type: "success",
                template: $("#successTemplate").html()
            }]

        }).data("kendoNotification");

    //#endregion
    //if (Incio === 0) {
    //    window.location.href = "/LoginUsuarios";
    //    Incio = 1;
    //}

    

});

let fn_get_User = () =>{
    return window.sessionStorage.getItem("user");
};


