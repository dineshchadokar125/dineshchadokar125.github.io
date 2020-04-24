sap.ui.define([
	"com/sap/dinesh/covid19india/dashboard/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("com.sap.dinesh.covid19india.dashboard.controller.App", {

		onInit: function () {

			var oViewModel = new JSONModel({
				busy: true,
				delay: 0
			});
			this.setModel(oViewModel, "appView");
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},

		fnSetAppNotBusy: function () {
			// oViewModel.setProperty("/busy", false);
			// oViewModel.setProperty("/delay", iOriginalBusyDelay);
		}

	});

});