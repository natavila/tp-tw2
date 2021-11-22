const nodemailer = require('nodemailer');

const mail = {
  user: 'avila.nataly12@gmail.com',
  pass: 'gsbeiyhltotqilwj'
}
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: mail.user, // generated gmail user
      pass: mail.pass, // generated gmail password
    },
  });

  transporter.verify().then(() => {
      console.log('Listo para enviar emails');
  });

  module.exports = { transporter }