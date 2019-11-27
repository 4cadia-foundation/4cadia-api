const nodeMailer = require('nodemailer');
const ConfigEmail = require('../config/nodemailer.config');

class Email {

        constructor(email, template){
            this.transporter = nodeMailer.createTransport(ConfigEmail);    
            this.options = {
                from: ConfigEmail.from,
                to: ConfigEmail.to,
                subject: 'Formulario de Contato',
                text: 'Formulario de Contato',
                html: template
            };
        }

        sendEmail(){
         return this.transporter.sendMail(this.options,(error,info)=>{
             if(error){
                     console.error('erro ao enviar o email',error);
             }
         });

    }
}

module.exports = Email;