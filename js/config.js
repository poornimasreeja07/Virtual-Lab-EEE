/* ===============================
   TERMINAL DEFINITIONS
================================ */

const terminals = {
  A: "MCB Phase",
  B: "MCB Neutral",

  D: "Variac Phase",
  E: "Variac Neutral",

  F: "Voltmeter1 +",
  G: "Voltmeter1 -",

  H: "Ammeter In",
  I: "Ammeter Out",

  M: "Wattmeter Main",
  L: "Wattmeter Load",
  C: "Wattmeter Common",
  V: "Wattmeter Voltage",

  P1: "Transformer Primary 1",
  P2: "Transformer Primary 2",

  S1: "Transformer Secondary 1",
  S2: "Transformer Secondary 2",

  J: "Secondary Voltmeter -",
  K: "Secondary Voltmeter +"
};

let TEST_MODE = "OC";   // "OC" or "SC"

const OC_CONNECTIONS = [
  ["A","D"],
  ["B","E"],
  ["D","F"],
  ["E","G"],
  ["E","I"],
  ["D","P2"],
  ["H","M"],
  ["C","L"],
  ["L","P1"],
  ["V","P2"],
  ["S1","K"],
  ["S2","J"]
];

const SC_CONNECTIONS = [
  ["A","D"],
  ["B","E"],
  ["D","F"],
  ["E","G"],
  ["E","I"],
  ["D","P2"],
  ["H","M"],
  ["C","L"],
  ["L","P1"],
  ["V","P2"],
  ["S1","S2"]
];

/* ===============================
   ELECTRICAL CONSTANTS
================================ */

const ratedVoltage = 230;

const INTERNAL = {
  // From OC test
  Rc: 1400,   // Ω
  Xm: 600,    // Ω

  // From SC physical experiment
  Req: 0.86,  // Ω
  Zeq: 1.41   // Ω
};
