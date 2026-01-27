const correctPath = ["SUPPLY", "VARIAC", "A", "W", "LV"];

let selectedNode = null;
let connections = [];
let userConnections = [];
let isConnected = false;

document.querySelectorAll(".node").forEach(node => {
  node.addEventListener("click", () => {
    const nodeId = node.dataset.node;

    if (!selectedNode) {
      selectedNode = nodeId;
      userConnections.push(nodeId);
    } else {
      connections.push([selectedNode, nodeId]);
      drawWire(selectedNode, nodeId);
      selectedNode = null;
    }
  });
});

function drawWire(n1, n2) {
  const svg = document.getElementById("wires");
  const p1 = document.querySelector(`[data-node="${n1}"]`);
  const p2 = document.querySelector(`[data-node="${n2}"]`);

  const rect1 = p1.getBoundingClientRect();
  const rect2 = p2.getBoundingClientRect();
  const labArea = document.querySelector('.lab-area');
  const labRect = labArea.getBoundingClientRect();

  const x1 = rect1.left + rect1.width / 2 - labRect.left;
  const y1 = rect1.top + rect1.height / 2 - labRect.top;
  const x2 = rect2.left + rect2.width / 2 - labRect.left;
  const y2 = rect2.top + rect2.height / 2 - labRect.top;

  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", "black");
  line.setAttribute("stroke-width", "2");

  svg.appendChild(line);
}

function checkConnections() {
  if (JSON.stringify(userConnections) === JSON.stringify(correctPath)) {
    if (!isConnected) {
      isConnected = true;
      enableControls();
      alert("✅ Correct Open Circuit Test Connection");
    } else {
      alert("Already connected!");
    }
  } else {
    alert("❌ Incorrect connection. Follow OC test circuit.");
  }
}

function resetCircuit() {
   connections = [];
   userConnections = [];
   isConnected = false;
   document.getElementById("wires").innerHTML = "";
   disableControls();
}

function enableControls() {
   document.getElementById("voltageSlider").disabled = false;
   document.getElementById("addReadingBtn").disabled = false;
   document.getElementById("submitBtn").disabled = false;
}

function disableControls() {
   document.getElementById("voltageSlider").disabled = true;
   document.getElementById("addReadingBtn").disabled = true;
   document.getElementById("submitBtn").disabled = true;
}

disableControls();

const voltageSlider = document.getElementById("voltageSlider");
const voltageValue = document.getElementById("voltageValue");
const readings = [];

voltageSlider.addEventListener("input", () => {
  const V = voltageSlider.value;
  voltageValue.innerText = `${V} V`;

  document.getElementById("voltmeter").innerText = V;
  document.getElementById("ammeter").innerText = (V / 200).toFixed(2);
  document.getElementById("wattmeter").innerText = (V * 0.5).toFixed(1);
});

function addReading() {
  const voltage = parseFloat(voltageSlider.value);
  const current = parseFloat((voltage / 200).toFixed(2));
  const power = parseFloat((voltage * 0.5).toFixed(1));

  readings.push({ voltage, current, power });

  const table = document.getElementById("tableBody");
  table.innerHTML += `
    <tr>
      <td>${voltage}</td>
      <td>${current}</td>
      <td>${power}</td>
    </tr>
  `;
}

function calculateResults() {
  // Take the LAST (highest voltage) reading
  const lastRow = readings[readings.length - 1];

  const V = lastRow.voltage;
  const I0 = lastRow.current;
  const P = lastRow.power;

  // Core loss resistance
  const Rc = (V * V) / P;

  // Core loss current
  const Iw = P / V;

  // Magnetizing current (CORRECT FORMULA)
  const Im = Math.sqrt((I0 * I0) - (Iw * Iw));

  // Magnetizing reactance
  const Xm = V / Im;

  document.getElementById("results").innerHTML = `
    <h3>Equivalent Circuit Parameters</h3>
    <p><strong>Core Loss Resistance (Rc):</strong> ${Rc.toFixed(2)} Ω</p>
    <p><strong>Magnetizing Reactance (Xm):</strong> ${Xm.toFixed(2)} Ω</p>
  `;
}