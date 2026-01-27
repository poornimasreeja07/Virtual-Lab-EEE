function loadSumpnerUI() {
  const template = `
  <div id="panel">

    <!-- SUPPLY -->
    <div class="box supply">
      <img src="assets/supply.png" draggable="false">
      <div class="terminal" data-id="A">A</div>
      <div class="terminal" data-id="B">B</div>
    </div>

    <!-- METERS -->
    <div class="box meters">
      <div class="meter">
        <h4>Voltmeter</h4>
        <img src="assets/voltmeter.png" draggable="false">
        <div class="terminal" data-id="F">F</div>
        <div class="terminal" data-id="G">G</div>
      </div>

      <div class="meter">
        <h4>Ammeter</h4>
        <img src="assets/ammeter.png" draggable="false">
        <div class="terminal" data-id="H">H</div>
        <div class="terminal" data-id="I">I</div>
      </div>

      <!-- LPF WATTMETER -->
      <div class="meter">
        <h4>LPF Wattmeter</h4>
        <img src="assets/wattmeter.png" draggable="false">
        <div class="terminal" data-id="M1">M1</div>
        <div class="terminal" data-id="C1">C1</div>
        <div class="terminal" data-id="L1">L1</div>
        <div class="terminal" data-id="V1">V1</div>
      </div>

      <!-- UPF WATTMETER -->
      <div class="meter">
        <h4>UPF Wattmeter</h4>
        <img src="assets/wattmeter.png" draggable="false">
        <div class="terminal" data-id="M2">M2</div>
        <div class="terminal" data-id="C2">C2</div>
        <div class="terminal" data-id="L2">L2</div>
        <div class="terminal" data-id="V2">V2</div>
      </div>
    </div>
    
    <!-- AUTOTRANSFORMER -->
    <div class="box variac">
      <img src="assets/variac.png" draggable="false">
      <div class="terminal" data-id="D">D</div>
      <div class="terminal" data-id="E">E</div>
    </div>

    <!-- SPST SWITCH -->
    <div class="box switch">
      <h4>SPST Switch</h4>
      <img src="assets/switch.png" draggable="false">
      <div class="terminal" data-id="SW1">SW1</div>
      <div class="terminal" data-id="SW2">SW2</div>
    </div>

    <!-- TRANSFORMER 1 -->
    <div class="box transformer t1">
      <h4>Transformer 1</h4>
      <img src="assets/transformer.png" draggable="false">
      <div class="terminal" data-id="P1">P1</div>
      <div class="terminal" data-id="P2">P2</div>
      <div class="terminal" data-id="S1">S1</div>
      <div class="terminal" data-id="S2">S2</div>
    </div>

    <!-- TRANSFORMER 2 -->
    <div class="box transformer t2">
      <h4>Transformer 2</h4>
      <img src="assets/transformer.png" draggable="false">
      <div class="terminal" data-id="P1b">P1b</div>
      <div class="terminal" data-id="P2b">P2b</div>
      <div class="terminal" data-id="S1b">S1b</div>
      <div class="terminal" data-id="S2b">S2b</div>
    </div>

    <svg id="wires"></svg>
  </div>

  <button onclick="window.checkSumpnerConnections()" class="check-btn">Check Connections</button>
  <button onclick="window.undoSumpnerConnection()" class="undo-btn">Undo Last Connection</button>
  <button onclick="window.resetSumpnerCircuit()" class="reset-btn">Reset</button>
  <p id="status" class="status-msg"></p>

  <div class="controls">
    <label>Voltage</label>
    <input type="range" id="voltageSlider" min="0" max="270" disabled
           oninput="updateSumpnerReadings(this.value)">
    <span id="voltageValue">0 V</span>

    <p>Voltmeter: <span id="voltmeter">0</span> V</p>
    <p>Ammeter: <span id="ammeter">0</span> A</p>
    <p>LPF Wattmeter: <span id="lpfWattmeter">0</span> W</p>
    <p>UPF Wattmeter: <span id="upfWattmeter">0</span> W</p>

    <button onclick="addSumpnerReading()" disabled id="addReadingBtn">Add Reading</button>
  </div>

  <table>
    <thead>
      <tr>
        <th>Vsc (V)</th>
        <th>Isc (A)</th>
        <th>Iron Loss (W)</th>
        <th>Copper Loss (W)</th>
        <th>Efficiency (%)</th>
      </tr>
    </thead>
    <tbody id="tableBody"></tbody>
  </table>
  `;

  document.getElementById("simulation-area").innerHTML = template;

  // Add terminal event listeners
  document.querySelectorAll(".terminal").forEach(t => {
    t.addEventListener("click", () => selectSumpnerTerminal(t));
  });
}
