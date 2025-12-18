sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], (Controller, JSONModel, MessageToast) => {
    "use strict";

    return Controller.extend("ehsm.controller.Login", {
        onInit() {
            const oLoginModel = new JSONModel({
                employeeId: "",
                password: ""
            });
            this.getView().setModel(oLoginModel, "loginModel");
        },

        onLogin() {
            const oLoginModel = this.getView().getModel("loginModel");
            const sEmployeeId = oLoginModel.getProperty("/employeeId");
            const sPassword = oLoginModel.getProperty("/password");

            if (!sEmployeeId || !sPassword) {
                this._showMessage("Please enter both Employee ID and Password", "Error");
                return;
            }

            this._authenticateUser(sEmployeeId, sPassword);
        },

        _authenticateUser(sEmployeeId, sPassword) {
            const oModel = this.getView().getModel();
            const sPath = `/LoginSet(EmployeeId='${sEmployeeId}',Password='${sPassword}')`;

            oModel.read(sPath, {
                success: (oData) => {
                    if (oData.Status === "Success") {
                        const oUserModel = this.getOwnerComponent().getModel("user");
                        oUserModel.setProperty("/isLoggedIn", true);
                        oUserModel.setProperty("/employeeId", oData.EmployeeId);

                        MessageToast.show("Login successful!");
                        this.getRouter().navTo("dashboard");
                    } else {
                        this._showMessage("Invalid credentials", "Error");
                    }
                },
                error: () => {
                    this._showMessage("Login failed. Please try again.", "Error");
                }
            });
        },

        _showMessage(sMessage, sType) {
            const oMessageStrip = this.byId("loginMessage");
            oMessageStrip.setText(sMessage);
            oMessageStrip.setType(sType);
            oMessageStrip.setVisible(true);
        },

        getRouter() {
            return this.getOwnerComponent().getRouter();
        }
    });
});