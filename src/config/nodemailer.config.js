module.exports = {
    host: `${process.env.MAIL_HOST}`,
    port: process.env.MAIL_PORT,
    secure: true, // true for 465, false for other ports
    from: `${process.env.MAIL_FROM}`,
    to: `${process.env.MAIL_TO}`, 
    auth: {
      user: `${process.env.MAIL_USER}`, // generated ethereal user
      pass: `${process.env.MAIL_PASS}` // generated ethereal password
    }
};
