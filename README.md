# OEE Manufacturing Dashboard

A **freestyle SAP UI5** application for real-time **Overall Equipment Effectiveness (OEE)** monitoring and production management on the shop floor.

## Features

- **OEE Dashboard** — Live KPI tiles for Availability, Speed, Quality & Overall OEE with a stacked bar chart showing shift-wise availability breakdown
- **Report Production** — `sap.ui.table.Table` with inline editing, Value Help dialogs (SearchField + List selection), Reason Code assignment via product catalog, and ComboBox-based comment entry
- **Manage Downtime** — `IconTabBar` filtering across Minor / All / Line Down / Shared / Shift Break / Flow categories with dynamic model switching
- **Report Speed Loss** — Dual-table layout showing speed loss summary and reported details with `ObjectNumber` formatting
- **Manage Order** — Ninja roster with client-side filtering by house (Uchiha / Uzumaki / Hatake) and sorting
- **Dark / Light Theme** — Toggle between `sap_fiori_3` and `sap_fiori_3_dark` with `localStorage` persistence
- **Fragment & Dialog patterns** — Value Help (`SearchField` + suggestion filtering), Table Select Dialog, ComboBox Dialog, Popover navigation, Report Dialog
- **Live Clock** — Real-time clock with proper 12-hour AM/PM formatting

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | SAPUI5 1.106 (Freestyle) |
| Architecture | Component-based MVC with `manifest.json` descriptor |
| Routing | `sap.m.routing.Router` with 6 routes |
| Controls | `sap.tnt.ToolPage`, `sap.ui.table.Table`, `sap.m.Table`, `sap.viz.ui5.controls.VizFrame`, `sap.m.IconTabBar` |
| Data | Local JSON models (no OData) |
| Theming | `sap_fiori_3` / `sap_fiori_3_dark` runtime switching |

## Quick Start

```bash
# Install UI5 CLI (if not installed)
npm install -g @ui5/cli

# Serve locally
ui5 serve -o index.html

# Or via npx
npx @ui5/cli serve -o index.html
```

Open **http://localhost:8080/index.html**

## Project Structure

```
webapp/
├── controller/          # MVC Controllers
│   ├── App.controller.js        # Shell, nav, theme switch, clock
│   ├── Oee.controller.js        # OEE dashboard + value helps
│   ├── Production.controller.js # Production table + dialogs
│   ├── Downtime.controller.js   # Tab filtering + report dialog
│   ├── SpeedLoss.controller.js  # Speed loss data binding
│   └── Manage.controller.js     # Filtering, sorting, mock data
├── view/                # XML Views & Fragments
│   ├── App.view.xml             # ToolPage shell with side nav
│   ├── Oee.view.xml             # KPI tiles + VizFrame chart
│   ├── Production.view.xml      # sap.ui.table with value helps
│   ├── Downtime.view.xml        # IconTabBar + responsive table
│   ├── SpeedLoss.view.xml       # Dual tables
│   ├── Manage.view.xml          # Filterable order table
│   ├── first/second/third.fragment.xml  # Value Help dialogs
│   ├── Assign.fragment.xml      # Product select dialog
│   ├── Add.fragment.xml         # Country ComboBox dialog
│   ├── report.fragment.xml      # Downtime report dialog
│   └── Printing.fragment.xml    # Quick nav popover
├── module/              # JSON data models
├── css/style.css        # Theme-compatible styles + KPI tiles
├── formatter/Formatter.js
├── i18n/i18n.properties
├── Component.js
├── manifest.json
└── index.html
```

## Author

**Mukul Verma** — SAP UI5 / Fiori Developer
