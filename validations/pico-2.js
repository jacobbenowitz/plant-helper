const validText = require('./valid-text');

module.exports = function validatePico2Input(data) {
  let errors = {};

  // data.EnvironmentTemperature = validText(data.EnvironmentTemperature) ?
  //   JSON.parse(data.EnvironmentTemperature) : 0;

  // data.EnvironmentHumidity = validText(data.EnvironmentHumidity) ?
  //   JSON.parse(data.EnvironmentHumidity) : 0;

  // data.EnvironmentLux = validText(data.EnvironmentLux) ?
  //   JSON.parse(data.EnvironmentLux) : 0;

  // data.EnvironmentFootcandles = validText(data.EnvironmentFootcandles) ?
  //   JSON.parse(data.EnvironmentFootcandles) : 0;

  data.EnvironmentTemperature = typeof data.EnvironmentTemperature === 'number' ? JSON.parse(data.EnvironmentTemperature) : 0;

  data.EnvironmentHumidity = typeof data.EnvironmentHumidity === 'number' ? JSON.parse(data.EnvironmentHumidity) : 0;

  data.EnvironmentLux = typeof data.EnvironmentLux === 'number' ? JSON.parse(data.EnvironmentLux) : 0;

  data.EnvironmentFootcandles = typeof data.EnvironmentFootcandles === 'number' ? JSON.parse(data.EnvironmentFootcandles) : 0;
  
  data.PicoId = validText(data.PicoId) ? data.PicoId : '';

  if (data.EnvironmentTemperature === 0) {
    errors.EnvironmentTemperature = 'EnvironmentTemperature is not a number or reading is 0';
  }

  if (data.EnvironmentHumidity === 0) {
    errors.EnvironmentHumidity = 'EnvironmentHumidity is not a number or reading is 0';
  }

  if (data.EnvironmentLux === 0) {
    errors.EnvironmentLux = 'EnvironmentLux is not a number or reading is 0';
  }

  if (data.EnvironmentFootcandles === 0) {
    errors.EnvironmentFootcandles = 'EnvironmentFootcandles is not a number or reading is 0';
  }

  if (data.PicoId === '') {
    errors.PicoId = 'PicoId is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
};