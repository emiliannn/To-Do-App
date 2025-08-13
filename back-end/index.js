require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./src/routes/index');
const port = process.env.PORT


const app = express();

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))


app.use(cors());


app.use('/', routes)

app.listen(port, () =>
  console.log(`Example app listening on port ${port} ! `),
);
