let selectedTerminal = null;
let isDragging = false;
let dragStartTerminal = null;
let tempWire = null;
let connections = [];

document.querySelectorAll(".terminal").forEach(t => {
  t.addEventListener("mousedown", (event) => startDrag(t, event));
  t.addEventListener("click", () => selectTerminal(t));
});

function startDrag(term, event) {
  isDragging = true;
  dragStartTerminal = term;
  term.classList.add("active");

  // Create temporary wire
  const svg = document.getElementById("wires");
  tempWire = document.createElementNS("http://www.w3.org/2000/svg", "line");
  tempWire.setAttribute("stroke", getWireColor(term.dataset.id));
  tempWire.setAttribute("stroke-width", "4");
  tempWire.setAttribute("stroke-linecap", "round");
  tempWire.setAttribute("filter", "drop-shadow(0 0 3px rgba(0,123,255,0.5))");
  svg.appendChild(tempWire);

  document.addEventListener("mousemove", dragWire);
  document.addEventListener("mouseup", endDrag);
}

function dragWire(event) {
  if (!isDragging || !tempWire) return;

  const svg = document.getElementById("wires");
  const rect = svg.getBoundingClientRect();
  const startRect = dragStartTerminal.getBoundingClientRect();

  const x1 = startRect.left + startRect.width / 2 - rect.left;
  const y1 = startRect.top + startRect.height / 2 - rect.top;
  const x2 = event.clientX - rect.left;
  const y2 = event.clientY - rect.top;

  tempWire.setAttribute("x1", x1);
  tempWire.setAttribute("y1", y1);
  tempWire.setAttribute("x2", x2);
  tempWire.setAttribute("y2", y2);
}

function endDrag(event) {
  if (!isDragging) return;

  const target = event.target;
  if (target.classList.contains("terminal") && target !== dragStartTerminal) {
    addConnection(dragStartTerminal, target);
  }

  // Clean up
  if (tempWire) {
    tempWire.remove();
    tempWire = null;
  }
  if (dragStartTerminal) {
    dragStartTerminal.classList.remove("active");
  }
  isDragging = false;
  dragStartTerminal = null;

  document.removeEventListener("mousemove", dragWire);
  document.removeEventListener("mouseup", endDrag);
}

function selectTerminal(term) {
  if (isDragging) return; // Prevent click during drag

  if (!selectedTerminal) {
    selectedTerminal = term;
    term.classList.add("active");
  } else {
    if (term !== selectedTerminal) {
      addConnection(selectedTerminal, term);
    }
    selectedTerminal.classList.remove("active");
    selectedTerminal = null;
  }
}

function addConnection(t1, t2) {
  const a = t1.dataset.id;
  const b = t2.dataset.id;

  if (connections.some(c =>
    (c[0] === a && c[1] === b) ||
    (c[0] === b && c[1] === a)
  )) return;

  connections.push([a, b]);
  drawWire(t1, t2);
}

function getWireColor(id) {
  if (['A', 'B'].includes(id)) return '#dc3545'; // red for supply
  if (['D', 'E'].includes(id)) return '#fd7e14'; // orange for variac
  if (['F', 'G'].includes(id)) return '#007bff'; // blue for voltmeter1
  if (['H', 'I'].includes(id)) return '#28a745'; // green for ammeter
  if (['M', 'C', 'L', 'V'].includes(id)) return '#6f42c1'; // purple for wattmeter
  if (['P1', 'P2', 'S1', 'S2'].includes(id)) return '#8b4513'; // brown for transformer
  if (['J', 'K'].includes(id)) return '#17a2b8'; // cyan for voltmeter2
  return '#007bff'; // default blue
}

function drawWire(t1, t2) {
  const svg = document.getElementById("wires");

  const r1 = t1.getBoundingClientRect();
  const r2 = t2.getBoundingClientRect();
  const parent = svg.getBoundingClientRect();

  const x1 = r1.left + r1.width / 2 - parent.left;
  const y1 = r1.top + r1.height / 2 - parent.top;
  const x2 = r2.left + r2.width / 2 - parent.left;
  const y2 = r2.top + r2.height / 2 - parent.top;

  const color = getWireColor(t1.dataset.id);

  const line = document.createElementNS("http://www.w3.org/2000/svg","line");
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

function getCorrectConnections() {
  return ACTIVE_TEST === "OC" ? OC_CONNECTIONS : SC_CONNECTIONS;
}

function checkConnections() {
  const required = getCorrectConnections();

  const ok = required.every(req =>
    connections.some(c =>
      (c[0] === req[0] && c[1] === req[1]) ||
      (c[1] === req[0] && c[0] === req[1])
    )
  );

  if (ok) {
    alert(`✅ Correct ${ACTIVE_TEST} Test Connections`);
    enableControls();
  } else {
    alert(`❌ Wrong wiring for ${ACTIVE_TEST} Test`);
  }
}

function undoConnection() {
  if (connections.length > 0) {
    connections.pop();
    const svg = document.getElementById("wires");
    if (svg.lastChild) {
      svg.removeChild(svg.lastChild);
    }
  }
}

function resetCircuit() {
  connections = [];
  document.getElementById("wires").innerHTML = "";
}
