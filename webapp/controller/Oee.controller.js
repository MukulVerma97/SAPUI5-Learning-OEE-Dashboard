sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/json/JSONModel"
  ],
  function (Controller, MessageToast, Filter, JSONModel) {
    "use strict";

    return Controller.extend("Learning.controller.Oee", {
      onInit: function () {
        // Set village model for value help fragments
        this._oVillageModel = new JSONModel("module/village.json");
        this.getView().setModel(this._oVillageModel);

        // Set chart data model
        var oChartModel = new JSONModel("module/Data.json");
        var oVizFrame = this.getView().byId("idVizFrame");
        if (oVizFrame) {
          oVizFrame.setModel(oChartModel);
        }

        // Start clock
        this._startClock();

        // Track selected value across fragments
        this._sSelectedValue = "";
      },

      // =================== VALUE HELP DIALOGS ===================

      onFirst: function () {
        var oModel = new JSONModel("module/village.json");
        if (!this._pDialog1) {
          this._pDialog1 = this.loadFragment({
            name: "Learning.view.first",
            id: "oeeFirst"
          });
        }
        var that = this;
        this._pDialog1.then(function (oDialog) {
          oDialog.setModel(oModel);
          that._oDialog1 = oDialog;
          oDialog.open();
        });
      },

      onSecond: function () {
        var oModel = new JSONModel("module/village.json");
        if (!this._pDialog2) {
          this._pDialog2 = this.loadFragment({
            name: "Learning.view.second",
            id: "oeeSecond"
          });
        }
        var that = this;
        this._pDialog2.then(function (oDialog) {
          oDialog.setModel(oModel);
          that._oDialog2 = oDialog;
          oDialog.open();
        });
      },

      onThird: function () {
        var oModel = new JSONModel("module/village.json");
        if (!this._pDialog3) {
          this._pDialog3 = this.loadFragment({
            name: "Learning.view.third",
            id: "oeeThird"
          });
        }
        var that = this;
        this._pDialog3.then(function (oDialog) {
          oDialog.setModel(oModel);
          that._oDialog3 = oDialog;
          oDialog.open();
        });
      },

      // =================== DIALOG CLOSE ===================

      onClose1: function () {
        if (this._oDialog1) { this._oDialog1.close(); }
      },

      onClose2: function () {
        if (this._oDialog2) { this._oDialog2.close(); }
      },

      onClose3: function () {
        if (this._oDialog3) { this._oDialog3.close(); }
      },

      // =================== SEARCH HANDLERS ===================

      onSearch2: function (oEvent) {
        var oItem = oEvent.getParameter("suggestionItem");
        if (oItem) {
          MessageToast.show("Selected: " + oItem.getText());
          if (this._oDialog1) { this._oDialog1.close(); }
          this.getView().byId("oeeFirst").setText("Hokage — " + oItem.getText());
        } else {
          MessageToast.show("Search is fired!");
        }
      },

      onSearch3: function (oEvent) {
        var oItem = oEvent.getParameter("suggestionItem");
        if (oItem) {
          MessageToast.show("Selected: " + oItem.getText());
          if (this._oDialog2) { this._oDialog2.close(); }
          this.getView().byId("oeeSecond").setText("Raikage — " + oItem.getText());
        } else {
          MessageToast.show("Search is fired!");
        }
      },

      onSearch4: function (oEvent) {
        var oItem = oEvent.getParameter("suggestionItem");
        if (oItem) {
          MessageToast.show("Selected: " + oItem.getText());
          if (this._oDialog3) { this._oDialog3.close(); }
          this.getView().byId("oeeThird").setText("Kazekage — " + oItem.getText());
        } else {
          MessageToast.show("Search is fired!");
        }
      },

      // =================== SUBMIT HANDLERS ===================

      onSubmit1: function () {
        if (this._oDialog1) { this._oDialog1.close(); }
        if (this._sSelectedValue) {
          this.getView().byId("oeeFirst").setText("Hokage — " + this._sSelectedValue);
        }
      },

      onSubmit2: function () {
        if (this._oDialog2) { this._oDialog2.close(); }
        if (this._sSelectedValue) {
          this.getView().byId("oeeSecond").setText("Raikage — " + this._sSelectedValue);
        }
      },

      onSubmit3: function () {
        if (this._oDialog3) { this._oDialog3.close(); }
        if (this._sSelectedValue) {
          this.getView().byId("oeeThird").setText("Kazekage — " + this._sSelectedValue);
        }
      },

      // =================== SELECTION CHANGE (DRY) ===================

      _onSelectionChange: function (oEvent) {
        var aContexts = oEvent.getSource().getSelectedContexts();
        if (aContexts && aContexts.length > 0) {
          var oData = aContexts[0].getObject();
          this._sSelectedValue = oData.Name || "";
        }
      },

      onSelectionChange1: function (oEvent) { this._onSelectionChange(oEvent); },
      onSelectionChange2: function (oEvent) { this._onSelectionChange(oEvent); },
      onSelectionChange3: function (oEvent) { this._onSelectionChange(oEvent); },

      // =================== SUGGEST HANDLER (DRY) ===================

      _onSuggest: function (oEvent) {
        var sValue = oEvent.getParameter("suggestValue"),
          aFilters = [];
        if (sValue) {
          aFilters = [
            new Filter(
              [
                new Filter("ninjaId", function (sText) {
                  return (sText || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
                }),
                new Filter("Name", function (sDes) {
                  return (sDes || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
                })
              ],
              false
            )
          ];
        }
        oEvent.getSource().getBinding("suggestionItems").filter(aFilters);
        oEvent.getSource().suggest();
      },

      onSuggest1: function (oEvent) { this._onSuggest(oEvent); },
      onSuggest2: function (oEvent) { this._onSuggest(oEvent); },
      onSuggest3: function (oEvent) { this._onSuggest(oEvent); },

      // =================== NAVIGATION ===================

      onReport: function () {
        sap.ui.core.UIComponent.getRouterFor(this).navTo("Production");
      },

      onDowntime: function () {
        sap.ui.core.UIComponent.getRouterFor(this).navTo("Downtime");
      },

      onSpeedLoss: function () {
        sap.ui.core.UIComponent.getRouterFor(this).navTo("SpeedLoss");
      },

      onManage: function () {
        sap.ui.core.UIComponent.getRouterFor(this).navTo("Manage");
      },

      // =================== PRINTING POPOVER ===================

      onPrinting: function (oEvent) {
        if (!this._oPrintPopover) {
          this._oPrintPopover = sap.ui.xmlfragment(
            "oeePrint",
            "Learning.view.Printing",
            this
          );
          this.getView().addDependent(this._oPrintPopover);
        }
        this._oPrintPopover.openBy(oEvent.getSource());
      },

      onProduction: function () {
        if (this._oPrintPopover) { this._oPrintPopover.close(); }
        sap.ui.core.UIComponent.getRouterFor(this).navTo("Production");
      },

      onSpeed: function () {
        if (this._oPrintPopover) { this._oPrintPopover.close(); }
        sap.ui.core.UIComponent.getRouterFor(this).navTo("SpeedLoss");
      },

      // =================== CLOCK ===================

      _startClock: function () {
        var that = this;
        this._clockInterval = setInterval(function () {
          var d = new Date();
          var h = d.getHours(), m = d.getMinutes(), s = d.getSeconds();
          var period = h >= 12 ? "PM" : "AM";
          var dh = h % 12 || 12;
          var sTime = (dh < 10 ? "0" : "") + dh + ":" +
                      (m < 10 ? "0" : "") + m + ":" +
                      (s < 10 ? "0" : "") + s + " " + period;
          var oText = that.getView().byId("oeeShowTime");
          if (oText) { oText.setText(sTime); }
        }, 1000);
      },

      onExit: function () {
        if (this._clockInterval) { clearInterval(this._clockInterval); }
      }
    });
  }
);
