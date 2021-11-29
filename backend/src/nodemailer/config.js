const nodemailer = require("nodemailer");

const mail = { user: 'avila.nataly12@gmail.com', pass: 'gsbeiyhltotqilwj' };

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: { user: mail.user, pass: mail.pass }
});

transporter.verify().then(() => {
	console.log('Nodemailer listo para enviar emails');
});

module.exports = { transporter }
