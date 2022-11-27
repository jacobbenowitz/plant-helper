const express = require('express');
const mongoose = require('mongoose');
const readings = require('./routes/api/readings');
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
app.use('/api/readings', readings);

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server running on port ${port}`));