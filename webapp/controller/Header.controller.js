sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/core/Core",
  ],

  function (Controller, MessageToast, JSONModel, Core) {
    "use strict";
    return Controller.extend("Learning.controller.Header", {
      onInit: function () {
        this.setTime();
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
    });
  }
);
