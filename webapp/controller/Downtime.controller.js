sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  function (Controller, JSONModel) {
    "use strict";
    return Controller.extend("Learning.controller.Downtime", {
      onInit: async function (e) {
        var oModel = await (await fetch("module/downtime.json")).json();

        const y = oModel.minor;
        var oModel1 = new JSONModel(y);

        this.getView().byId("om").setModel(oModel1);
      },

      onPressNavButton: function () {
        let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("App");
      },
      onSelect: async function (e) {
        let x1 = new JSONModel("module/downtime.json");
        this.getView().setModel(x1);
        let sKey = e.getParameter("key");
        // console.log(sKey);
        sKey = sKey.trim();

        let m = await (await fetch("module/downtime.json")).json();
        // console.log(m);

        //  console.log(m[sKey]);
        let r = m[sKey];

        let x = new JSONModel(r);
        this.getView().byId("om").setModel(x);
        //  console.log(this.getView().byId('om').getModel());
      },
      onReport: function () {
        const oModel = new JSONModel("module/downtime.json");
        if (!this.pDialog) {
          this.pDialog = this.loadFragment({
            name: "Learning.view.report",
          });
        }
        {
          var oModel1 = new JSONModel("module/downtime.json");

          const y = this.getView().byId("re").setModel(oModel1);
          var oModel1 = new JSONModel(y);
          this.getView().byId("om").getModel(oModel1);
        }
        this.pDialog.then(function (oDialog) {
          oDialog.setModel(oModel);
          oDialog.open();
        });
      },
      onClose: function () {
        this.byId("onDialog").close();
      },
    });
  }
);
