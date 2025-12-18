sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ehsm.controller.Dashboard", {
        onInit() {
            this.getRouter().getRoute("dashboard").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched() {
            // Check if user is logged in
            const oUserModel = this.getOwnerComponent().getModel("user");
            if (!oUserModel.getProperty("/isLoggedIn")) {
                this.getRouter().navTo("login");
            }
        },

        onIncidentTile() {
            this.getRouter().navTo("incidents");
        },

        onRiskTile() {
            this.getRouter().navTo("risks");
        },

        onProfile() {
            this.getRouter().navTo("profile");
        },

        onLogout() {
            // Clear user session
            const oUserModel = this.getOwnerComponent().getModel("user");
            oUserModel.setProperty("/isLoggedIn", false);
            oUserModel.setProperty("/employeeId", "");
            oUserModel.setProperty("/userData", {});

            this.getRouter().navTo("login");
        },

        getRouter() {
            return this.getOwnerComponent().getRouter();
        }
    });
});