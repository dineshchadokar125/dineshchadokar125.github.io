sap.ui.define(["com/sap/dinesh/covid19india/dashboard/controller/BaseController","sap/ui/model/json/JSONModel","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/core/routing/History","sap/m/MessageToast"],function(e,t,o,i,n,s,a){"use strict";return e.extend("com.sap.dinesh.covid19india.dashboard.controller.Worklist",{onInit:function(){this.getView().setBusy(!0),this.getRouter().getRoute("worklist").attachMatched(this._onRouteMatched,this)},_onRouteMatched:function(){},onNavBack:function(){void 0!==s.getInstance().getPreviousHash()&&history.go(-1)},onPressSetting:function(){},onAfterRendering:function(){var e=new t(this.getOwnerComponent().getModel("my_global_json_model").getData());this.getView().setModel(e),this.getView().setBusy(!1)}})});