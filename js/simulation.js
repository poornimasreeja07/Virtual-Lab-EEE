let ACTIVE_TEST = "OC";

function loadTest(test) {

  ACTIVE_TEST = test;

  document.querySelectorAll(".tabs button")
    .forEach(b => b.classList.remove("active"));

  event.target.classList.add("active");

  if (test === "OC") loadOC();
  if (test === "SC") loadSC();
  if (test === "SUMP") loadSumpnerUI();
}

/* Default load */
window.onload = () => loadOC();

function loadOC() {
  document.getElementById("simulation-area").innerHTML =
    document.getElementById("oc-template").innerHTML;
  initializeOCSC();
}

function loadSC() {
  document.getElementById("simulation-area").innerHTML =
    document.getElementById("sc-template").innerHTML;
  initializeOCSC();
}

function initializeOCSC() {
  // Reset connections
  connections = [];
  document.getElementById("wires").innerHTML = "";
  selectedTerminal = null;
  isDragging = false;
  dragStartTerminal = null;
  tempWire = null;

  // Add terminal event listeners
  document.querySelectorAll(".terminal").forEach(t => {
    t.addEventListener("mousedown", (event) => startDrag(t, event));
    t.addEventListener("click", () => selectTerminal(t));
  });

  const slider = document.getElementById("voltageSlider");
  const voltageText = document.getElementById("voltageValue");

  function enableControls() {
    slider.disabled = false;
    document.getElementById("addReadingBtn").disabled = false;
  }

  slider.addEventListener("input", () => {
    const V = Number(slider.value);
    voltageText.innerText = V + " V";
    updateMeters(V);
  });

  function updateMeters(V) {
    let I, P;

    if (ACTIVE_TEST === "OC") {
      // Working & magnetizing currents
      const Iw = V / INTERNAL.Rc;   // core loss current
      const Im = V / INTERNAL.Xm;   // magnetizing current

      // Total no-load current
      I = Math.sqrt(Iw * Iw + Im * Im);

      // Core loss power
      P = V * Iw;
    } else {
      // Short Circuit
      // Current limited by impedance
      I = V / INTERNAL.Zeq;

      // Copper loss only
      P = I * I * INTERNAL.Req;
    }

    document.getElementById("voltmeter").innerText = V.toFixed(1);
    document.getElementById("ammeter").innerText = I.toFixed(3);
    document.getElementById("wattmeter").innerText = P.toFixed(2);
  }

  function addReading() {
    const table = document.getElementById("tableBody");

    const V = Number(document.getElementById("voltmeter").innerText);
    const I = Number(document.getElementById("ammeter").innerText);
    const P = Number(document.getElementById("wattmeter").innerText);

    const row = table.insertRow();
    row.insertCell(0).innerText = V;
    row.insertCell(1).innerText = I;
    row.insertCell(2).innerText = P;

    document.getElementById("submitBtn").disabled = false;
  }

  // Make functions global or attach to window
  window.enableControls = enableControls;
  window.updateMeters = updateMeters;
  window.addReading = addReading;
}
