const database = require('../database');

const mallingList = database.child("mailling-list");

const create = (_email) => {
    mallingList.push(_email);
};


module.exports = {
    create: create
};
