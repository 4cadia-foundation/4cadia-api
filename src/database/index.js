const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://yasmim:stevemagal@cluster0-rqd72.mongodb.net/test?retryWrites=true&w=majority');
mongoose.Promise = global.Promise;

module.exports = mongoose;