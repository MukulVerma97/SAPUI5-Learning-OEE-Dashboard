sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  function (Controller, JSONModel) {
    "use strict";
    let oController;
    return Controller.extend("Learning.controller.Manage", {
      onPressNavButton: function () {
        let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("App");
      },

      onInit: function () {
        var empData = new JSONModel();
        this.getView().setModel(empData, "empData");

        var sEmpAddURL =
          "/XMII/Illuminator?QueryTemplate=Nerds/Uchiha_Clan/Mukul/get Character detaiils&Content-Type=text/json";

        empData.loadData(sEmpAddURL);
      },
      onSelect: function () {
        let uchiha = "",
          uzumaki = "",
          hatake = "";
        if (this.getView().byId("aa").getSelected() == true) {
          uchiha = "uchiha";
        }
        if (this.getView().byId("bb").getSelected() == true) {
          uzumaki = "uzumaki";
        }
        if (this.getView().byId("cc").getSelected() == true) {
          hatake = "hatake";
        }
        if (uchiha !== "" || uzumaki !== "" || hatake !== "")
          this.getView().byId("table").setModel(null);

        console.log(uchiha, uzumaki, hatake);
        console.log(
          this.getView().byId("cc").getSelected(),
          this.getView().byId("dd").getSelected()
        );

        if (this.getView().byId("dd").getSelected() == true) {
          const sUrl =
            "/XMII/Illuminator?QueryTemplate=Nerds/Uchiha_Clan/Mukul/get Character detaiils&Content-Type=text/json";
          let m = new JSONModel();
          m.loadData(sUrl);
          this.getView().byId("table").setModel(m, "empData");
        } else {
          let mandeep = new JSONModel();
          const sUrl =
            "/XMII/Illuminator?QueryTemplate=Nerds/Uchiha_Clan/Mandeep/getDetailsByHousename&Content-Type=text/json";
          var oParams = {};

          oParams["Param.1"] = uchiha;
          oParams["Param.2"] = uzumaki;
          oParams["Param.3"] = hatake;
          mandeep.loadData(sUrl, oParams);
          console.log(mandeep);
          this.getView().byId("table").setModel(mandeep, "empData");
        }
      },
      onPressRefresh: function () {
        location.reload();
      },
    });
  }
);
