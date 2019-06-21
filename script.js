require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express();

var corsOptions = {
    origin: process.env.ORIGIN,
    methods: "GET,POST",
    preflightContinue: false,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

require('./src/app/controllers/mailing.controller')(app);

app.listen(process.env.PORT);