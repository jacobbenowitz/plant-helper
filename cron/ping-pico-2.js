const cron = require('node-cron');
const fetch = require('node-fetch');
const Pico2 = require('../models/pico-2');
const validatePico2Input = require('../validations/pico-2');

const pingPico2 = () => {
  cron.schedule('*/2 * * * *', async() => {
    console.log('fetching pico2 data every two minutes');
    const response = await fetch('http://192.168.1.163:80');
    const data = await response.json();
    console.log('data received: ' + JSON.stringify(data));

    const { errors, isValid } = validatePico2Input(data);

    if (!isValid) {
      console.log('Errors in response: ' + JSON.stringify(errors));
    }
    else {
      const newPico2 = new Pico2({
        EnvironmentTemperature: data.EnvironmentTemperature,
        EnvironmentHumidity: data.EnvironmentHumidity,
        EnvironmentLux: data.EnvironmentLux,
        EnvironmentFootcandles: data.EnvironmentFootcandles,
        PicoId: data.PicoId,
      });

      newPico2.save()
        .then(pico2 => console.log('Saved successfully: ', pico2))
        .catch(err => console.log('Error saving: ', err));
    }
  });
};

module.exports = pingPico2;