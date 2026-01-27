function calculateResults() {
  const rows = document.querySelectorAll("#tableBody tr");

  let Vsum=0, Isum=0, Psum=0;

  rows.forEach(r => {
    Vsum += Number(r.cells[0].innerText);
    Isum += Number(r.cells[1].innerText);
    Psum += Number(r.cells[2].innerText);
  });

  const n = rows.length;

  const V = Vsum/n;
  const I = Isum/n;
  const P = Psum/n;

  if (ACTIVE_TEST === "OC") {
    // OC Test
    const Rc = (V * V) / P;
    const Iw = P / V;
    const Im = Math.sqrt(I * I - Iw * Iw);
    const Xm = V / Im;

    if (I <= Iw) {
      document.getElementById("results").innerHTML +=
        "<p style='color:red'>⚠ Invalid readings: Iw ≥ I. Adjust voltage.</p>";
      return;
    }

    document.getElementById("results").innerHTML = `
      <h3>OC Test Parameters</h3>
      <p><b>Rc:</b> ${Rc.toFixed(2)} Ω</p>
      <p><b>Xm:</b> ${Xm.toFixed(2)} Ω</p>
    `;
  } else {
    // SC Test
    const Z = V / I;
    const Req = P / (I * I);
    const diff = Z * Z - Req * Req;
    let Xeq = 0;
    if (diff > 0) {
      Xeq = Math.sqrt(diff);
    } else {
      document.getElementById("results").innerHTML +=
        "<p style='color:red'>⚠ Invalid SC Test data: Req cannot exceed Zeq.</p>";
      return;
    }

    document.getElementById("results").innerHTML = `
      <h3>SC Test Parameters</h3>
      <p><b>Zeq:</b> ${Z.toFixed(2)} Ω</p>
      <p><b>Req:</b> ${Req.toFixed(2)} Ω</p>
      <p><b>Xeq:</b> ${Xeq.toFixed(2)} Ω</p>
    `;
  }
}
