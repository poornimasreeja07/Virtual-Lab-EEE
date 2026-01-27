function updateSumpnerReadings(V) {
  V = Number(V);
  document.getElementById("voltageValue").innerText = V + " V";

  const Ir = SUMP_CONFIG.transformer.ratedCurrent;

  // Circulating current (limited to rated)
  let Isc = (V / 12.3) * Ir;
  Isc = Math.min(Isc, Ir);

  // Iron loss – constant
  const WR1 = 14;
  const ironLoss = WR1 * SUMP_CONFIG.wattmeters.LPF.constant; // 56 W

  // Copper loss – ∝ I²
  const WR2 = 180 * Math.pow(Isc / Ir, 2);
  const copperLoss = WR2 * SUMP_CONFIG.wattmeters.UPF.constant;

  document.getElementById("voltmeter").innerText = V.toFixed(2);
  document.getElementById("ammeter").innerText = Isc.toFixed(2);

  document.getElementById("lpfWattmeter").innerText = ironLoss.toFixed(1);
  document.getElementById("upfWattmeter").innerText = copperLoss.toFixed(1);

  window.SUMP_RESULTS = { V, Isc, WR1, WR2, ironLoss, copperLoss };
}

function addSumpnerReading() {
  const r = window.SUMP_RESULTS;
  if (!r) return;

  const x = SUMP_CONFIG.efficiency.loadFactor;
  const cosphi = SUMP_CONFIG.efficiency.powerFactor;
  const Q = 2000; // VA

  // Loss per transformer
  const Wi = r.ironLoss / 2;
  const Wcu = r.copperLoss / 2;

  // Efficiency calculation
  const output = x * Q * cosphi;
  const input = output + Wi + (x * x * Wcu);
  const efficiency = (output / input) * 100;

  const row = `
    <tr>
      <td>${r.V.toFixed(2)}</td>
      <td>${r.Isc.toFixed(2)}</td>
      <td>${r.ironLoss.toFixed(1)}</td>
      <td>${r.copperLoss.toFixed(1)}</td>
      <td>${efficiency.toFixed(2)}%</td>
    </tr>
  `;

  document.getElementById("tableBody").innerHTML += row;
}
