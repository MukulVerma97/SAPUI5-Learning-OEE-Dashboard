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
    return Controller.extend("Learning.controller.Home", {
      onInit: function () {},

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
      onNext: function () {
        let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("Form");
      },
      onHome: function () {
        MessageToast.show("THIS IS HOME PAGE");
      },
      goodMorning: function () {
        MessageToast.show(" Have a Nice Day ");
      },
      onForm: function () {
        let oRouter = sap.ui.core.UIComponent.getRouterFor(this);

        oRouter.navTo("Form");
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

        // const that = this.getView(),
        //   popButton = oEvent.getSource();
        // if (!this.popFragment) {
        //   this.popFragment = Fragment.load({
        //     name: "Learning.view.Printing",
        //     id: "Printing",
        //     controller: this,
        //   }).then(function (oPopFrag) {
        //     that.addDependent(oPopFrag);
        //     oPopFrag.bindElement("/dums/0");
        //     return oPopFrag;
        //   });
        // }
        // this.popFragment.then(function (popFrag) {
        //   popFrag.openBy(popButton);
        // });

        // if (!this._pPopover) {
        //   var oButton = oEvent.getSource(),
        //     oView = this.getView();
        //   this._pPopover = this.loadFragment({
        //     id: "Printing",
        //     name: "Learning.view.Printing",
        //     controller: this,
        //   }).then(function (oPopover) {
        //     oView.addDependent(oPopover);
        //     return oPopover;
        //   });
        //   this._pPopover.then(function (oPopover) {
        //     oPopover.openBy(oButton);
        //   });
        // }
      },
    });
  }
);
