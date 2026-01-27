console.log("Transformer Test Simulator Initialized");

document.getElementById("addReadingBtn").disabled = true;
document.getElementById("submitBtn").disabled = true;

function setTestMode(mode) {
  TEST_MODE = mode;
  resetCircuit();

  document.getElementById("results").innerHTML = "";
  document.getElementById("tableBody").innerHTML = "";

  if (mode === "OC") {
    alert("Mode: Open Circuit Test");
  } else {
    alert("Mode: Short Circuit Test");
  }
}