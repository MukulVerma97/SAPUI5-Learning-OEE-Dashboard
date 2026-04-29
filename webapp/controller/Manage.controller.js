sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
  ],
  function (Controller, JSONModel, MessageToast, Filter, FilterOperator) {
    "use strict";
    return Controller.extend("Learning.controller.Manage", {

      onInit: function () {
        // Load local mock data instead of MII backend
        var oNinjaModel = new JSONModel("module/ninja.json");
        this.getView().setModel(oNinjaModel, "empData");
      },

      onPressNavButton: function () {
        sap.ui.core.UIComponent.getRouterFor(this).navTo("Oee");
      },

      onSelect: function () {
        var bAll = this.byId("dd").getSelected();
        var bUchiha = this.byId("aa").getSelected();
        var bUzumaki = this.byId("bb").getSelected();
        var bHatake = this.byId("cc").getSelected();

        var oTable = this.byId("table");
        var oBinding = oTable.getBinding("items");

        if (bAll || (!bUchiha && !bUzumaki && !bHatake)) {
          // Show all — remove filters
          oBinding.filter([]);
          // If "All" was checked, uncheck the others
          if (bAll) {
            this.byId("aa").setSelected(false);
            this.byId("bb").setSelected(false);
            this.byId("cc").setSelected(false);
          }
          return;
        }

        // Build OR filters for selected houses
        var aFilters = [];
        if (bUchiha) {
          aFilters.push(new Filter("Ninja_house", FilterOperator.EQ, "uchiha"));
        }
        if (bUzumaki) {
          aFilters.push(new Filter("Ninja_house", FilterOperator.EQ, "uzumaki"));
        }
        if (bHatake) {
          aFilters.push(new Filter("Ninja_house", FilterOperator.EQ, "hatake"));
        }

        if (aFilters.length > 0) {
          oBinding.filter(new Filter({
            filters: aFilters,
            and: false
          }));
        }
      },

      onSort: function () {
        var oTable = this.byId("table");
        var oBinding = oTable.getBinding("items");
        var oSorter = new sap.ui.model.Sorter("Ninja_Name", false);
        oBinding.sort(oSorter);
        MessageToast.show("Sorted by Ninja Name");
      },

      onPressRefresh: function () {
        // Reload model data
        var oModel = this.getView().getModel("empData");
        oModel.loadData("module/ninja.json");
        // Reset all checkboxes
        this.byId("dd").setSelected(false);
        this.byId("aa").setSelected(false);
        this.byId("bb").setSelected(false);
        this.byId("cc").setSelected(false);
        // Clear filters
        var oTable = this.byId("table");
        oTable.getBinding("items").filter([]);
        MessageToast.show("Data refreshed");
      }
    });
  }
);
