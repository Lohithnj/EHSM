sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("ehsm.controller.Incidents", {
        onInit() {
            this.getRouter().getRoute("incidents").attachPatternMatched(this._onRouteMatched, this);
            
            const oIncidentModel = new JSONModel();
            this.getView().setModel(oIncidentModel, "incidentModel");
        },

        _onRouteMatched() {
            // Check if user is logged in
            const oUserModel = this.getOwnerComponent().getModel("user");
            if (!oUserModel.getProperty("/isLoggedIn")) {
                this.getRouter().navTo("login");
                return;
            }

            this._loadIncidentData();
        },

        _loadIncidentData() {
            const oUserModel = this.getOwnerComponent().getModel("user");
            const sEmployeeId = oUserModel.getProperty("/employeeId");
            const oModel = this.getView().getModel();
            
            const aFilters = [
                new sap.ui.model.Filter("EmployeeId", sap.ui.model.FilterOperator.EQ, sEmployeeId)
            ];

            oModel.read("/IncidentSet", {
                filters: aFilters,
                success: (oData) => {
                    const oIncidentModel = this.getView().getModel("incidentModel");
                    oIncidentModel.setData(oData.d || oData);
                },
                error: () => {
                    sap.m.MessageToast.show("Failed to load incident data");
                }
            });
        },

        onRefresh() {
            this._loadIncidentData();
        },

        onNavBack() {
            this.getRouter().navTo("dashboard");
        },

        formatPriorityState(sPriority) {
            switch (sPriority) {
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

        formatStatusState(sStatus) {
            switch (sStatus) {
                case "Open":
                    return "Error";
                case "In Progress":
                    return "Warning";
                case "Closed":
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