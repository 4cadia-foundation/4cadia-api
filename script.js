require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: process.env.ORIGIN,
    methods: "POST",
    preflightContinue: false,
    optionsSuccessStatus: 200 
  };

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

require('./src/controllers/mailing.controller')(app);
require('./src/controllers/contact.controller')(app);

app.listen(process.env.PORT, () => {
    console.log(`application start in port ${process.env.PORT}`);
});

