# Virtual Lab - Single Phase Transformer Testing Simulation

A comprehensive virtual laboratory simulation for conducting transformer tests including Open Circuit Test, Short Circuit Test, and Sumpner's (Back-to-Back) Test on single-phase transformers.

![Virtual Lab Simulation](https://img.shields.io/badge/Status-Active-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Project Structure](#project-structure)
5. [File Descriptions](#file-descriptions)
6. [How It Works](#how-it-works)
7. [Transformer Tests Explained](#transformer-tests-explained)
8. [Getting Started](#getting-started)
9. [Usage Guide](#usage-guide)
10. [Calculations](#calculations)
11. [Technical Details](#technical-details)

---

## 🎯 Project Overview

This Virtual Lab Simulation is an educational web application designed to simulate laboratory experiments for testing single-phase transformers. It provides an interactive interface where users can:

- Connect circuit components by clicking on terminals
- Verify their connections against correct circuit configurations
- Simulate voltage adjustments using a variac (autotransformer)
- Take readings from virtual instruments (voltmeter, ammeter, wattmeter)
- Calculate equivalent circuit parameters from test data

### Supported Tests

| Test                        | Purpose                                                               | Calculated Parameters                                                               |
| --------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **Open Circuit (OC) Test**  | Determine core losses and shunt branch parameters                     | Rc (Core Loss Resistance), Xm (Magnetizing Reactance)                               |
| **Short Circuit (SC) Test** | Determine copper losses and series branch parameters                  | Req (Equivalent Resistance), Zeq (Equivalent Impedance), Xeq (Equivalent Reactance) |
| **Sumpner's Test**          | Determine iron losses, copper losses, and efficiency at various loads | Iron Loss, Copper Loss, Efficiency %                                                |

---

## ✨ Features

### Interactive Circuit Building

- **Drag-and-Drop Wire Connection**: Click on terminal points to create wire connections between components
- **Real-time Wire Visualization**: SVG-based wire rendering with color-coded wires
- **Connection Validation**: Automatic checking of circuit connections against correct configurations
- **Undo/Reset Functions**: Ability to undo last connection or reset entire circuit

### Virtual Instruments

- **Voltmeter**: Measures voltage across components
- **Ammeter**: Measures current flow in the circuit
- **Wattmeter**: Measures power consumption (both LPF and UPF types for Sumpner's test)
- **Variac (Autotransformer)**: Adjustable voltage source for simulation

### Simulation Controls

- **Voltage Slider**: Real-time voltage adjustment (0-230V for OC/SC, 0-270V for Sumpner)
- **Live Meter Readings**: Instruments update in real-time as voltage changes
- **Reading Table**: Store multiple readings during a test session
- **Automatic Calculations**: Compute equivalent circuit parameters from readings

### Educational Content

- **Theory Sections**: Detailed explanation of each test procedure
- **Step-by-Step Procedures**: Clear instructions for conducting each test
- **Transformer Specifications**: Complete rating information for the test transformers

---

## 🛠 Technologies Used

| Technology            | Purpose                             | Version |
| --------------------- | ----------------------------------- | ------- |
| **HTML5**             | Page structure and templates        | Latest  |
| **CSS3**              | Styling and visual design           | Latest  |
| **JavaScript (ES6+)** | Interactivity and calculations      | ES6+    |
| **SVG**               | Vector graphics for circuit diagram | Native  |
| **Vanilla JS**        | No framework dependencies           | -       |

### External Resources (Images)

The application uses PNG images for electrical components:

- `supply.png` - AC Power Supply
- `voltmeter.png` - Voltmeter instrument
- `ammeter.png` - Ammeter instrument
- `wattmeter.png` - Wattmeter instrument
- `variac.png` - Autotransformer
- `transformer.png` - Single-phase transformer
- `switch.png` - SPST Switch

---

## 📁 Project Structure

```
VirtualLab/
├── index.html                  # Main landing page with theory content
├── simulation.html            # Interactive simulation interface
├── script.js                  # Legacy script (unused in current version)
├── style.css                  # Main stylesheet for index.html
│
├── css/
│   ├── simulation.css         # Main simulation interface styles
│   └── sumpner.css            # Sumpner test specific styles
│
├── js/
│   ├── config.js              # Terminal definitions and test configurations
│   ├── circuit.js             # Circuit connection logic and wire drawing
│   ├── calculations.js        # Parameter calculation functions
│   ├── simulation.js          # Main simulation controller
│   ├── script.js              # Test mode switching logic
│   │
│   └── sumpner/
│       ├── sumpner.config.js # Sumpner test configuration
│       ├── sumpner.circuit.js# Sumpner circuit connection logic
│       ├── sumpner.calc.js   # Sumpner test calculations
│       └── sumpner.ui.js     # Sumpner test UI template
│
└── assets/
    ├── ammeter.png            # Ammeter image (6.5 MB)
    ├── supply.png             # Power supply image (5.7 MB)
    ├── switch.png             # SPST switch image (5.7 MB)
    ├── transformer.png         # Transformer image (6.8 MB)
    ├── variac.png             # Autotransformer image (5.4 MB)
    ├── voltmeter.png          # Voltmeter image (5.6 MB)
    ├── wattmeter.png          # Wattmeter image (6.6 MB)
    │
    └── images/
        └── tranformer.svg     # SVG transformer diagram (for reference)
```

---

## 📝 File Descriptions

### Root Level Files

#### [`index.html`](index.html)

The main landing page containing:

- Theory and explanation of all three transformer tests
- Step-by-step procedures for each test
- Transformer rating tables
- Navigation button to simulation

**Key Sections:**

- Open Circuit Test (Section 1a)
- Short Circuit Test (Section 1b)
- Sumpner's Test (Section 2)
- Transformer specifications table

#### [`simulation.html`](simulation.html)

The interactive simulation interface containing:

- Tab navigation for switching between tests
- HTML templates for each test (OC, SC, Sumpner)
- Component layout with terminals
- Control buttons and reading tables

**Templates Included:**

- `oc-template` - Open Circuit test layout
- `sc-template` - Short Circuit test layout

#### [`script.js`](script.js) (Legacy)

Old implementation file - not used in current version.

#### [`style.css`](style.css)

Main stylesheet for the index.html page:

- Table styling
- Button styling
- General page layout

---

### CSS Directory

#### [`css/simulation.css`](css/simulation.css)

Main styling for the simulation interface:

| Element     | Description                                 |
| ----------- | ------------------------------------------- |
| `#panel`    | Main circuit drawing area (1000x600px)      |
| `.box`      | Component containers with positioning       |
| `.terminal` | Clickable connection points (circular, red) |
| `.controls` | Voltage slider and buttons container        |
| `.tabs`     | Test selection tab buttons                  |
| Wire colors | Color-coded by component type               |

**Wire Color Coding:**

- 🔴 Red: Supply (A, B)
- 🟠 Orange: Variac (D, E)
- 🔵 Blue: Voltmeter 1 (F, G)
- 🟢 Green: Ammeter (H, I)
- 🟣 Purple: Wattmeter (M, C, L, V)
- 🟤 Brown: Transformer (P1, P2, S1, S2)
- Cyan: Secondary Voltmeter (J, K)

#### [`css/sumpner.css`](css/sumpner.css)

Specific styles for Sumpner's test layout:

- Two transformer positioning (T1 and T2)
- SPST switch positioning
- Expanded meters section with 4 instruments

---

### JavaScript Directory

#### [`js/config.js`](js/config.js)

Configuration file containing:

**Terminal Definitions:**

```javascript
const terminals = {
  A: "MCB Phase",
  B: "MCB Neutral",
  D: "Variac Phase",
  E: "Variac Neutral",
  F: "Voltmeter1 +",
  // ... etc
};
```

**Connection Maps:**

- `OC_CONNECTIONS`: Array of terminal pairs for correct OC test wiring
- `SC_CONNECTIONS`: Array of terminal pairs for correct SC test wiring

**Electrical Constants:**

```javascript
const INTERNAL = {
  Rc: 1400, // Core loss resistance (Ω)
  Xm: 600, // Magnetizing reactance (Ω)
  Req: 0.86, // Equivalent resistance (Ω)
  Zeq: 1.41, // Equivalent impedance (Ω)
};
```

#### [`js/circuit.js`](js/circuit.js)

Handles interactive wire connections:

| Function             | Purpose                                     |
| -------------------- | ------------------------------------------- |
| `startDrag()`        | Initiates wire drawing from terminal        |
| `dragWire()`         | Updates temporary wire position during drag |
| `endDrag()`          | Completes wire connection on mouse release  |
| `selectTerminal()`   | Alternative click-to-connect method         |
| `addConnection()`    | Adds connection to array                    |
| `drawWire()`         | Renders permanent SVG wire                  |
| `getWireColor()`     | Returns color based on terminal type        |
| `checkConnections()` | Validates user connections                  |
| `undoConnection()`   | Removes last connection                     |
| `resetCircuit()`     | Clears all connections                      |

#### [`js/calculations.js`](js/calculations.js)

Computes transformer equivalent circuit parameters:

**Open Circuit Test Calculations:**

- Rc = V² / P (Core Loss Resistance)
- Iw = P / V (Core Loss Current)
- Im = √(I² - Iw²) (Magnetizing Current)
- Xm = V / Im (Magnetizing Reactance)

**Short Circuit Test Calculations:**

- Z = V / I (Equivalent Impedance)
- Req = P / I² (Equivalent Resistance)
- Xeq = √(Z² - Req²) (Equivalent Reactance)

#### [`js/simulation.js`](js/simulation.js)

Main simulation controller:

| Function           | Purpose                                |
| ------------------ | -------------------------------------- |
| `loadTest()`       | Switches between OC/SC/Sumpner tests   |
| `loadOC()`         | Loads Open Circuit test template       |
| `loadSC()`         | Loads Short Circuit test template      |
| `initializeOCSC()` | Sets up event listeners and controls   |
| `updateMeters()`   | Calculates and displays meter readings |

**Meter Reading Formulas:**

_For OC Test:_

```javascript
Iw = V / INTERNAL.Rc; // Core loss current
Im = V / INTERNAL.Xm; // Magnetizing current
I = Math.sqrt(Iw * Iw + Im * Im); // Total no-load current
P = V * Iw; // Core loss power
```

_For SC Test:_

```javascript
I = V / INTERNAL.Zeq; // Short circuit current
P = I * I * INTERNAL.Req; // Copper loss
```

#### [`js/script.js`](js/script.js)

Test mode switching utilities:

- `setTestMode()` - Switch between OC and SC modes

---

### Sumpner Test Subdirectory

#### [`js/sumpner/sumpner.config.js`](js/sumpner/sumpner.config.js)

Sumpner test configuration:

```javascript
const SUMP_CONFIG = {
  testName: "Sumpner (Back-to-Back Test)",
  supply: { voltage: 230, frequency: 50 },
  transformer: {
    rating_kVA: 2,
    primaryVoltage: 230,
    secondaryVoltage: 230,
    ratedCurrent: 8.7,
  },
  wattmeters: {
    LPF: { voltage: 300, current: 2, cosphi: 0.2, constant: 4 },
    UPF: { voltage: 75, current: 10, cosphi: 1, constant: 1 },
  },
  efficiency: { loadFactor: 0.5, powerFactor: 0.8 },
};
```

#### [`js/sumpner/sumpner.circuit.js`](js/sumpner/sumpner.circuit.js)

Sumpner test circuit connection handling:

**Key Functions:**

- `selectSumpnerTerminal()` - Terminal selection for Sumpner
- `addSumpnerConnection()` - Add connection between terminals
- `drawSumpnerWire()` - Draw SVG wire with Sumpner-specific colors
- `getSumpnerWireColor()` - Color coding for Sumpner components
- `checkSumpnerConnections()` - Validate Sumpner circuit
- `undoSumpnerConnection()` - Undo last Sumpner connection
- `resetSumpnerCircuit()` - Reset Sumpner circuit

**Sumpner Wire Colors:**

- Pink: UPF Wattmeter (M2, C2, L2, V2)
- Purple: LPF Wattmeter (M1, C1, L1, V1)

#### [`js/sumpner/sumpner.calc.js`](js/sumpner/sumpner.calc.js)

Sumpner test calculations:

```javascript
function updateSumpnerReadings(V) {
  // Circulating current calculation
  Isc = (V / 12.3) * Ir;

  // Iron loss (constant)
  ironLoss = WR1 * LPF_constant;

  // Copper loss (proportional to I²)
  copperLoss = WR2 * (Isc/Ir)² * UPF_constant;
}

function addSumpnerReading() {
  // Efficiency calculation
  output = loadFactor * VA * powerFactor;
  input = output + ironLoss + (loadFactor² * copperLoss);
  efficiency = (output / input) * 100;
}
```

#### [`js/sumpner/sumpner.ui.js`](js/sumpner/sumpner.ui.js)

Generates the Sumpner test UI:

**Components Displayed:**

- AC Supply
- Voltmeter
- Ammeter
- LPF Wattmeter (measures iron loss)
- UPF Wattmeter (measures copper loss)
- Variac (Autotransformer)
- SPST Switch
- Transformer 1 (Primary + Secondary)
- Transformer 2 (Primary + Secondary)

---

## 🔄 How It Works

### Application Flow

```
┌─────────────────┐
│   index.html    │  ← User reads theory and procedures
└────────┬────────┘
         │ Click "Start Simulation"
         ▼
┌─────────────────┐
│ simulation.html │  ← Main simulation interface
└────────┬────────┘
         │
    ┌────┴────┬─────────┐
    ▼          ▼         ▼
┌───────┐ ┌───────┐ ┌────────┐
│  OC   │ │  SC   │ │Sumpner │
│ Test  │ │ Test  │ │  Test  │
└───┬───┘ └───┬───┘ └────┬───┘
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
┌──────────────────────────────────────┐
│         USER ACTIONS:                │
│  1. Click terminals to connect       │
│  2. Click "Check Connections"        │
│  3. Adjust voltage slider            │
│  4. Click "Add Reading"              │
│  5. Click "Submit" to calculate      │
└──────────────────────────────────────┘
```

### Connection System

1. **Terminal Selection**: User clicks a terminal to start a connection
2. **Wire Drawing**:
   - Click method: Click second terminal to complete
   - Drag method: Drag from first to second terminal
3. **Validation**: System checks if all required connections exist
4. **Enable Controls**: If correct, voltage slider becomes active

### Real-time Simulation

When voltage slider is adjusted:

1. JavaScript calculates corresponding meter readings
2. Using internal transformer parameters (Rc, Xm, Req, Zeq)
3. Updates DOM elements with new values
4. User can add readings to table for analysis

---

## 📖 Transformer Tests Explained

### 1. Open Circuit (OC) Test

**Purpose:** Determine core losses and shunt branch parameters.

**Procedure:**

1. Keep HV (high-voltage) winding open
2. Apply rated voltage to LV (low-voltage) winding via variac
3. Measure voltage (V), current (I), and power (P)
4. Calculate Rc and Xm from readings

**Theory:**

- Secondary is open, so only magnetizing current flows
- Wattmeter reads core (iron) losses
- No copper losses (I = 0 in secondary)

**Calculated Parameters:**

- **Rc** (Core Loss Resistance): Represents iron loss
- **Xm** (Magnetizing Reactance): Represents magnetizing branch

### 2. Short Circuit (SC) Test

**Purpose:** Determine copper losses and series branch parameters.

**Procedure:**

1. Short-circuit the LV winding
2. Apply low voltage to HV winding until rated current flows
3. Measure voltage (V), current (I), and power (P)
4. Calculate Req, Zeq, and Xeq from readings

**Theory:**

- Applied voltage is small, so core flux is negligible
- Iron losses are ignored
- Wattmeter reads copper losses at rated current

**Calculated Parameters:**

- **Zeq** (Equivalent Impedance): Total impedance referred to HV side
- **Req** (Equivalent Resistance): Total resistance referred to HV side
- **Xeq** (Equivalent Reactance): Total reactance referred to HV side

### 3. Sumpner's (Back-to-Back) Test

**Purpose:** Determine iron losses, full-load copper losses, and efficiency.

**Procedure:**

1. Use two identical transformers
2. Connect primaries in parallel across supply
3. Connect secondaries in series opposition
4. Apply rated voltage to primaries
5. Inject voltage in secondary circuit to circulate rated current
6. Measure iron loss (LPF wattmeter) and copper loss (UPF wattmeter)

**Theory:**

- Both transformers operate at rated conditions
- Iron losses measured at rated voltage
- Copper losses measured at rated current
- No external load required

**Calculated Parameters:**

- Iron Loss (per transformer)
- Copper Loss (per transformer)
- Efficiency at various load conditions

---

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Edge, Safari)
- No server required - runs directly from files

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Navigate to simulation via the "Start Simulation" button

### Running the Simulation

```bash
# Option 1: Direct file opening
# Simply double-click index.html

# Option 2: Using a local server (recommended)
# Python 3
python -m http.server 8000

# Then open http://localhost:8000
```

---

## 📖 Usage Guide

### Starting a Test

1. Click on the test tab (Open Circuit / Short Circuit / Sumpner's Test)
2. The circuit diagram will load with all components

### Making Connections

**Method 1: Click-to-Connect**

1. Click on first terminal (becomes highlighted)
2. Click on second terminal
3. Wire is drawn between terminals

**Method 2: Drag-and-Drop**

1. Click and hold on first terminal
2. Drag to second terminal
3. Release to create connection

### Checking Connections

1. Click "Check Connections" button
2. If correct: Alert shows ✅ and controls become active
3. If incorrect: Alert shows ❌ with error message

### Taking Readings

1. Adjust voltage using slider
2. Observe meter readings update in real-time
3. Click "Add Reading" to store in table
4. Repeat for multiple readings at different voltages

### Viewing Results

1. Click "Submit" after taking readings
2. Calculated parameters appear in results section

---

## 🧮 Calculations

### Open Circuit Test

| Parameter | Formula     | Description           |
| --------- | ----------- | --------------------- |
| V         | Measured    | Applied voltage       |
| I         | Measured    | No-load current       |
| P         | Measured    | Core loss power       |
| Iw        | P / V       | Core loss current     |
| Im        | √(I² - Iw²) | Magnetizing current   |
| Rc        | V² / P      | Core loss resistance  |
| Xm        | V / Im      | Magnetizing reactance |

### Short Circuit Test

| Parameter | Formula      | Description           |
| --------- | ------------ | --------------------- |
| V         | Measured     | Short circuit voltage |
| I         | Measured     | Rated current         |
| P         | Measured     | Copper loss           |
| Z         | V / I        | Equivalent impedance  |
| Req       | P / I²       | Equivalent resistance |
| Xeq       | √(Z² - Req²) | Equivalent reactance  |

### Sumpner's Test

| Parameter   | Formula                        | Description          |
| ----------- | ------------------------------ | -------------------- |
| Iron Loss   | Constant (W₁ × K₁)             | Core loss at rated V |
| Copper Loss | (I²/I_rated)² × W₂ × K₂        | Copper loss at load  |
| Output      | LF × VA × cos(φ)               | Power output         |
| Input       | Output + Iron + (LF² × Copper) | Power input          |
| η           | (Output/Input) × 100           | Efficiency %         |

Where:

- LF = Load Factor
- K = Wattmeter constant

---

## 🔧 Technical Details

### Browser Compatibility

| Browser | Minimum Version | Status       |
| ------- | --------------- | ------------ |
| Chrome  | 60+             | ✅ Supported |
| Firefox | 55+             | ✅ Supported |
| Edge    | 79+             | ✅ Supported |
| Safari  | 11+             | ✅ Supported |

### Performance Notes

- Initial load may take time due to large PNG images (~35MB total)
- SVG wires use hardware-accelerated rendering
- Calculations are performed client-side in real-time

### Internal Parameters

These values simulate a real 1kVA transformer:

```javascript
// OC Test Parameters
Rc = 1400 Ω   // Core loss resistance
Xm = 600 Ω    // Magnetizing reactance

// SC Test Parameters
Req = 0.86 Ω  // Equivalent resistance
Zeq = 1.41 Ω  // Equivalent impedance
```

### Transformer Specifications

**For OC/SC Tests:**

- Rating: 1 kVA
- Primary Voltage (HV): 230 V
- Secondary Voltage (LV): 115/110 V
- Frequency: 50 Hz

**For Sumpner's Test:**

- Rating: 2 kVA (each)
- Primary Voltage: 230 V
- Secondary Voltage: 230 V
- Rated Current: 8.7 A

---

## 📱 Responsive Design

The simulation is designed for desktop use with a minimum resolution of 1024x768. The circuit panel has fixed dimensions of 1000x600 pixels.

---

## 🤝 Contributing

This is an educational project. To contribute:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

---

## 📄 License

This project is for educational purposes.

---

## 🙏 Acknowledgments

- Virtual laboratory concept for electrical engineering education
- Interactive circuit simulation techniques

---

**Last Updated:** February 2026
**Version:** 1.0
