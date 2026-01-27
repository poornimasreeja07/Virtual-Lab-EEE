let selectedSumpnerTerminal = null;
let userConnections = [];

const REQUIRED_SUMP_CONNECTIONS = [
  // Primary side (parallel)
  ["A", "D"],        // Supply → Variac
  ["E", "M1"],       // Variac → LPF wattmeter (M)
  ["L1", "P1"],      // LPF wattmeter → T1 primary
  ["L1", "P1b"],     // LPF wattmeter → T2 primary
  ["P2", "B"],       // Primary return
  ["P2b", "B"],

  // LPF wattmeter connections
  ["C1", "M1"],
  ["V1", "B"],

  // Secondary series opposition
  ["S2", "S2b"],

  // Secondary loop
  ["S1", "H"],       // Ammeter in series
  ["I", "M2"],       // Ammeter → UPF wattmeter
  ["L2", "SW1"],     // UPF wattmeter → SPST
  ["SW2", "S1b"],    // SPST → T2 secondary

  // Voltmeter across SPST
  ["F", "SW1"],
  ["G", "SW2"],

  // UPF wattmeter voltage coil
  ["C2", "SW1"],
  ["V2", "SW2"]
];



window.selectSumpnerTerminal = function(term) {
  if (!selectedSumpnerTerminal) {
    selectedSumpnerTerminal = term;
    term.classList.add("active");
  } else {
    if (term !== selectedSumpnerTerminal) {
      addSumpnerConnection(selectedSumpnerTerminal, term);
    }
    selectedSumpnerTerminal.classList.remove("active");
    selectedSumpnerTerminal = null;
  }
};


function addSumpnerConnection(t1, t2) {
  const a = t1.dataset.id;
  const b = t2.dataset.id;

  if (userConnections.some(c =>
    (c[0] === a && c[1] === b) ||
    (c[0] === b && c[1] === a)
  )) return;

  userConnections.push([a, b]);
  drawSumpnerWire(t1, t2);
}

function drawSumpnerWire(t1, t2) {
  const svg = document.getElementById("wires");

  const r1 = t1.getBoundingClientRect();
  const r2 = t2.getBoundingClientRect();
  const parent = svg.getBoundingClientRect();

  const x1 = r1.left + r1.width / 2 - parent.left;
  const y1 = r1.top + r1.height / 2 - parent.top;
  const x2 = r2.left + r2.width / 2 - parent.left;
  const y2 = r2.top + r2.height / 2 - parent.top;

  const color = getSumpnerWireColor(t1.dataset.id);

  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", color);
  line.setAttribute("stroke-width", "4");
  line.setAttribute("stroke-linecap", "round");
  line.setAttribute("filter", "drop-shadow(0 0 3px rgba(0,123,255,0.5))");

  svg.appendChild(line);
}

function getSumpnerWireColor(id) {
  if (['A', 'B'].includes(id)) return '#dc3545'; // red for supply
  if (['D', 'E'].includes(id)) return '#fd7e14'; // orange for variac
  if (['F', 'G'].includes(id)) return '#007bff'; // blue for voltmeter
  if (['H', 'I'].includes(id)) return '#28a745'; // green for ammeter
  if (['M1', 'C1', 'L1', 'V1'].includes(id)) return '#6f42c1'; // purple for LPF wattmeter
  if (['M2', 'C2', 'L2', 'V2'].includes(id)) return '#e83e8c'; // pink for UPF wattmeter
  if (['P1', 'P2', 'S1', 'S2', 'P1b', 'P2b', 'S1b', 'S2b'].includes(id)) return '#8b4513'; // brown for transformers
  if (['SW1', 'SW2'].includes(id)) return '#17a2b8'; // cyan for switch
  return '#007bff'; // default blue
}

window.undoSumpnerConnection = function() {
  if (userConnections.length > 0) {
    userConnections.pop();
    const svg = document.getElementById("wires");
    // Remove the last wire (line or path)
    for (let i = svg.children.length - 1; i >= 0; i--) {
      const child = svg.children[i];
      if (child.tagName === 'line' || child.tagName === 'path') {
        svg.removeChild(child);
        break;
      }
    }
  }
};

window.resetSumpnerCircuit = function() {
  userConnections = [];
  selectedSumpnerTerminal = null;
  document.getElementById("wires").innerHTML = "";
  document.getElementById("status").innerText = "";
  document.getElementById("voltageSlider").disabled = true;
  document.getElementById("addReadingBtn").disabled = true;
};

window.checkSumpnerConnections = function() {
  const normalize = pair => pair.slice().sort().join("-");

  const required = REQUIRED_SUMP_CONNECTIONS.map(normalize);
  const user = userConnections.map(normalize);

  const missing = required.filter(r => !user.includes(r));

  if (missing.length === 0) {
    alert("✅ Correct Sumpner Test Connections");

    document.getElementById("status").innerText =
      "Connections OK – Apply Voltage";

    document.getElementById("voltageSlider").disabled = false;
    document.getElementById("addReadingBtn").disabled = false;
  } else {
    alert(
      "❌ Incorrect Sumpner Test Connections\n" +
      "Please check series opposition and wattmeter wiring"
    );
  }
};
