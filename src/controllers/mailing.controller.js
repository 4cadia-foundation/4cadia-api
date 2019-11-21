const express = require('express');
const MaillingService = require('../services/mailling.service');

const router = express.Router();

router.post('/mailing', async (req, res) => {
    try {
        if (!req.body.email)
            return res.status(400).send({error: 'email is not defined', status: 400});

        const email = req.body.email;

        if (!validateEmail(email))
            return res.status(400).send({error: 'email invalid', status: 400});

        const mail = await MaillingService.create({email});

        return res.status(200).send({message: "E-mail registered"});

    }catch (exception) {
        console.error("[mailing.controller] Error: "+ exception);
        return res.status(500).send(exception);
    }
});

function validateEmail(email){
    const regex = /^[a-zA-Z0-9.!#$%&’*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
}

 module.exports = app => app.use('/api', router);
