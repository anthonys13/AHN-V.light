require('dotenv').config();
var dayjs = require('dayjs')
dayjs.locale('fr')

const nodemailer = require('nodemailer');

const mailController = {

    async sendEmail(req, res) {

        try {
            // console.log(req.body)

            const {
                email,
                nom,
                message,
            } = req.body;

            if (nom === "") {
                return res.render('home', {
                    errorNom: "Veillez renseigner votre nom",
                })
            }

            if (message === "") {
                return res.render('home', {
                    errorMessage: "Vous n'avez rien à nous dire ?",
                })
            }

            // I create the model of the mail that I will receive
            const output = `
            <p>You have a new contact request</p>
            <h3>Contact Details</h3>
            <ul>
            <li>Name: ${email}</li>
            <li>Name: ${nom}</li>
            </ul>
            <h3>Message</h3>
            <p>${message}</p>
            `;

            // create reusable transporter object using the default SMTP transport
            var transporter = nodemailer.createTransport({
                host: "smtp.office365.com",
                secureConnection: false, // TLS requires secureConnection to be false
                port: 587, // port for secure SMTP
                tls: {
                    ciphers: 'SSLv3'
                },
                auth: {
                    user: 'fromahn@hotmail.com', // generated ethereal user
                    pass: 'wKEuvofeEE', // generated ethereal password
                },
            });

            // send mail with defined transport object
            let mailOptions = {
                from: '"Nodemailer Contact" <fromahn@hotmail.com>', // sender address
                to: "fromahn@hotmail.com", // list of receivers
                subject: "Node Contact Request", // Subject line
                html: output, // html body
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log("Message sent: %s", info.messageId);
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

                res.render('home', {
                    confirmMail: 'Email envoyé '
                })
            });

        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    },

};
module.exports = mailController;