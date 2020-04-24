sap.ui.define([
	"com/sap/dinesh/covid19india/dashboard/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"sap/ui/core/routing/History"
], function (BaseController, JSONModel, Device, History) {
	"use strict";

	return BaseController.extend("com.sap.dinesh.covid19india.dashboard.controller.map", {
		onInit: function () {
			// r oViewModel = this.getView().getModel("appView");
			// oViewModel.setProperty("/busy", true);
			var oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.getView().setModel(oDeviceModel, "device");
			var oRouter = this.getRouter();
			oRouter.getRoute("map").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function () {
			var oViewModel = this.getView().getModel("appView");
			oViewModel.setProperty("/busy", true);
			if (!this.checkConnection()) {
				this.getRouter().getTargets().display("notFound");
			} else {
				var oModel = new JSONModel();
				oModel.setData(this.getOwnerComponent().getModel("CountryData").getData());
				oModel.setSizeLimit(500);
				this.getView().setModel(oModel);
			}
			var oViewModel = this.getView().getModel("appView");
			oViewModel.setProperty("/busy", false);
		},
		onAfterRendering: function () {
			this.getView().setBusy(false);
		},
		onNavBack: function () {
			var oViewModel = this.getView().getModel("appView");
			oViewModel.setProperty("/busy", true);
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("worklist", {}, true /*no history*/ );
			}
		}

	});

});