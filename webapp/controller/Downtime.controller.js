sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
  ],
  function (Controller, JSONModel, MessageToast) {
    "use strict";
    return Controller.extend("Learning.controller.Downtime", {

      onInit: function () {
        // Load all downtime data upfront and cache it
        this._oDowntimeData = null;
        var that = this;

        var oModel = new JSONModel();
        oModel.loadData("module/downtime.json", null, true);
        oModel.attachRequestCompleted(function () {
          that._oDowntimeData = oModel.getData();
          // Set initial tab data (minor)
          that._setTabData("minor");
        });
        oModel.attachRequestFailed(function () {
          MessageToast.show("Error loading downtime data");
        });
      },

      _setTabData: function (sKey) {
        if (!this._oDowntimeData) { return; }

        var oTabData = this._oDowntimeData[sKey];
        if (oTabData) {
          var oTabModel = new JSONModel(oTabData);
          this.getView().byId("om").setModel(oTabModel);
        } else {
          // No data for this key, set empty model
          this.getView().byId("om").setModel(new JSONModel({ okay: [] }));
          MessageToast.show("No data available for: " + sKey);
        }
      },

      onPressNavButton: function () {
        sap.ui.core.UIComponent.getRouterFor(this).navTo("Oee");
      },

      onSelect: function (oEvent) {
        var sKey = oEvent.getParameter("key");
        if (!sKey) { return; }
        sKey = sKey.trim();
        this._setTabData(sKey);
      },

      onReport: function () {
        var that = this;

        if (!this._pReportDialog) {
          this._pReportDialog = this.loadFragment({
            name: "Learning.view.report",
            id: "dtReport"
          });
        }

        this._pReportDialog.then(function (oDialog) {
          // Set the cached downtime data as the dialog model
          if (that._oDowntimeData) {
            var oDialogModel = new JSONModel(that._oDowntimeData);
            oDialog.setModel(oDialogModel);
          } else {
            // Fallback: load fresh data
            var oFreshModel = new JSONModel();
            oFreshModel.loadData("module/downtime.json", null, false);
            oDialog.setModel(oFreshModel);
          }
          that._oReportDialog = oDialog;
          oDialog.open();
        });
      },

      onClose: function () {
        if (this._oReportDialog) {
          this._oReportDialog.close();
        }
      }
    });
  }
);
