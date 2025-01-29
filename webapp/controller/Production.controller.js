sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "../formatter/Formatter",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",

    "sap/m/PDFViewer",

    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/core/Core",
  ],

  function (
    Controller,
    Formatter,
    Filter,
    MessageToast,
    PDFViewer,
    JSONModel,
    Core
  ) {
    "use strict";
    let fragButton1Text = "";
    let coun;
    return Controller.extend("Learning.controller.Production", {
      onInit: function (oEvent) {
        this.oModel = new JSONModel("module/village.json");
        const s1 = new JSONModel("module/village.json");
        var oView = this.getView();
        oView.setModel(this.oModel);
        this.oSF = oView.byId("searchField");

        this.oModel = new JSONModel("module/teams.json");
        var oView = this.getView();
        oView.setModel(this.oModel);

        coun = oEvent.getSource().byId("Production");
        console.log(coun);

        this.setTime();

        /*---------------- ----  for Table dailog fragment----------------------------------------- */

        if (!this._assignDialog) {
          this._assignDialog = this.loadFragment({
            name: "Learning.view.Assign",
            id: "Assign123",
          });
          const oneModel = new JSONModel("module/product.json");
          this._assignDialog.then(function (one) {
            one.setModel(oneModel);
          });
        }
        /*---------------------- for Combo BOX---------------------------------------------- */
        if (!this.addDialog) {
          this.addDialog = this.loadFragment({
            name: "Learning.view.Add",
            id: "country",
          });
          const countryModel = new JSONModel("module/country.json");
          this.addDialog.then(function (combo) {
            combo.setModel(countryModel);
          });
        }

        /*--------------   for Opening A PDf -------------------------------------------- */

        this.openPdfViewer1 = new PDFViewer();
        this.getView().addDependent(this.openPdfViewer1);
        var oPdf = new JSONModel({
          s: "https://hpread.scholastic.com/HP_Book1_Chapter_Excerpt.pdf",
        });
        this.getView().byId("final").setModel(oPdf);

        /*------------------for Date and Time Function --------------------------------*/

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
        console.log(today);

        //  oDate.setText(today);

        //  oDate.setText(today);
        //  oController = this;
      },

      formatter: Formatter,

      /*-----------------for pop up first Fragment---------------------------------- */

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

      /*------------------ Pdf Button Function------------------------------------- */

      showPdf: function (oEvent) {
        //this.byId("Pdf").setModel(oPdf);

        var sPdfSource = oEvent.getSource().getModel().getData().s;

        this.openPdfViewer1.setSource(sPdfSource);

        this.openPdfViewer1.open();
      },

      /* --------------------------opening table in a dailog------------------------- */

      openTable: function (oEvent) {
        const tModel = new JSONModel("module/product.json");

        let oView = this.getView(tModel);
        console.log(oView);

        this._assignDialog.then(function (oDialog) {
          oDialog.open();
        });
      },
      /*----------------for Combo Box opening------------------------------- */

      openCombo: function (oEvent) {
        const countryModel = new JSONModel("module/country.json");

        let oView = this.getView(countryModel);
        console.log(oView);

        this.addDialog.then(function (oDialog) {
          /* oDialog.setModel(tModel);
          console.log(tModel);
          console.log(oDialog.getModel()); */
          oDialog.open();
        });
      },
      /*-------------------SET Time Interval Function---------------------------------*/
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

      /*--------------closing dailog table------------------------ */

      handleClose: function (oEvent) {
        // reset the filter
        this._assignDialog.then(function (oDialog) {
          oDialog.close();
        });
      },

      /*------------closing Combobox dailog -----------------------------*/

      countryClose: function (oEvent) {
        let com = oEvent.getSource();
        let count = this.byId("combo");

        console.log(coun);
        const o = this.byId("country--country1").getValue();
        this.addDialog.then(function (oDialog) {
          console.log(o);

          oDialog.close();
        });
      },

      /* -------------------  for header fragment------------- */

      nSuggest1: function (event) {
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
