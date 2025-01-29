sap.ui.define(
  ["sap/ui/core/ComponentContainer"],
  function (ComponentContainer) {
    "use strict";
    new ComponentContainer({
      name: "Learning",
      settings: {
        id: "component",
      },
      async: true,
      propagateModel: true,
    }).placeAt("content");
  }
);
