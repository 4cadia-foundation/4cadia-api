const firebase = require('firebase');
const config = require('../config/firebase.config');

firebase.initializeApp(config);

const database = firebase.database().ref();

module.exports = database;
