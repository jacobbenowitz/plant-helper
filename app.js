const express = require('express');
const mongoose = require('mongoose');
const picoMaker = require('./api/pico-maker');
const pico2 = require('./api/pico-2');
const bodyParser = require('body-parser');
const app = express();
const db = require('./config/keys').mongoURI;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.log(err));


app.get('/', (req, res) => { res.send("Hello World!"); });
app.use('/api/pico-maker', picoMaker);
app.use('/api/pico-2', pico2);

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server running on port ${port}`));