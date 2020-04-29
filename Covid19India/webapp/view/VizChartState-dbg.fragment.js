sap.ui.define(["sap/viz/ui5/controls/VizFrame","sap/viz/ui5/data/FlattenedDataset","sap/viz/ui5/data/DimensionDefinition","sap/viz/ui5/data/MeasureDefinition","sap/viz/ui5/controls/common/feeds/FeedItem","sap/ui/model/json/JSONModel"],function(e,i,a,t,n,s){"use strict";return sap.ui.jsfragment("com.sap.dinesh.covid19india.dashboard.view.VizChartState",{createContent:function(s){var o=new e({height:"350px",width:"100%",vizType:"column",uiConfig:{applicationSet:"fiori"}});o.attachRenderComplete(function(e){});var r=new i({dimensions:new a({name:"States & UT",value:"{state}"}),measures:[new t({name:"Confirmed",value:"{confirmed}"}),new t({name:"Recovered",value:"{recovered}"})],data:{path:"/statewise",sorter:{path:"confirmed"}}});return o.setDataset(r),o.addFeed(new n({uid:"valueAxis",type:"Measure",values:["Confirmed","Recovered"]})),o.addFeed(new n({uid:"categoryAxis",type:"Dimension",values:["States & UT"]})),o.setVizProperties({interaction:{selectability:{mode:"EXCLUSIVE"}},plotArea:{showGap:!0,colorPalette:["#FF0000","#00FF00"],dataLabel:{visible:!0,distance:.3,line:{visible:!0}},primaryScale:{fixedRange:!1,minValue:0,maxValue:1e4}},title:{visible:!0,text:"States And Union Territories Of India"},valueAxis:{title:{text:"Cases"}}}),new sap.viz.ui5.controls.Popover({}).connect(o.getVizUid()),o}})});