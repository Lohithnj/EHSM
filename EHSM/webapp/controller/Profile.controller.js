sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("ehsm.controller.Profile", {
        onInit() {
            this.getRouter().getRoute("profile").attachPatternMatched(this._onRouteMatched, this);
            
            const oProfileModel = new JSONModel();
            this.getView().setModel(oProfileModel, "profileModel");
        },

        _onRouteMatched() {
            // Check if user is logged in
            const oUserModel = this.getOwnerComponent().getModel("user");
            if (!oUserModel.getProperty("/isLoggedIn")) {
                this.getRouter().navTo("login");
                return;
            }

            this._loadProfileData();
        },

        _loadProfileData() {
            const oUserModel = this.getOwnerComponent().getModel("user");
            const sEmployeeId = oUserModel.getProperty("/employeeId");
            const oModel = this.getView().getModel();
            const sPath = `/ProfileSet('${sEmployeeId}')`;

            oModel.read(sPath, {
                success: (oData) => {
                    const oProfileModel = this.getView().getModel("profileModel");
                    oProfileModel.setData(oData);
                },
                error: () => {
                    sap.m.MessageToast.show("Failed to load profile data");
                }
            });
        },

        onNavBack() {
            this.getRouter().navTo("dashboard");
        },

        getRouter() {
            return this.getOwnerComponent().getRouter();
        }
    });
});