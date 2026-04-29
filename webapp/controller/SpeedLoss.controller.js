sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
  ],
  function (Controller, JSONModel) {
    "use strict";
    return Controller.extend("Learning.controller.SpeedLoss", {
      onInit: function () {
        var oModel = new JSONModel("module/tom.json");
        this.getView().setModel(oModel);
      },

      onPressNavButton: function () {
        sap.ui.core.UIComponent.getRouterFor(this).navTo("Oee");
      }
    });
  }
);
