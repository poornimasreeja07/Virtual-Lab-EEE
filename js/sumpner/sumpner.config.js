const SUMP_CONFIG = {
  testName: "Sumpner (Back-to-Back Test)",

  supply: {
    voltage: 230,
    frequency: 50
  },

  transformer: {
    rating_kVA: 2,
    primaryVoltage: 230,
    secondaryVoltage: 230,
    ratedCurrent: 8.7
  },

  wattmeters: {
    LPF: {
      voltage: 300,
      current: 2,
      cosphi: 0.2,
      constant: 4   // K1
    },
    UPF: {
      voltage: 75,
      current: 10,
      cosphi: 1,
      constant: 1   // K2
    }
  },

  efficiency: {
    loadFactor: 0.5,
    powerFactor: 0.8
  }
};
