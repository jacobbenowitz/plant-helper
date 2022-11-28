const express = require('express');
const mongoose = require('mongoose');
const readings = require('./routes/api/readings');
const pico2 = require('./routes/api/pico-2');
const bodyParser = require('body-parser');
const app = express();
const db = require('./config/keys').mongoURI;
const pingPico2 = require('./cron/ping-pico-2');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.log(err));

app.get('/', (req, res) => { res.send("Hello World!"); });
app.use('/api/readings', readings);
app.use('/api/pico-2', pico2);

const port = process.env.PORT || 5001;

pingPico2();

app.listen(port, () => console.log(`Server running on port ${port}`));