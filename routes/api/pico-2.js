const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get("/test", (req, res) =>
  res.json({ msg: "This is the pico-2 route" })
);

router.get("/ping", async (req, res) => {
  try {
    const response = await fetch('http://192.168.1.163:80');
    const data = await response.json();
  
    res.json(data);
  }
  catch (err) {
    res.status(404).json({ error: 'Error connecting to pico-2' });
  }
});

module.exports = router;