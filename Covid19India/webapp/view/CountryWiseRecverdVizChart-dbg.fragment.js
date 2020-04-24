sap.ui.define([
	"sap/viz/ui5/controls/VizFrame",
	"sap/viz/ui5/data/FlattenedDataset",
	"sap/viz/ui5/data/DimensionDefinition",
	"sap/viz/ui5/data/MeasureDefinition",
	"sap/viz/ui5/controls/common/feeds/FeedItem",
	"sap/ui/model/json/JSONModel"
], function(VizFrame, FlattenedDataset, DimensionDefinition, MeasureDefinition, FeedItem, JSONModel) {
	"use strict";

	return sap.ui.jsfragment("com.sap.dinesh.covid19india.dashboard.view.CountryWiseRecverdVizChart", {
		createContent: function(controller) {

			var oVizFrame = new VizFrame({
				height: "350px",
				width: "100%",
				vizType: "column",
				uiConfig: {
					applicationSet: 'fiori'
				}
			});
			var oDataset = new FlattenedDataset({
				dimensions: new DimensionDefinition({
					name: "Country",
					value: "{country}"
				}),
				measures: [
					new MeasureDefinition({
						name: "Recovered",
						value: "{recovered}"
					})
				],
				data: "{CountryDataRecovered>/}"
			});

			oVizFrame.setDataset(oDataset);

			oVizFrame.addFeed(new FeedItem({
				uid: "valueAxis",
				type: "Measure",
				values: [
					"Recovered"
				]
			}));

			oVizFrame.addFeed(new FeedItem({
				uid: "categoryAxis",
				type: "Dimension",
				values: ["Country"]
			}));

			oVizFrame.setVizProperties({
				interaction: {
					selectability: {
						mode: "EXCLUSIVE"
					}
				},
				plotArea: {
					showGap: false,
					colorPalette: "#00FF00",
					dataLabel: {
						visible: true
					},
					primaryScale: {
						fixedRange: false,
						minValue: 0,
						maxValue: 2500000
					}
				},
				title: {
					visible: false
				},
				valueAxis: {
					title: {
						text: "Recovered Cases"
					}
				},
				toolTip: {
					visible: true
				}
			});
			var vizPopover = new sap.viz.ui5.controls.Popover({});
			vizPopover.connect(oVizFrame.getVizUid());
			return oVizFrame;
		}
	});
});