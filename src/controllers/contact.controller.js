const express = require('express');
const Email = require('../helper/email');
const TemplateContact = require('../template/template.contact');
const router = express.Router();

router.post('/contact', async (req, res) => {
    try {
        if (!req.body.email && !req.body.message)
            return res.status(400).send({error: 'email and message is not defined', status: 400});

        const email = req.body.email;
        const message = req.body.message;
        const template = TemplateContact.template(email, message);

        const mailler = new Email(email, template);
        mailler.sendEmail();

        return res.status(200).send({message: "Contato enviado"});

    }catch (exception) {
        console.error("[mailing.controller] Error: "+ exception);
        return res.status(500).send(exception);
    }
});


 module.exports = app => app.use('/api', router);
