require('dotenv').config()
const mongoose = require('mongoose');
const url = `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@${process.env.DATABASE}.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(url, { useNewUrlParser: true });

mongoose.Promise = global.Promise;

module.exports = mongoose;