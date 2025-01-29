sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  function (Controller, JSONModel) {
    "use strict";
    return Controller.extend("Learning.controller.SpeedLoss", {
      onInit: function () {
        var oModel = new JSONModel("module/tom.json");
        this.getView().setModel(oModel);
      },

      onPressNavButton: function () {
        let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("Production");
      },
    });
  }
);
