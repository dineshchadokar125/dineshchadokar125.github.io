sap.ui.define(["sap/viz/ui5/controls/VizFrame","sap/viz/ui5/data/FlattenedDataset","sap/viz/ui5/data/DimensionDefinition","sap/viz/ui5/data/MeasureDefinition","sap/viz/ui5/controls/common/feeds/FeedItem","sap/ui/model/json/JSONModel"],function(e,i,a,t,n,o){"use strict";return sap.ui.jsfragment("com.sap.dinesh.covid19india.dashboard.view.VizChartDailyConfirmed",{createContent:function(s){var d=new e({height:"350px",width:"100%",vizType:"line",uiConfig:{applicationSet:"fiori"}});d.attachRenderComplete(function(e){d.zoom({direction:"out"}),d.zoom({direction:"out"}),d.zoom({direction:"out"})});var r=new i({dimensions:new a({name:"Date",value:"{date}"}),measures:[new t({name:"Dailyrecovered",value:"{dailydeceased}"}),new t({name:"DailyConfirmedCases",value:"{dailyconfirmed}"})],data:"{/cases_time_series}"});d.setDataset(r),d.addFeed(new n({uid:"valueAxis",type:"Measure",values:["Dailyrecovered"]})),d.addFeed(new n({uid:"valueAxis",type:"Measure",values:["DailyConfirmedCases"]})),d.addFeed(new n({uid:"categoryAxis",type:"Dimension",values:["Date"]})),d.setVizProperties({interaction:{selectability:{mode:"EXCLUSIVE"}},plotArea:{general:{groupData:!1},showGap:!0,dataLabel:{visible:!0},primaryScale:{fixedRange:!0,minValue:0,maxValue:4e3}},title:{visible:!0,text:"India"},valueAxis:{title:{text:"Cases"}}});var l=new o(s.getOwnerComponent().getModel("my_global_json_model").getData());return s.getView().setModel(l),new sap.viz.ui5.controls.Popover({}).connect(d.getVizUid()),d}})});
