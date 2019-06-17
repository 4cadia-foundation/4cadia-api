const mongoose = require('../../database');

const mailSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const mail = mongoose.model('Mail', mailSchema);
module.exports = mail;