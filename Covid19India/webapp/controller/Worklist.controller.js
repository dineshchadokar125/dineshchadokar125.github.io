sap.ui.define([
	"com/sap/dinesh/covid19india/dashboard/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast"
], function(BaseController, JSONModel, formatter, Filter, FilterOperator, History, MessageToast) {
	"use strict";
	return BaseController.extend("com.sap.dinesh.covid19india.dashboard.controller.Worklist", {

		onInit: function() {
			var oRouter = this.getRouter();
			oRouter.getRoute("worklist").attachMatched(this._onRouteMatched, this);
		},

		_onRouteMatched: function() {},
		onNavBack: function() {
			var oHistory = History.getInstance(),
				sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				// The history contains a previous entry
				history.go(-1);
			}
		}

	});
});