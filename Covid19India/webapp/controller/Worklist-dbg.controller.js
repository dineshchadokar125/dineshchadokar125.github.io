sap.ui.define([
	"com/sap/dinesh/covid19india/dashboard/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/Fragment",
	"sap/ui/Device"
], function (BaseController, JSONModel, Filter, FilterOperator, Fragment, Device) {
	"use strict";
	return BaseController.extend("com.sap.dinesh.covid19india.dashboard.controller.Worklist", {

		onInit: function () {
			// var oViewModel = this.getView().getModel("appView");
			// oViewModel.setProperty("/busy", true);
			// this.getView().setBusy(true);
			var oRouter = this.getRouter();
			oRouter.getRoute("worklist").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function () {
			var oViewModel = this.getView().getModel("appView");
			oViewModel.setProperty("/busy", true);
			this.getView().setBusy(true);

			this.getData();
			this.modelServices();
			if (!this.checkConnection()) {
				this.getRouter().getTargets().display("notFound");
			}
		},
		onAfterRendering: function () {
			var oViewModel = this.getView().getModel("appView");
			oViewModel.setProperty("/busy", true);
			if (!Device.support.touch) {
				this.getView().byId("Tilecontainer").setHeight("50%");
			} else {
				this.getView().byId("Tilecontainer").setHeight("100%");
			}
		},
		modelServices: function () {
			var self = this;
			self.intervalHandle = setInterval(function () {
				self.getData();
			}, 120000);
		},
		getData: function () {
			var that = this;
			var DataArrya = [];
			var flagDataArrya = [];
			var DataReset = [];
			var DataResetOthers = [];
			var vtotalTests = 0;
			var vtestsPerOneMillion = 0;
			var DataResetGlobal = [];
			var IndiaData = [];
			var dataFlageGlobe = {
				"flag": "https://upload.wikimedia.org/wikipedia/commons/4/45/Terra_globe_icon.png"
			};
			var oModelflag = new JSONModel(that.getOwnerComponent().getModel('flagdata').getData());
			this.getView().setModel(oModelflag, "flag");
			var dataRecoverd = that.getOwnerComponent().getModel('my_global_json_model').getData();

			//new code
			var oModelCountryData = new JSONModel();
			oModelCountryData.attachRequestCompleted(function (oEvent) {

				DataArrya = oEvent.getSource().getData();
				if (DataArrya.length) {
					var vWorld = DataArrya.filter(function (e) {
						return e.country === 'World' || e.country === "Global";
					});
				}

				var oModelvWorld = new JSONModel(vWorld);
				that.getView().setModel(oModelvWorld, "GlobalData");
				if (DataArrya.length > 0) {
					flagDataArrya = that.getOwnerComponent().getModel('flagdata').getData();
					for (var i = 0; i < DataArrya.length; i++) {
						vtotalTests = vtotalTests + Number(DataArrya[i].totalTests);
						vtestsPerOneMillion = vtestsPerOneMillion + Number(DataArrya[i].testsPerOneMillion);
						if (flagDataArrya.length && i > 6) {
							var isdatafound = false;
							for (var j = 0; j < flagDataArrya.length; j++) {
								if (flagDataArrya[j].country === DataArrya[i].country) {
									DataArrya[i].countryInfo = flagDataArrya[j].countryInfo;
									isdatafound = true;
								}
							}
							if (!isdatafound) {
								DataArrya[i].countryInfo = dataFlageGlobe;
							}
							if (DataArrya[i].country === "World" || DataArrya[i].country === "Global") {
								DataArrya[i].country = "Global";
								DataArrya[i].countryInfo = dataFlageGlobe;
								DataResetGlobal.push(DataArrya[i]);
							} else {
								if (DataArrya[i].country === "India") {

									if (IndiaData.length) {
										DataArrya[i].recovered = IndiaData[0].recovered;
									}

									if (IndiaData.length) {
										DataArrya[i].cases = IndiaData[0].confirmed;
									}

									if (IndiaData.length) {
										DataArrya[i].active = IndiaData[0].active;
									}

									DataReset.push(DataArrya[i]);
								}
								if (DataArrya[i].country !== "Total" && DataArrya[i].country !== "Total:" && DataArrya[i].country !== "India") {
									DataResetOthers.push(DataArrya[i]);
								}
							}
						}
					}
				}
				if (DataResetGlobal.length) {
					DataResetGlobal[0].totalTests = vtotalTests;
				}
				if (DataResetGlobal.length) {
					DataResetGlobal[0].testsPerOneMillion = vtestsPerOneMillion;
				}

				DataReset = DataResetGlobal.concat(DataReset);
				DataResetOthers = DataReset.concat(DataResetOthers);
				var oModelCountry = new JSONModel();
				oModelCountry.setData(DataResetOthers);
				oModelCountry.setSizeLimit(DataResetOthers.length);
				that.getView().setModel(oModelCountry, "CountryData");
				//Set Global model
				that.getOwnerComponent().setModel(oModelCountry, "CountryData");

				var DataResetOthersCases = $.extend([], DataResetOthers);
				var oDataCountryDataCases = new JSONModel();
				if (DataResetOthersCases.length) {
					DataResetOthersCases.sort(function (a, b) {
						return b.cases - a.cases;
					});
				}
				oDataCountryDataCases.setData(DataResetOthersCases);
				oDataCountryDataCases.setSizeLimit(DataResetOthersCases.length);
				that.getView().setModel(oDataCountryDataCases, "CountryDataCases");

				var DataResetOthersRecovered = $.extend([], DataResetOthers);
				var oDataCountryDataRecovered = new JSONModel();
				if (DataResetOthersRecovered.length) {
					DataResetOthersRecovered.sort(function (a, b) {
						return b.recovered - a.recovered;
					});
				}
				oDataCountryDataRecovered.setData(DataResetOthersRecovered);
				oDataCountryDataRecovered.setSizeLimit(DataResetOthersRecovered.length);
				that.getView().setModel(oDataCountryDataRecovered, "CountryDataRecovered");

				var oViewModel = this.getView().getModel("appView");
				oViewModel.setProperty("/busy", false);
				this.getView().setBusy(false);

			}, this).loadData("https://coronavirus-19-api.herokuapp.com/countries");

			if (dataRecoverd.statewise) {
				IndiaData = dataRecoverd.statewise.filter(function (e) {
					return e.state === "Total";
				});
				var dataRecoverdcase = $.extend([], dataRecoverd.statewise);
				if (dataRecoverdcase) {
					dataRecoverdcase.sort(function (a, b) {
						return b.recovered - a.recovered;
					});
				}
				var oDatadataCasesdataRecoverd = new JSONModel();
				oDatadataCasesdataRecoverd.setData(dataRecoverdcase);
				that.getView().setModel(oDatadataCasesdataRecoverd, "DatadataCasesdataRecoverd");
			}

		},

		onSearch: function (oEvent) {
			var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				aFilters = [new Filter("country", sap.ui.model.FilterOperator.Contains, sQuery)];
			}
			var oBinding = oEvent.getSource().getParent().getParent().getBinding("items");
			oBinding.filter(aFilters, "Application");
		},

		onSearchState: function (oEvent) {
			var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {

				var FiltersData = new sap.ui.model.Filter({
					filters: [
						new Filter("state", sap.ui.model.FilterOperator.Contains, sQuery),
						new Filter("statecode", sap.ui.model.FilterOperator.Contains, sQuery)
					]
				});
			}
			var oBinding = oEvent.getSource().getParent().getParent().getBinding("items");
			oBinding.filter(FiltersData, "Application");
		},

		onTileDisplayDetails: function (oEvent) {
			if (!this._oPopover) {
				this._oPopover = sap.ui.xmlfragment("com.sap.dinesh.covid19india.dashboard.view.QuickViewCard", this);
				this.getView().addDependent(this._oPopover);
				this._oPopover.bindElement("CountryData>" + oEvent.getSource().oBindingContexts.CountryData.sPath + "/");
				this._oPopover.openBy(oEvent.getSource());
			} else {
				this._oPopover.bindElement("CountryData>" + oEvent.getSource().oBindingContexts.CountryData.sPath + "/");
				this._oPopover.openBy(oEvent.getSource());
			}
		},
		handleClosePressed: function (oEvent) {
			this._oPopover.close();
		},
		handleClosePressed_oPopoverHelpfulLinks: function (oEvent) {
			this._oPopoverHelpfulLinks.close();
		},
		handleCloseMapPressed: function (oEvent) {
			this._oPopoverMap.close();
		},

		onExit: function () {

			if (this._oPopover) {
				this._oPopover.destroy();
			}
			if (this._oPopoverHelpfulLinks) {
				this._oPopoverHelpfulLinks.destroy();
			}

			if (this._oPopoverdIstrictReporting) {
				this._oPopoverdIstrictReporting.destroy();
			}

			if (this._oPopoverMap) {
				this._oPopoverMap.destroy();
			}

		},
		onHome: function () {
			window.open("https://indiaagainstcovid19.in/", "_self");
		},
		dIstrictReporting: function (oEvent) {
			window.open("https://www.mohfw.gov.in/pdf/Districtreporting408.pdf", "_blank");
		},
		helpLineNumbers: function (oEvent) {
			window.open("https://www.mohfw.gov.in/pdf/coronvavirushelplinenumber.pdf");
		},
		helpfulLinks: function (oEvent) {
			if (!this._oPopoverHelpfulLinks) {
				this._oPopoverHelpfulLinks = sap.ui.xmlfragment("com.sap.dinesh.covid19india.dashboard.view.HelpFullinks", this);
				this.getView().addDependent(this._oPopoverHelpfulLinks);
				this._oPopoverHelpfulLinks.openBy(oEvent.getSource());
			} else {
				this._oPopoverHelpfulLinks.openBy(oEvent.getSource());
			}
		},
		openMap: function (oEvent) {
			this.getView().setBusy(true);
			this.getRouter().navTo("map");
		}

	});
});