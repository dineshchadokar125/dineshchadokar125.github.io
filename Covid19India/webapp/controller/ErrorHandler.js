sap.ui.define(["sap/ui/base/Object","sap/m/MessageBox"],function(e,s){"use strict";return e.extend("com.sap.dinesh.covid19india.dashboard.controller.ErrorHandler",{constructor:function(e){this._oResourceBundle=e.getModel("i18n").getResourceBundle(),this._oComponent=e,this._oModel=e.getModel(),this._bMessageOpen=!1,this._sErrorText=this._oResourceBundle.getText("errorText")},_showMetadataError:function(e){s.error(this._sErrorText,{id:"metadataErrorMessageBox",details:e,styleClass:this._oComponent.getContentDensityClass(),actions:[s.Action.RETRY,s.Action.CLOSE],onClose:function(e){e===s.Action.RETRY&&this._oModel.refreshMetadata()}.bind(this)})},_showServiceError:function(e){this._bMessageOpen||(this._bMessageOpen=!0,s.error(this._sErrorText,{id:"serviceErrorMessageBox",details:e,styleClass:this._oComponent.getContentDensityClass(),actions:[s.Action.CLOSE],onClose:function(){this._bMessageOpen=!1}.bind(this)}))}})});