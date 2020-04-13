sap.ui.define([
	"sap/viz/ui5/controls/VizFrame",
	"sap/viz/ui5/data/FlattenedDataset",
	"sap/viz/ui5/data/DimensionDefinition",
	"sap/viz/ui5/data/MeasureDefinition",
	"sap/viz/ui5/controls/common/feeds/FeedItem",
	"sap/ui/model/json/JSONModel"
], function(VizFrame, FlattenedDataset, DimensionDefinition, MeasureDefinition, FeedItem, JSONModel) {
	"use strict";

	return sap.ui.jsfragment("com.sap.dinesh.covid19india.dashboard.view.VizChart", {
		createContent: function(controller) {

			var oVizFrame = new VizFrame({
				height: "400px",
				width: "100%",
				vizType: "bar",
				uiConfig: {
					applicationSet: 'fiori'
				}
			});

			var oDataset = new FlattenedDataset({
				dimensions: new DimensionDefinition({
					name: "Date",
					value: "{date}"
				}),
				measures: [
					new MeasureDefinition({
						name: "TotalConfirmedCases",
						value: "{totalconfirmed}"
					})
				],
				data: "{/cases_time_series}"
			});

			oVizFrame.setDataset(oDataset);

			oVizFrame.addFeed(new FeedItem({
				uid: "valueAxis",
				type: "Measure",
				values: [
					"TotalConfirmedCases"
				]
			}));

			oVizFrame.addFeed(new FeedItem({
				uid: "categoryAxis",
				type: "Dimension",
				values: ["Date"]
			}));

			oVizFrame.setVizProperties({
				plotArea: {
					showGap: true,
					colorPalette: "#FF0000",
					dataLabel: {
						visible: true
					},
					primaryScale: {
						fixedRange: true,
						minValue: 0,
						maxValue: 10000
					}
				},
				title: {
					visible: false
				},
				valueAxis: {
					title: {
						text: "Total Confirmed Cases"
					}
				}
			});

			// var sDataPath = sap.ui.require.toUrl("");
			var oModel = new JSONModel(controller.getOwnerComponent().getModel('my_global_json_model').getData());
			controller.getView().setModel(oModel);

			

			return oVizFrame;
		}
	});
});