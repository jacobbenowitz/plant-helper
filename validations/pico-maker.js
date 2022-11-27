const validText = require('./valid-text');

module.exports = function validatePicoMakerInput(data) {
  let errors = {};

  data.EnvironmentTemperature = validText(data.EnvironmentTemperature) ? 
    JSON.parse(data.EnvironmentTemperature) : 0;

  data.EnvironmentHumidity = validText(data.EnvironmentHumidity) ? 
    JSON.parse(data.EnvironmentHumidity) : 0;

  data.EnvironmentPressure = validText(data.EnvironmentPressure) ? 
    JSON.parse(data.EnvironmentPressure) : 0;

  data.EnvironmentLux = validText(data.EnvironmentLux) ? 
    JSON.parse(data.EnvironmentLux) : 0;

  data.EnvironmentFootcandles = validText(data.EnvironmentFootcandles) ? 
    JSON.parse(data.EnvironmentFootcandles) : 0;

  data.SoilTemperature = validText(data.SoilTemperature) ? 
    JSON.parse(data.SoilTemperature) : 0;

  data.SoilMoisture = validText(data.SoilMoisture) ? 
    JSON.parse(data.SoilMoisture) : 0;

  if (data.EnvironmentTemperature === 0) {
    errors.EnvironmentTemperature = 'EnvironmentTemperature is not a number or reading is 0';
  }

  if (data.EnvironmentHumidity === 0) {
    errors.EnvironmentHumidity = 'EnvironmentHumidity is not a number or reading is 0';
  }

  if (data.EnvironmentPressure === 0) {
    errors.EnvironmentPressure = 'EnvironmentPressure is not a number or reading is 0';
  }

  if (data.EnvironmentLux === 0) {
    errors.EnvironmentLux = 'EnvironmentLux is not a number or reading is 0';
  }

  if (data.EnvironmentFootcandles === 0) {
    errors.EnvironmentFootcandles = 'EnvironmentFootcandles is not a number or reading is 0';
  }

  if (data.SoilTemperature === 0) {
    errors.SoilTemperature = 'SoilTemperature is not a number or reading is 0';
  }

  if (data.SoilMoisture === 0) {
    errors.SoilMoisture = 'SoilMoisture is not a number or reading is 0';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
};