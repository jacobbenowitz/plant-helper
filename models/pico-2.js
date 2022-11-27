const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Pico2Schema = new Schema({
  EnvironmentTemperature: {
    type: Number,
    required: false
  },
  EnvironmentHumidity: {
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
}, {
  timestamps: true
});

module.exports = Pico2 = mongoose.model('Pico2', Pico2Schema);