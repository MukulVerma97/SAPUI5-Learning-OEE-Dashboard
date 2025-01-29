sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",

    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/core/Core",
  ],
  function (Controller, MessageToast, Filter, JSONModel, Fragment) {
    "use strict";
    let fragButton1Text = "";

    return Controller.extend("Learning.controller.Oee", {
      onInit: function () {
        // FOR TIMER

        this.setTime();

        //-------------------------FOR header AND BUTTON FRAGMENT ------------------------------------
        this.oModel = new JSONModel("module/village.json");
        const s1 = new JSONModel("module/village.json");
        var oView = this.getView();
        oView.setModel(this.oModel);
        this.oSF = oView.byId("searchField");

        /*--------------------- for vix Frame---------------------------------- */

        var jsonData = new sap.ui.model.json.JSONModel("module/Data.json");
        var oVizFrame = this.getView().byId("idVizFrame");
        oVizFrame.setModel(jsonData);
        //---------------------FOR DISPLAYING DATE -----------------------------------------------
        var today = new Date();

        var dd = today.getDate();

        var mm = today.getMonth() + 1;

        var yyyy = today.getFullYear();

        if (dd < 10) {
          dd = "0" + dd;
        }
        if (mm < 10) {
          mm = "0" + mm;
        }
        today = yyyy + "-" + mm + "-" + dd;

        var oDate = this.getView().byId("date");
        // console.log(today);

        // oDate.setText(today);

        //  oDate.setText(today);
        //  oController = this;
      },

      onNavigateToHome: function () {
        let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("Home");
      },

      onPrinting: function (oEvent) {
        if (this.popupVersionDetails == undefined) {
          this.popupVersionDetails = sap.ui.xmlfragment(
            "popoverVersionDetails",
            "Learning.view.Printing",
            this
          );

          this.getView().addDependent(this.popupVersionDetails);
        }

        this.popupVersionDetails.openBy(oEvent.getSource());
      },

      onFirst: function () {
        const x1 = {
          a: [
            { b: "a1" },
            { b: "a2" },
            { b: "a2" },
            { b: "a3" },
            { b: "a4" },
            { b: "a5" },
          ],
        };
        const x2 = new JSONModel(x1);
        // this.getView().byId('searchField1').setModel(x2);

        const oModel = new JSONModel("module/village.json");
        if (!this.pDialog) {
          this.pDialog = this.loadFragment({
            name: "Learning.view.first",
            id: "first",
          });
        }
        this.pDialog.then(function (oDialog) {
          oDialog.setModel(oModel);
          console.log(oDialog.getModel());
          oDialog.open();
        });
      },

      onSecond: function () {
        if (!this.qDialog) {
          this.qDialog = this.loadFragment({
            name: "Learning.view.second",
          });
        }
        this.qDialog.then(function (oDialog) {
          oDialog.open();
        });
      },

      onThird: function () {
        if (!this.rDialog) {
          this.rDialog = this.loadFragment({
            name: "Learning.view.third",
          });
        }
        this.rDialog.then(function (oDialog) {
          oDialog.open();
        });
      },

      onClose1: function () {
        this.byId("onFirst").close();
      },

      onClose2: function () {
        this.byId("onSecond").close();
      },

      onClose3: function () {
        this.byId("onThird").close();
      },

      onSearch2: function (event) {
        var oItem = event.getParameter("suggestionItem");
        if (oItem) {
          MessageToast.show("Search for: " + oItem.getText());
          this.byId("first--onFirst").close();
          this.getView()
            .byId("first")
            .setText("Hokage--" + oItem.getText());
        } else {
          MessageToast.show("Search is fired!");
        }
        // console.log(event.getSource().getModel());
      },

      onSearch3: function (event) {
        var oItem = event.getParameter("suggestionItem");
        if (oItem) {
          MessageToast.show("Search for: " + oItem.getText());
          this.byId("onSecond").close();
          this.getView()
            .byId("second")
            .setText("Raikage--" + oItem.getText());
        } else {
          MessageToast.show("Search is fired!");
        }
        // console.log(event.getSource().getModel());
      },

      onSearch4: function (event) {
        var oItem = event.getParameter("suggestionItem");
        if (oItem) {
          MessageToast.show("Search for: " + oItem.getText());
          this.byId("onThird").close();
          this.getView()
            .byId("third")
            .setText("Kazekage--" + oItem.getText());
        } else {
          MessageToast.show("Search is fired!");
        }
        // console.log(event.getSource().getModel());
      },

      setTime: function () {
        setInterval(() => {
          let date = new Date();

          const time =
            (date.getHours() < 12
              ? date.getHours()
              : "0" + date.getHours() - 12) +
            ":" +
            (date.getMinutes() >= 10
              ? date.getMinutes()
              : "0" + date.getMinutes()) +
            ":" +
            (date.getSeconds() >= 10
              ? date.getSeconds()
              : "0" + date.getSeconds()) +
            (date.getHours() > 12 ? " PM" : " AM");

          this.getView().byId("showTime").setText(time);
        }, 1000);
      },
      onForm: function (e) {
        let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("Form");
        this.byId("myPopover").focus();
        this.byId("popover").close();
      },
      onShop: function () {
        let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("Shop");
        this.byId("myPopover").focus();
        this.byId("popover").close();
      },

      onUserDeatil: function (e) {
        let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("Table");
        this.byId("myPopover").focus();
        this.byId("popover").close();
      },
      onReport: function (e) {
        let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("Production");
      },

      onDowntime: function () {
        let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("Downtime");
      },
      onManage: function () {
        let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("Manage");
      },

      onSuggest1: function (event) {
        var sValue = event.getParameter("suggestValue"),
          aFilters = [];
        if (sValue) {
          aFilters = [
            new Filter(
              [
                new Filter("ninjaId", function (sText) {
                  return (
                    (sText || "").toUpperCase().indexOf(sValue.toUpperCase()) >
                    -1
                  );
                }),
                new Filter("Name", function (sDes) {
                  return (
                    (sDes || "").toUpperCase().indexOf(sValue.toUpperCase()) >
                    -1
                  );
                }),
              ],
              false
            ),
          ];
        }

        event.getSource().getBinding("suggestionItems").filter(aFilters);
        event.getSource().suggest();
      },

      onSuggest2: function (event) {
        var sValue = event.getParameter("suggestValue"),
          aFilters = [];
        if (sValue) {
          aFilters = [
            new Filter(
              [
                new Filter("ninjaId", function (sText) {
                  return (
                    (sText || "").toUpperCase().indexOf(sValue.toUpperCase()) >
                    -1
                  );
                }),
                new Filter("Name", function (sDes) {
                  return (
                    (sDes || "").toUpperCase().indexOf(sValue.toUpperCase()) >
                    -1
                  );
                }),
              ],
              false
            ),
          ];
        }

        event.getSource().getBinding("suggestionItems").filter(aFilters);
        event.getSource().suggest();
      },

      onSuggest3: function (event) {
        var sValue = event.getParameter("suggestValue"),
          aFilters = [];
        if (sValue) {
          aFilters = [
            new Filter(
              [
                new Filter("ninjaId", function (sText) {
                  return (
                    (sText || "").toUpperCase().indexOf(sValue.toUpperCase()) >
                    -1
                  );
                }),
                new Filter("Name", function (sDes) {
                  return (
                    (sDes || "").toUpperCase().indexOf(sValue.toUpperCase()) >
                    -1
                  );
                }),
              ],
              false
            ),
          ];
        }

        event.getSource().getBinding("suggestionItems").filter(aFilters);
        event.getSource().suggest();
      },
      onSpeedLoss: function () {
        let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("SpeedLoss");
      },
      onSubmit1: function (event) {
        this.getView().setModel(this.oModel);

        this.byId("first--onFirst").close();
        if (fragButton1Text !== "") {
          this.getView()
            .byId("first")
            .setText("Hokage --" + fragButton1Text);
        }
      },
      onSubmit2: function (event) {
        this.getView().setModel(this.oModel);

        this.byId("onSecond").close();
        if (fragButton1Text !== "") {
          this.getView()
            .byId("second")
            .setText("Raikage --" + fragButton1Text);
        }
      },
      onSubmit3: function (event) {
        this.getView().setModel(this.oModel);

        this.byId("onThird").close();
        if (fragButton1Text !== "") {
          this.getView()
            .byId("third")
            .setText("Kazekage--" + fragButton1Text);
        }
      },
      onSelectionChange1: function (e) {
        console.log(e.getSource().getSelectedContexts()[0].sPath.split("/")[2]);
        let m = e.getSource().getModel().oData.ninja;
        m[parseInt(e.getSource().getSelectedContexts()[0].sPath.split("/")[2])]
          .Name;
        fragButton1Text =
          m[
            parseInt(e.getSource().getSelectedContexts()[0].sPath.split("/")[2])
          ].Name;
      },
      onSelectionChange2: function (e) {
        console.log(e.getSource().getSelectedContexts()[0].sPath.split("/")[2]);
        let m = e.getSource().getModel().oData.ninja;
        m[parseInt(e.getSource().getSelectedContexts()[0].sPath.split("/")[2])]
          .Name;
        fragButton1Text =
          m[
            parseInt(e.getSource().getSelectedContexts()[0].sPath.split("/")[2])
          ].Name;
      },
      onSelectionChange3: function (e) {
        console.log(e.getSource().getSelectedContexts()[0].sPath.split("/")[2]);
        let m = e.getSource().getModel().oData.ninja;
        m[parseInt(e.getSource().getSelectedContexts()[0].sPath.split("/")[2])]
          .Name;
        fragButton1Text =
          m[
            parseInt(e.getSource().getSelectedContexts()[0].sPath.split("/")[2])
          ].Name;
      },
    });
  }
);
