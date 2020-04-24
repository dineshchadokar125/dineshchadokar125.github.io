sap.ui.define([
	"sap/viz/ui5/controls/VizFrame",
	"sap/viz/ui5/data/FlattenedDataset",
	"sap/viz/ui5/data/DimensionDefinition",
	"sap/viz/ui5/data/MeasureDefinition",
	"sap/viz/ui5/controls/common/feeds/FeedItem",
	"sap/ui/model/json/JSONModel"
], function(VizFrame, FlattenedDataset, DimensionDefinition, MeasureDefinition, FeedItem, JSONModel) {
	"use strict";

	return sap.ui.jsfragment("com.sap.dinesh.covid19india.dashboard.view.VizChartState", {
		createContent: function(controller) {

			var oVizFrame = new VizFrame({
				height: "350px",
				width: "100%",
				vizType: "column",
				uiConfig: {
					applicationSet: 'fiori'
				}
			});
			oVizFrame.attachRenderComplete(function(e) {
				// oVizFrame.zoom({
				// 	direction: "out"
				// });
				// oVizFrame.zoom({
				// 	direction: "out"
				// });
			});

			var oDataset = new FlattenedDataset({
				dimensions: new DimensionDefinition({
					name: "State",
					value: "{state}"
				}),
				measures: [
					new MeasureDefinition({
						name: "Confirmed",
						value: "{confirmed}"
					}),

					new MeasureDefinition({
						name: "Recovered",
						value: "{recovered}"
					})

				],
				data: {
					path: '/statewise',
					sorter: {
						path: 'confirmed'
					}
				}
			});

			oVizFrame.setDataset(oDataset);

			oVizFrame.addFeed(new FeedItem({
				uid: "valueAxis",
				type: "Measure",
				values: [
					"Confirmed", "Recovered"
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
					colorPalette: ["#FF0000", "#00FF00"],
					dataLabel: {
						visible: true,
						distance: 0.3,
						line: {
							visible: true
						}
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
						text: "Cases"
					}
				}
			});
			var vizPopover = new sap.viz.ui5.controls.Popover({});
			vizPopover.connect(oVizFrame.getVizUid());

			return oVizFrame;
		}
	});
});