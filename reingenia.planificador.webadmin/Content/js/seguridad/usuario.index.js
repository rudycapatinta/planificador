﻿if (typeof (jsUsuario) == "undefined")
{
    jsUsuario = {};
}

jsUsuario.variables =
{
    inputtextpaginate: ["pagina", "tipoorden", "columnaorden"]
}

jsUsuario.Funcion =
{
    onLoadIndex: function ()
    {
        jsCustom.item.jsObject = this;
        
        this.setTableIndex(0, "", "");
        
        $("#formUsuarioBusqueda").ajaxForm(jsCustom.Funcion.getOptionsAjaxForm(this, "formUsuarioBusqueda"));

        this.setSearchAdvanced();
    },

    setTableIndex: function(nropaginas, tipoorden, columnaorden)
    {
        var columns = [{ "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": true }, { "bSortable": false } ];
        var isOrderJS = false;

        jsCustom.Funcion.setDataTable("tableUsuarioIndex", columns, isOrderJS);
        jsCustom.Funcion.setOrderTable("tableUsuarioIndex", isOrderJS, tipoorden, columnaorden);
    },

    setFormSubmit: function(form)
    {
    	if (form == "formUsuarioBusqueda")
            jsCustom.Funcion.clearInputText(form, jsUsuario.variables.inputtextpaginate, "1");

        return true;
    },

    successForm: function(formId, data)
    {
        var error = jsCustom.Funcion.getValidateDefault(data.isError, "");

        if (error == "S")
        {
            jsCustom.Funcion.showMessage(jsCustom.Funcion.getValidateDefault(data.message, ""));

            return;
        }

        if (formId == "formUsuarioBusqueda")
        {
            var html = jsCustom.Funcion.getValidateDefault(data.custom01, "");
            var nroPaginas = jsCustom.Funcion.getValidateDefault(data.custom02, "");
            var tipoOrden = jsCustom.Funcion.getValidateDefault(data.custom03, "");
            var columnaOrden = jsCustom.Funcion.getValidateDefault(data.custom04, "");

            if (html != "")
                $("#divUsuarioListaBusqueda").html(html);

            jsCustom.Funcion.setValueHiddenforInputForm(formId);

            $("#" + formId + "_TipoOrden").val(tipoOrden);
            $("#" + formId + "_ColumnaOrden").val(columnaOrden);
            
            this.setTableIndex(nroPaginas, tipoOrden, columnaOrden);
            
            if (formId == "formUsuarioBusqueda")
                $("#modalUsuarioSearch").modal("hide");
        }
    },

    setDeleteItem: function(custom)
    {
        if (custom == "disabled" || custom == "delete")
            this.setSearchAdvanced();
    },

    setSearchAdvanced: function()
    {
        var form = "formUsuarioBusqueda";
        var inputtext = ["TipoOrden", "ColumnaOrden"];

        jsCustom.Funcion.clearInputText(form, inputtext, "");
        jsCustom.Funcion.clearInputText(form, jsUsuario.variables.inputtextpaginate, "1");

        $("#" + form).submit();
    }
    
};
