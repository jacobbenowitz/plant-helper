const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get("/test", (req, res) =>
  res.json({ msg: "This is the pico-2 route" })
);

router.get("/ping", async(req, res) => {
  const response = await fetch('http://192.168.1.172/');
  const data = await response.json();

  res.json(data);
});

module.exports = router;