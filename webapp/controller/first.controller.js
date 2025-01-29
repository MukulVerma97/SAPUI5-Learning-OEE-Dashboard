sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
  ],
  function (Controller, Filter, FilterOperator, JSONModel) {
    "use strict";

    return Controller.extend("Learning.controller.first", {
      onInit: function () {
        // set explored app's demo model on this sample
        var oModel = new JSONModel("module/product.json");
        var oModel1 = new JSONModel("module/product.json");
        this.getView().setModel(oModel);

        this.oSF = oView.byId("searchField1");
        this.oSF.setModel(oModel1);
        console.log("11o", oModel1);
      },

      onSearch: function (oEvent) {
        // add filter for search
        // var aFilters = [];
        // var sQuery = oEvent.getSource().getValue();
        // if (sQuery && sQuery.length > 0) {
        // 	var filter = new Filter("Name", FilterOperator.Contains, sQuery);
        // 	aFilters.push(filter);
        // }
        // // update list binding
        // var oList = this.byId("idList1");
        // var oBinding = oList.getBinding("items");
        // oBinding.filter(aFilters, "Application");
        // var oItem = oEvent.getParameter("suggestionItem");
        // if (oItem) {
        // 	MessageToast.show("Search for: " + oItem.getText());
        // } else {
        // 	MessageToast.show("Search is fired!");
        // }
      },

      onSelectionChange: function (oEvent) {
        var oList = oEvent.getSource();
        var oLabel = this.byId("idFilterLabel1");
        var oInfoToolbar = this.byId("idInfoToolbar1");

        // With the 'getSelectedContexts' function you can access the context paths
        // of all list items that have been selected, regardless of any current
        // filter on the aggregation binding.
        var aContexts = oList.getSelectedContexts(true);

        // update UI
        var bSelected = aContexts && aContexts.length > 0;
        var sText = bSelected ? aContexts.length + " selected" : null;
        oInfoToolbar.setVisible(bSelected);
        oLabel.setText(sText);
      },
      // ,
      // onSuggest1: function (event) {
      // 	console.log("in");
      // 	var sValue = event.getParameter("suggestValue"),
      // 		aFilters = [];
      // 	if (sValue) {
      // 		aFilters = [
      // 			new Filter([
      // 				new Filter("ProductId", function (sText) {
      // 					return (sText || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
      // 				}),
      // 				new Filter("Name", function (sDes) {
      // 					return (sDes || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
      // 				})
      // 			], false)
      // 		];
      // 	}

      // 	this.oSF.getBinding("suggestionItems").filter(aFilters);
      // 	this.oSF.suggest();

      // }
    });
  }
);
