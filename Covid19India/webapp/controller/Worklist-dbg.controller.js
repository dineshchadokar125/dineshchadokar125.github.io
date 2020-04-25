sap.ui.define(["com/sap/dinesh/covid19india/dashboard/controller/BaseController","sap/ui/model/json/JSONModel","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/core/Fragment","sap/ui/Device"],function(e,t,o,n,i,r){"use strict";return e.extend("com.sap.dinesh.covid19india.dashboard.controller.Worklist",{onInit:function(){this.getRouter().getRoute("worklist").attachMatched(this._onRouteMatched,this)},_onRouteMatched:function(){this.getView().getModel("appView").setProperty("/busy",!0),this.getView().setBusy(!0),this.getData(),this.modelServices(),this.checkConnection()||this.getRouter().getTargets().display("notFound")},onAfterRendering:function(){this.getView().getModel("appView").setProperty("/busy",!0),r.support.touch?this.getView().byId("Tilecontainer").setHeight("100%"):this.getView().byId("Tilecontainer").setHeight("50%")},modelServices:function(){var e=this;e.intervalHandle=setInterval(function(){e.getData()},12e4)},getData:function(){var e=this,o=[],n=[],i=[],r=[],s=0,a=0,l=[],u=[],p={flag:"https://upload.wikimedia.org/wikipedia/commons/4/45/Terra_globe_icon.png"},c=new t(e.getOwnerComponent().getModel("flagdata").getData());this.getView().setModel(c,"flag");var d=e.getOwnerComponent().getModel("my_global_json_model").getData();if((new t).attachRequestCompleted(function(c){if((o=c.getSource().getData()).length)var d=o.filter(function(e){return"World"===e.country||"Global"===e.country});var h=new t(d);if(e.getView().setModel(h,"GlobalData"),o.length>0){n=e.getOwnerComponent().getModel("flagdata").getData();for(var g=0;g<o.length;g++)if(s+=Number(o[g].totalTests),a+=Number(o[g].testsPerOneMillion),n.length&&g>6){for(var f=!1,v=0;v<n.length;v++)n[v].country===o[g].country&&(o[g].countryInfo=n[v].countryInfo,f=!0);f||(o[g].countryInfo=p),"World"===o[g].country||"Global"===o[g].country?(o[g].country="Global",o[g].countryInfo=p,l.push(o[g])):("India"===o[g].country&&(u.length&&(o[g].recovered=u[0].recovered),u.length&&(o[g].cases=u[0].confirmed),u.length&&(o[g].active=u[0].active),i.push(o[g])),"Total"!==o[g].country&&"Total:"!==o[g].country&&"India"!==o[g].country&&r.push(o[g]))}}l.length&&(l[0].totalTests=s),l.length&&(l[0].testsPerOneMillion=a),i=l.concat(i),r=i.concat(r);var w=new t;w.setData(r),w.setSizeLimit(r.length),e.getView().setModel(w,"CountryData"),e.getOwnerComponent().setModel(w,"CountryData");var y=$.extend([],r),m=new t;y.length&&y.sort(function(e,t){return t.cases-e.cases}),m.setData(y),m.setSizeLimit(y.length),e.getView().setModel(m,"CountryDataCases");var P=$.extend([],r),_=new t;P.length&&P.sort(function(e,t){return t.recovered-e.recovered}),_.setData(P),_.setSizeLimit(P.length),e.getView().setModel(_,"CountryDataRecovered"),this.getView().getModel("appView").setProperty("/busy",!1),this.getView().setBusy(!1)},this).loadData("https://coronavirus-19-api.herokuapp.com/countries"),d.statewise){u=d.statewise.filter(function(e){return"Total"===e.state});var h=$.extend([],d.statewise);h&&h.sort(function(e,t){return t.recovered-e.recovered});var g=new t;g.setData(h),e.getView().setModel(g,"DatadataCasesdataRecoverd")}},onSearch:function(e){var t=[],n=e.getSource().getValue();n&&n.length>0&&(t=[new o("country",sap.ui.model.FilterOperator.Contains,n)]),e.getSource().getParent().getParent().getBinding("items").filter(t,"Application")},onSearchState:function(e){var t=e.getSource().getValue();if(t&&t.length>0)var n=new sap.ui.model.Filter({filters:[new o("state",sap.ui.model.FilterOperator.Contains,t),new o("statecode",sap.ui.model.FilterOperator.Contains,t)]});e.getSource().getParent().getParent().getBinding("items").filter(n,"Application")},onTileDisplayDetails:function(e){this._oPopover?(this._oPopover.bindElement("CountryData>"+e.getSource().oBindingContexts.CountryData.sPath+"/"),this._oPopover.openBy(e.getSource())):(this._oPopover=sap.ui.xmlfragment("com.sap.dinesh.covid19india.dashboard.view.QuickViewCard",this),this.getView().addDependent(this._oPopover),this._oPopover.bindElement("CountryData>"+e.getSource().oBindingContexts.CountryData.sPath+"/"),this._oPopover.openBy(e.getSource()))},handleClosePressed:function(e){this._oPopover.close()},handleClosePressed_oPopoverHelpfulLinks:function(e){this._oPopoverHelpfulLinks.close()},handleCloseMapPressed:function(e){this._oPopoverMap.close()},onExit:function(){this._oPopover&&this._oPopover.destroy(),this._oPopoverHelpfulLinks&&this._oPopoverHelpfulLinks.destroy(),this._oPopoverdIstrictReporting&&this._oPopoverdIstrictReporting.destroy(),this._oPopoverMap&&this._oPopoverMap.destroy()},onHome:function(){window.open("https://indiaagainstcovid19.in/","_self")},dIstrictReporting:function(e){window.open("https://www.mohfw.gov.in/pdf/Districtreporting408.pdf","_blank")},helpLineNumbers:function(e){window.open("https://www.mohfw.gov.in/pdf/coronvavirushelplinenumber.pdf")},helpfulLinks:function(e){this._oPopoverHelpfulLinks?this._oPopoverHelpfulLinks.openBy(e.getSource()):(this._oPopoverHelpfulLinks=sap.ui.xmlfragment("com.sap.dinesh.covid19india.dashboard.view.HelpFullinks",this),this.getView().addDependent(this._oPopoverHelpfulLinks),this._oPopoverHelpfulLinks.openBy(e.getSource()))},openMap:function(e){this.getView().setBusy(!0),this.getRouter().navTo("map")}})});
