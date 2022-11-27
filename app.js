const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.log(err));


app.get('/', (req, res) => { res.send("Hello World!"); });

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server running on port ${port}`));