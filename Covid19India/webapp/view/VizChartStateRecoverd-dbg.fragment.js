sap.ui.define([
	"sap/viz/ui5/controls/VizFrame",
	"sap/viz/ui5/data/FlattenedDataset",
	"sap/viz/ui5/data/DimensionDefinition",
	"sap/viz/ui5/data/MeasureDefinition",
	"sap/viz/ui5/controls/common/feeds/FeedItem",
	"sap/ui/model/json/JSONModel"
], function(VizFrame, FlattenedDataset, DimensionDefinition, MeasureDefinition, FeedItem, JSONModel) {
	"use strict";

	return sap.ui.jsfragment("com.sap.dinesh.covid19india.dashboard.view.VizChartStateRecoverd", {
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
					name: "State",
					value: "{state}"
				}),
				measures: [
					new MeasureDefinition({
						name: "Recovered",
						value: "{recovered}"
					})
				],
				data: "{DatadataCasesdataRecoverd>/}"
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
				values: ["State"]
			}));

			oVizFrame.setVizProperties({
				interaction: {
					selectability: {
						mode: "EXCLUSIVE"
					}
				},

				plotArea: {
					showGap: true,
					colorPalette: "#00FF00",
					dataLabel: {
						visible: true
					},
					primaryScale: {
						fixedRange: false,
						minValue: 0,
						maxValue: 10000
					}
				},
				title: {
					visible: false
				},
				valueAxis: {
					title: {
						text: "Total Recoverd Cases"
					}
				}
			});
			var vizPopover = new sap.viz.ui5.controls.Popover({});
			vizPopover.connect(oVizFrame.getVizUid());
			return oVizFrame;
		}
	});
});