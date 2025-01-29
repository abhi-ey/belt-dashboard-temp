# Map Page Codebase README

## Overview
This codebase implements a React-based map visualization for conveyor belt monitoring in Rio Tinto's Pilbara region. It uses **MapLibre GL** for 3D map rendering, with integrated metadata and functionality for a user-friendly experience. The application is designed to assist maintenance engineers by visualizing belt data, statuses, and associated metadata.

---

## Features

- **Interactive Map**:
  - Utilizes MapLibre GL for smooth rendering and 3D map effects.
  - Displays markers for each conveyor belt with metadata.

- **Metadata Display**:
  - Shows details such as belt status, flow rate, load capacity, and efficiency through interactive popups.

- **Navigation Controls**:
  - Allows zooming, panning, and rotating for improved user interaction.

- **Sidebar Integration**:
  - Includes a sidebar component to toggle additional functionality.

---

## Tech Stack

- **Frontend**: React.js
- **Map Library**: MapLibre GL
- **Styling**: CSS (via inline styles and `maplibre-gl` default styles)

---

## Project Structure

```
project/
├── src/
│   ├── components/
│   │   ├── MapPage.js       # Main map component
│   │   ├── Sidebar.js       # Sidebar component (toggleable)
│   │   ├── LRGraph.js
│   │   ├── PredictiveAnalysis.js
│   │   ├── AnalyticsActions.js
│   │   ├── AnalyticsFilter.js
│   │   ├── BeltMetaDataSection.js
│   ├── pages/
│   │   ├── Dashboard.js
│   │   ├── Analytics.js       # Main map component
│   │   ├── Maintenance.js       # Main map component
│   │   ├── MapPage.js       # Main map component
│   │   ├── Reports.js       # Main map component
│   │   ├── About.js       # Main map component
│   ├── styles/
│   │   └── map.css          # Additional styling for the map
│   ├── App.js               # Entry point for the React app
│   ├── index.js             # Main React DOM render
│   └── assets/              # Icons and images for markers
└── README.md                # Documentation (this file)
```

---

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (>= 14.x)
- npm (>= 6.x)

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open the app in your browser at `http://localhost:3000`.

---

## Usage

### Key Files
- **MapPage.js**:
  - Implements the map visualization.
  - Populates belt data using a combination of static metadata and dynamic markers.

- **Sidebar.js**:
  - Provides toggleable functionality for additional information or settings.

### Configuration
- **MapTiler API Key**:
  Replace `YOUR_MAPTILER_API_KEY` in `MapPage.js` with a valid API key from [MapTiler](https://www.maptiler.com/).

---

## Customization

### Adding New Belts
1. Open `MapPage.js`.
2. Add a new entry to the `belts` array:
   ```javascript
   {
     id: 6,
     name: 'New Belt Name',
     position: [latitude, longitude],
   }
   ```
3. Update the `beltMetadata` object with corresponding metadata:
   ```javascript
   'New Belt Name': {
     status: 'Active',
     flowRate: '400 kg/s',
     loadCapacity: '1500 kg',
     efficiency: '90%',
     location: 'New Location, WA',
   }
   ```

### Styling Changes
- Modify `map.css` or inline styles in `MapPage.js` to adjust the map's appearance.
- Add custom icons for markers in the `assets/` directory and update the marker initialization code in `MapPage.js`.

---

## Future Improvements

- **Dynamic Data Loading**: Integrate with a backend API to fetch belt data in real-time.
- **User Authentication**: Secure access to the map and metadata.
- **Enhanced Visualization**: Add heatmaps or other layers for better data representation.
- **Performance Optimization**: Handle large-scale datasets efficiently.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## Acknowledgments

- **MapLibre GL**: For providing the map rendering library.
- **MapTiler**: For map tiles and API support.

Feel free to reach out for any questions or contributions!
