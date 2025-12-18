sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel"
], (UIComponent, Device, ODataModel, JSONModel) => {
    "use strict";

    return UIComponent.extend("ehsm.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            UIComponent.prototype.init.apply(this, arguments);

            // Create device model
            const oDeviceModel = new JSONModel(Device);
            oDeviceModel.setDefaultBindingMode("OneWay");
            this.setModel(oDeviceModel, "device");

            // Create user session model
            const oUserModel = new JSONModel({
                isLoggedIn: false,
                employeeId: "",
                userData: {}
            });
            this.setModel(oUserModel, "user");

            // Create OData model with local metadata
            const oODataModel = new ODataModel("/sap/opu/odata/sap/ZBL_EHSM_ODATA_SRV/", {
                defaultBindingMode: "TwoWay",
                defaultCountMode: "Inline",
                useBatch: false,
                json: true,
                loadMetadataAsync: false,
                metadataUrlParams: {
                    "sap-client": "100"
                }
            });
            this.setModel(oODataModel);

            // Initialize router
            this.getRouter().initialize();
        }
    });
});