sap.ui.define([], function () {
  "use strict";

  var Formatter = {
    /**
     * Returns semantic state based on weight value
     * @param {string} fValue - the weight value
     * @returns {string} the ValueState
     */
    weightState: function (fValue) {
      try {
        fValue = parseFloat(fValue);
        if (fValue < 0) {
          return "None";
        } else if (fValue < 1000) {
          return "Success";
        } else if (fValue < 2000) {
          return "Warning";
        } else {
          return "Error";
        }
      } catch (err) {
        return "None";
      }
    },

    /**
     * Formats a date string to locale-aware display
     * @param {string} sDate - date string
     * @returns {string} formatted date
     */
    formatDate: function (sDate) {
      if (!sDate) { return ""; }
      try {
        var oDate = new Date(sDate);
        return oDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        });
      } catch (e) {
        return sDate;
      }
    },

    /**
     * Returns icon based on status text
     * @param {string} sStatus - status text
     * @returns {string} icon URI
     */
    statusIcon: function (sStatus) {
      if (!sStatus) { return ""; }
      switch (sStatus.toLowerCase()) {
        case "green":
        case "success":
          return "sap-icon://sys-enter-2";
        case "orange":
        case "warning":
          return "sap-icon://alert";
        case "red":
        case "error":
        case "danger":
          return "sap-icon://error";
        default:
          return "sap-icon://information";
      }
    },

    /**
     * Formats a percentage value with % suffix
     * @param {number} fValue - numeric value
     * @returns {string} formatted percentage
     */
    formatPercent: function (fValue) {
      if (fValue === null || fValue === undefined) { return "0.00%"; }
      return parseFloat(fValue).toFixed(2) + "%";
    },

    /**
     * Formats duration in hours
     * @param {number} fValue - numeric hours
     * @returns {string} formatted duration
     */
    formatDuration: function (fValue) {
      if (!fValue) { return "0.00 h"; }
      return parseFloat(fValue).toFixed(2) + " h";
    }
  };

  return Formatter;
}, /* bExport= */ true);
