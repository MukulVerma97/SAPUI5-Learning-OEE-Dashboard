sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
  ],
  function (Controller, MessageToast, MessageBox, JSONModel) {
    "use strict";
    return Controller.extend("Learning.controller.App", {
      onInit: function () {
        // Start live clock
        this._startClock();

        // Restore saved theme preference
        var sSavedTheme = localStorage.getItem("oee_theme") || "sap_fiori_3";
        if (sSavedTheme === "sap_fiori_3_dark") {
          sap.ui.getCore().applyTheme("sap_fiori_3_dark");
          this.byId("themeSwitch").setState(true);
        }

        // Set app model with metadata
        var oAppModel = new JSONModel({
          appVersion: "1.0.0",
          currentUser: "User",
          currentTheme: sSavedTheme
        });
        this.getView().setModel(oAppModel, "app");
      },

      // ---- Navigation ----
      onItemSelect: function (oEvent) {
        var sKey = oEvent.getParameter("item").getKey();
        this.getOwnerComponent().getRouter().navTo(sKey);
      },

      // ---- Side Navigation Toggle ----
      openSide: function () {
        var oToolPage = this.byId("mainPage");
        oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
      },

      // ---- Theme Switching ----
      onThemeSwitch: function (oEvent) {
        var bDark = oEvent.getParameter("state");
        var sTheme = bDark ? "sap_fiori_3_dark" : "sap_fiori_3";
        sap.ui.getCore().applyTheme(sTheme);
        localStorage.setItem("oee_theme", sTheme);

        var sMsg = bDark ? "Switched to Dark Theme" : "Switched to Light Theme";
        MessageToast.show(sMsg);
      },

      // ---- Help Dialog ----
      onHelp: function () {
        MessageBox.information(
          "OEE Manufacturing Dashboard v1.0\n\n" +
          "This application provides real-time monitoring of:\n" +
          "• Overall Equipment Effectiveness (OEE)\n" +
          "• Production Reporting\n" +
          "• Downtime Management\n" +
          "• Speed Loss Analysis\n\n" +
          "Use the side navigation to switch between modules.",
          { title: "About OEE Dashboard" }
        );
      },

      // ---- Live Clock ----
      _startClock: function () {
        var that = this;
        this._clockInterval = setInterval(function () {
          var oDate = new Date();
          var iHours = oDate.getHours();
          var iMinutes = oDate.getMinutes();
          var iSeconds = oDate.getSeconds();
          var sPeriod = iHours >= 12 ? "PM" : "AM";
          var iDisplayHours = iHours % 12 || 12;

          var sTime =
            (iDisplayHours < 10 ? "0" : "") + iDisplayHours + ":" +
            (iMinutes < 10 ? "0" : "") + iMinutes + ":" +
            (iSeconds < 10 ? "0" : "") + iSeconds + " " + sPeriod;

          var oTimeText = that.byId("showTime");
          if (oTimeText) {
            oTimeText.setText(sTime);
          }
        }, 1000);
      },

      onExit: function () {
        if (this._clockInterval) {
          clearInterval(this._clockInterval);
        }
      }
    });
  }
);
