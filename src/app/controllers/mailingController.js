const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

const authConfig = require('../../authConfig/auth.json');

const Mail = require('../models/maillist');

const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}
router.post('/register', async (req, res) => {
    try {
        if(await Mail.findOne({ email }))
            return res.status(400).send({ error: 'O email já está sendo usado'});

        const mail = await Mail.create(req.body);

        mail.password = undefined;

        return res.send({ 
            mail,
            token: generateToken({ id: mail.id }),
        });
    }catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;
    const mail = await Mail.findOne({ email }).select('+password');

    if(!mail)
        return res.status(400).send({ error: 'Usúarios não encontrado '});
    if(!await bcrypt.compare(password, mail.password))
        return res.status(400).send({ error: 'Senha inválida '});
          
    mail.password = undefined;

    res.send({ 
        mail, 
        token: generateToken({ id: mail.id }), 
    });
});

router.post('/forgot_password', async (req, res) => {
    const { email } = req.body;

    try{
        const mail = await Mail.findOne({ email });

        if(!mail)
            return res.status(400).send({ error: 'Email not found' });
        
        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await Mail.findByIdAnUpdate(mail.id, {
            '$set': {
                passorResetToken: token,
                passorResetExpires: now,
            }
        });

        mailer.sendMail({
            to: email,
            from: 'yasmimv890@gmail.com',
            template: 'auth/forgot_password',
            context: { token },
        }, (err) => {
            if(err)
                return res.status(400).send({ error: 'Erro on forget password, try again '});

            return res.send();
        })
    }catch(err){
        res.status(400).send({ error: 'Erro on forget password, try again '});
    }

})

router.post('/reset_password', async (res, req) => {
    const { email, token, password } = req.body;

    try{
        const mail = await Mail.findOne({ email })
            .select('+passwordResetToken passwordResetExpires');

            if(!mail)
                return res.status(400).send({ error: 'User not found' });

            if(token !== mail.passwordResetToken)
                return res.status(400).send({ error: 'Token invalid' });

            const now = new Date();

            if(now > mail.passwordResetExpires)
                return res.status(400).send({ error: 'Token expired, generate a new one' });

            mail.password = password;

            await mail.save();
            res.send();

    }catch (err) {
        res.status(400).send({ error: 'Cannot reset password, try again' });
    }
});

 module.exports = app => app.use('/auth', router);