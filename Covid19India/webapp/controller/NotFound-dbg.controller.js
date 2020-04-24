sap.ui.define([
	"com/sap/dinesh/covid19india/dashboard/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("com.sap.dinesh.covid19india.dashboard.controller.NotFound", {
		/**
		 * Navigates to the worklist when the link is pressed
		 * @public
		 */
		onInit: function() {
			var self = this;
			self.intervalHandle = setInterval(function() {
				self.getData();
			}, 30000);
		},

		onLinkPressed: function() {
			if (this.checkConnection()) {
				window.open('https://dineshchadoker.com/Covid19India/', "_self");
			}
		}

	});

});