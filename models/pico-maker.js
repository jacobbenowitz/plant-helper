const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PicoMakerSchema = new Schema({
  EnvironmentTemperature: {
    type: Number,
    required: false
  },
  EnvironmentHumidity: {
    type: Number,
    required: false
  },
  EnvironmentPressure: {
    type: Number,
    required: false
  },
  EnvironmentLux: {
    type: Number,
    required: false
  },
  EnvironmentFootcandles: {
    type: Number,
    required: false
  },
  SoilTemperature: {
    type: Number,
    required: false
  },
  SoilMoisture: {
    type: Number,
    required: false
  },
}, {
  timestamps: true
});

module.exports = PicoMaker = mongoose.model('PicoMaker', PicoMakerSchema);