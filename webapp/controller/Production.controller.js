sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "../formatter/Formatter",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/m/PDFViewer",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
  ],
  function (Controller, Formatter, MessageToast, Filter, PDFViewer, JSONModel, Fragment) {
    "use strict";

    return Controller.extend("Learning.controller.Production", {

      formatter: Formatter,

      onInit: function () {
        // Load teams model for the production table
        var oTeamsModel = new JSONModel("module/teams.json");
        this.getView().setModel(oTeamsModel);

        // Village model for value help fragments
        this._oVillageModel = new JSONModel("module/village.json");

        // Track selected value for value help fragments
        this._sSelectedValue = "";

        // Track clicked row index for Assign / Add dialogs
        this._iClickedRowIndex = -1;

        // Start clock
        this._startClock();

        // Pre-load the Assign dialog fragment (product table)
        if (!this._pAssignDialog) {
          this._pAssignDialog = this.loadFragment({
            name: "Learning.view.Assign",
            id: "prodAssign"
          });
          var oProductModel = new JSONModel("module/product.json");
          this._pAssignDialog.then(function (oDialog) {
            oDialog.setModel(oProductModel);
          });
        }

        // Pre-load the Add/ComboBox dialog fragment
        if (!this._pAddDialog) {
          this._pAddDialog = this.loadFragment({
            name: "Learning.view.Add",
            id: "prodCountry"
          });
          var oCountryModel = new JSONModel("module/country.json");
          this._pAddDialog.then(function (oDialog) {
            oDialog.setModel(oCountryModel);
          });
        }

        // PDF Viewer setup
        this._oPdfViewer = new PDFViewer();
        this.getView().addDependent(this._oPdfViewer);
      },

      // =================== VALUE HELP DIALOGS (Header) ===================

      onFirst: function () {
        var oModel = new JSONModel("module/village.json");
        if (!this._pDialog1) {
          this._pDialog1 = this.loadFragment({
            name: "Learning.view.first",
            id: "prodVH1"
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
            id: "prodVH2"
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
            id: "prodVH3"
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

      onClose1: function () { if (this._oDialog1) { this._oDialog1.close(); } },
      onClose2: function () { if (this._oDialog2) { this._oDialog2.close(); } },
      onClose3: function () { if (this._oDialog3) { this._oDialog3.close(); } },

      // =================== SEARCH HANDLERS ===================

      onSearch2: function (oEvent) {
        var oItem = oEvent.getParameter("suggestionItem");
        if (oItem) {
          MessageToast.show("Selected: " + oItem.getText());
          if (this._oDialog1) { this._oDialog1.close(); }
          this.getView().byId("prodFirst").setText("Hokage — " + oItem.getText());
        } else {
          MessageToast.show("Search is fired!");
        }
      },

      onSearch3: function (oEvent) {
        var oItem = oEvent.getParameter("suggestionItem");
        if (oItem) {
          MessageToast.show("Selected: " + oItem.getText());
          if (this._oDialog2) { this._oDialog2.close(); }
          this.getView().byId("prodSecond").setText("Raikage — " + oItem.getText());
        } else {
          MessageToast.show("Search is fired!");
        }
      },

      onSearch4: function (oEvent) {
        var oItem = oEvent.getParameter("suggestionItem");
        if (oItem) {
          MessageToast.show("Selected: " + oItem.getText());
          if (this._oDialog3) { this._oDialog3.close(); }
          this.getView().byId("prodThird").setText("Kazekage — " + oItem.getText());
        } else {
          MessageToast.show("Search is fired!");
        }
      },

      // =================== SUBMIT HANDLERS ===================

      onSubmit1: function () {
        if (this._oDialog1) { this._oDialog1.close(); }
        if (this._sSelectedValue) {
          this.getView().byId("prodFirst").setText("Hokage — " + this._sSelectedValue);
        }
      },

      onSubmit2: function () {
        if (this._oDialog2) { this._oDialog2.close(); }
        if (this._sSelectedValue) {
          this.getView().byId("prodSecond").setText("Raikage — " + this._sSelectedValue);
        }
      },

      onSubmit3: function () {
        if (this._oDialog3) { this._oDialog3.close(); }
        if (this._sSelectedValue) {
          this.getView().byId("prodThird").setText("Kazekage — " + this._sSelectedValue);
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

      onSelectionChange1: function (e) { this._onSelectionChange(e); },
      onSelectionChange2: function (e) { this._onSelectionChange(e); },
      onSelectionChange3: function (e) { this._onSelectionChange(e); },

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

      onSuggest1: function (e) { this._onSuggest(e); },
      onSuggest2: function (e) { this._onSuggest(e); },
      onSuggest3: function (e) { this._onSuggest(e); },

      // =================== PDF VIEWER ===================

      showPdf: function () {
        this._oPdfViewer.setSource("https://hpread.scholastic.com/HP_Book1_Chapter_Excerpt.pdf");
        this._oPdfViewer.setTitle("Production Report");
        this._oPdfViewer.open();
      },

      // =================== ASSIGN TABLE DIALOG (Reason Code) ===================

      openTable: function (oEvent) {
        // Capture the row index from the clicked button inside sap.ui.table.Table
        var oButton = oEvent.getSource();
        var oRowContext = oButton.getBindingContext();
        if (oRowContext) {
          // Extract row index from path like "/ProductCollection/1"
          var sPath = oRowContext.getPath();
          this._sClickedRowPath = sPath;
        }

        var that = this;
        this._pAssignDialog.then(function (oDialog) {
          that._oAssignDialog = oDialog;
          oDialog.open();
        });
      },

      // Called when user selects a product from the Assign dialog table
      onAssignSelect: function (oEvent) {
        var oItem = oEvent.getParameter("listItem") || oEvent.getSource();
        var oContext = oItem.getBindingContext();
        if (oContext) {
          var oProduct = oContext.getObject();
          this._sAssignedProduct = oProduct.Name || "";
        }
      },

      handleClose: function () {
        // Write the selected product name back into the teams model as reason code
        if (this._sAssignedProduct && this._sClickedRowPath) {
          var oModel = this.getView().getModel();
          var sReasonPath = this._sClickedRowPath + "/reason";
          var sIconPath = this._sClickedRowPath + "/icon";
          oModel.setProperty(sReasonPath, this._sAssignedProduct);
          oModel.setProperty(sIconPath, "sap-icon://value-help");
          MessageToast.show("Reason Code set: " + this._sAssignedProduct);
        }
        this._sAssignedProduct = "";
        if (this._oAssignDialog) {
          this._oAssignDialog.close();
        }
      },

      // =================== COMBOBOX DIALOG (Comments) ===================

      openCombo: function (oEvent) {
        // Capture the row context from the clicked button
        var oButton = oEvent.getSource();
        var oRowContext = oButton.getBindingContext();
        if (oRowContext) {
          this._sComboRowPath = oRowContext.getPath();
        }

        var that = this;
        this._pAddDialog.then(function (oDialog) {
          that._oAddDialog = oDialog;
          oDialog.open();
        });
      },

      countryClose: function () {
        var oCombo = this.byId("prodCountry--country1");
        var sValue = "";
        if (oCombo) {
          sValue = oCombo.getValue();
        }

        // Write the selected country back into the teams model as comments
        if (sValue && this._sComboRowPath) {
          var oModel = this.getView().getModel();
          var sCommentsPath = this._sComboRowPath + "/comments";
          var sIconPath = this._sComboRowPath + "/icon";
          oModel.setProperty(sCommentsPath, sValue);
          oModel.setProperty(sIconPath, "sap-icon://value-help");
          MessageToast.show("Comment set: " + sValue);
        }

        if (this._oAddDialog) {
          this._oAddDialog.close();
        }
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
          var oText = that.getView().byId("prodShowTime");
          if (oText) { oText.setText(sTime); }
        }, 1000);
      },

      onExit: function () {
        if (this._clockInterval) { clearInterval(this._clockInterval); }
        if (this._oPdfViewer) { this._oPdfViewer.destroy(); }
      }
    });
  }
);
