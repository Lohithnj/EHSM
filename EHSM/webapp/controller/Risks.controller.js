sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("ehsm.controller.Risks", {
        onInit() {
            this.getRouter().getRoute("risks").attachPatternMatched(this._onRouteMatched, this);
            
            const oRiskModel = new JSONModel();
            this.getView().setModel(oRiskModel, "riskModel");
        },

        _onRouteMatched() {
            // Check if user is logged in
            const oUserModel = this.getOwnerComponent().getModel("user");
            if (!oUserModel.getProperty("/isLoggedIn")) {
                this.getRouter().navTo("login");
                return;
            }

            this._loadRiskData();
        },

        _loadRiskData() {
            const oUserModel = this.getOwnerComponent().getModel("user");
            const sEmployeeId = oUserModel.getProperty("/employeeId");
            const oModel = this.getView().getModel();
            
            const aFilters = [
                new sap.ui.model.Filter("EmployeeId", sap.ui.model.FilterOperator.EQ, sEmployeeId)
            ];

            oModel.read("/RiskSet", {
                filters: aFilters,
                success: (oData) => {
                    const oRiskModel = this.getView().getModel("riskModel");
                    oRiskModel.setData(oData.d || oData);
                },
                error: () => {
                    sap.m.MessageToast.show("Failed to load risk data");
                }
            });
        },

        onRefresh() {
            this._loadRiskData();
        },

        onNavBack() {
            this.getRouter().navTo("dashboard");
        },

        formatSeverityState(sSeverity) {
            switch (sSeverity) {
                case "High":
                    return "Error";
                case "Medium":
                    return "Warning";
                case "Low":
                    return "Success";
                default:
                    return "None";
            }
        },

        getRouter() {
            return this.getOwnerComponent().getRouter();
        }
    });
});