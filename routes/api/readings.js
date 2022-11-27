const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const PicoMaker = require('../../models/pico-maker');
const Pico2 = require('../../models/pico-2');
const validatePico2Input = require('../../validations/pico-2');
const validatePicoMakerInput = require('../../validations/pico-maker');

router.get('/', (req, res) => res.json({ msg: 'This is the readings route' }));

// get PicoMaker readings
router.get('/pico-maker', (req, res) => {
  PicoMaker.find()
    .sort({ date: -1 })
    .then(picoMakerData => res.json(picoMakerData))
    .catch(err => res.status(404).json({ nopicoMakerfound: 'No picoMaker found' }));
});

// get Pico2 readings
router.get('/pico-2', (req, res) => {
  Pico2.find()
    .sort({ date: -1 })
    .then(pico2 => res.json(pico2))
    .catch(err => res.status(404).json({ nopico2found: 'No pico2 found' }));
});

// post PicoMaker readings
router.post('/pico-maker', (req, res) => {
  const { errors, isValid } = validatePicoMakerInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPicoMaker = new PicoMaker({
    EnvironmentTemperature: req.body.EnvironmentTemperature,
    EnvironmentHumidity: req.body.EnvironmentHumidity,
    EnvironmentPressure: req.body.EnvironmentPressure,
    EnvironmentLux: req.body.EnvironmentLux,
    EnvironmentFootcandles: req.body.EnvironmentFootcandles,
    SoilTemperature: req.body.SoilTemperature,
    SoilMoisture: req.body.SoilMoisture,
  });

  newPicoMaker.save().then(picoMakerData => res.json(picoMakerData));
});

// post Pico2 readings
router.post('/pico-2', (req, res) => {
  const { errors, isValid } = validatePico2Input(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPico2 = new Pico2({
    EnvironmentTemperature: req.body.EnvironmentTemperature,
    EnvironmentHumidity: req.body.EnvironmentHumidity,
    EnvironmentLux: req.body.EnvironmentLux,
    EnvironmentFootcandles: req.body.EnvironmentFootcandles,
  });

  newPico2.save().then(pico2 => res.json(pico2));
});

module.exports = router;