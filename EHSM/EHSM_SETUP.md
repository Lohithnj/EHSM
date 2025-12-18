# EHSM Portal Setup and Usage Guide

## Overview
The EHSM (Environmental Health and Safety Management) Portal is a SAP Fiori application designed for Safety Engineers to manage incidents and risks in their plant operations.

## Features
- **Authentication**: Login with Employee ID and Password
- **Dashboard**: Overview of incidents, risks, and key metrics
- **Incident Management**: View, filter, and manage safety incidents
- **Risk Assessment**: Monitor and assess safety risks
- **Profile Management**: View user profile information
- **Enhanced UI**: Modern, responsive design with filtering capabilities

## Backend Configuration
The application is configured to connect to your SAP backend:
- **Service URL**: http://172.17.19.24:8000/sap/opu/odata/sap/ZBL_EHSM_ODATA_SRV/
- **Authentication**: Basic Auth with your credentials
- **Client**: 100

## Installation and Setup

### Prerequisites
- Node.js (LTS version)
- npm or yarn
- SAP Business Application Studio or VS Code with SAP extensions

### Installation Steps
1. Install dependencies:
   ```bash
   npm install
   ```

2. Install additional development dependencies:
   ```bash
   npm install @sap-ux/ui5-middleware-fiori-tools @sap/ux-ui5-fe-mockserver-middleware --save-dev
   ```

### Running the Application

#### Development Mode (Recommended)
```bash
npm run start-dev
```
This will start the application with proxy configuration to handle CORS issues.

#### Standard Mode
```bash
npm start
```

#### Mock Data Mode
```bash
npm run start-mock
```

## Application Structure

### Views and Controllers
- **Login**: Authentication page for Safety Engineers
- **Dashboard**: Main overview with statistics and quick actions
- **Incidents**: Incident management with filtering capabilities
- **Risks**: Risk assessment with filtering options
- **Profile**: User profile information display

### Key Features

#### Authentication
- Employee ID and Password validation
- Session management
- Automatic logout functionality

#### Dashboard
- Total incidents and risks statistics
- Open incidents counter
- High priority items tracking
- Recent incidents display
- Quick navigation to other modules

#### Incident Management
- Filter by Status (Open, In Progress, Closed)
- Filter by Priority (High, Medium, Low)
- Filter by Category (Safety, Environmental, Operational)
- Search functionality
- Sortable table with pagination

#### Risk Assessment
- Filter by Severity (High, Medium, Low)
- Filter by Category (Safety, Environmental, Operational)
- Filter by Likelihood (Likely, Unlikely, Rare)
- Search functionality
- Mitigation measures display

## Test Credentials
Based on your backend response, you can test with:
- **Employee ID**: 1
- **Password**: 1234

## API Endpoints Used
1. **Login**: `/LoginSet(EmployeeId='${id}',Password='${password}')`
2. **Profile**: `/ProfileSet('${employeeId}')`
3. **Incidents**: `/IncidentSet?$filter=EmployeeId eq '${employeeId}'`
4. **Risks**: `/RiskSet?$filter=EmployeeId eq '${employeeId}'`

## Troubleshooting

### CORS Issues
If you encounter CORS issues, use the development mode:
```bash
npm run start-dev
```

### Authentication Issues
- Verify your backend is running on http://172.17.19.24:8000
- Check if the credentials in manifest.json are correct
- Ensure the SAP client is set to 100

### Data Loading Issues
- Verify the OData service is accessible
- Check network connectivity to the backend
- Review browser console for error messages

## Customization
- **Styling**: Modify `/webapp/css/style.css` for UI customization
- **Texts**: Update `/webapp/i18n/i18n.properties` for text changes
- **Backend URL**: Update manifest.json dataSources section

## Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Mobile Support
The application is responsive and supports mobile devices with touch-friendly interface.