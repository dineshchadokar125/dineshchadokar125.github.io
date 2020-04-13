sap.ui.define(["sap/viz/ui5/controls/VizFrame","sap/viz/ui5/data/FlattenedDataset","sap/viz/ui5/data/DimensionDefinition","sap/viz/ui5/data/MeasureDefinition","sap/viz/ui5/controls/common/feeds/FeedItem","sap/ui/model/json/JSONModel"],function(e,a,i,t,n,s){"use strict";return sap.ui.jsfragment("com.sap.dinesh.covid19india.dashboard.view.VizChartState",{createContent:function(o){var d=new e({height:"400px",width:"100%",vizType:"bar",uiConfig:{applicationSet:"fiori"}}),r=new a({dimensions:new i({name:"State",value:"{state}"}),measures:[new t({name:"Confirmed",value:"{confirmed}"})],data:"{/statewise}"});d.setDataset(r),d.addFeed(new n({uid:"valueAxis",type:"Measure",values:["Confirmed"]})),d.addFeed(new n({uid:"categoryAxis",type:"Dimension",values:["State"]})),d.setVizProperties({plotArea:{showGap:!0,colorPalette:"#FF0000",dataLabel:{visible:!0},primaryScale:{fixedRange:!0,minValue:0,maxValue:15e3}},title:{visible:!1},valueAxis:{title:{text:"Total Confirmed Cases"}}});var l=new s(o.getOwnerComponent().getModel("my_global_json_model").getData());return o.getView().setModel(l),d}})});