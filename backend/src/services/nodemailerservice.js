const nodemailer = require("nodemailer");
const { Resend } = require('resend');
module.exports = {


    sentTokenVerify: async (token, correo) => {
        return new Promise(async (resolve, reject) => {
            try {
                const a = await sentTokenVerifyByResend(correo);
                resolve({success: a})
            } catch (error) {
                reject({error: error})
            }
            // const transporter = nodemailer.createTransport({
            //     host: "smtp.forwardemail.net",
            //     service: "gmail",
            //     port: 465,
            //     secure: true,
            //     auth: {
            //         user: "subelzaolivitocabezas@gmail.com",
            //         pass: "nnmdtezqwkqfpsjw"
            //     }
            // });
            // const optionsMail = {
            //     from: '"CBA" <subelzaolivitocabezas@gmail.com>',
            //     to: correo,
            //     subject: "Verificación de correo electrónico! ✔",
            //     html: `
            //     <p>Hola,</p>
            //     <p>Gracias por registrarte. Por favor, verifica tu correo electrónico haciendo clic en el siguiente enlace:</p>
            //     <p><a href="https://www.webpage.cba.org.bo/appi/users/valid/token/email?token=${token}" target="_blank">Verificar correo electrónico</a></p>
            //     <p>Si no te has registrado, por favor, ignora este correo.</p>
            //     <p>Saludos,</p>
            //     <p>El equipo CBA </p>`
            // }
            // transporter.sendMail(optionsMail, function (error, info) {
            //     if (error) {
            //         reject({ error: error });
            //     } else {
            //         resolve({ success: "¡Registro Exitoso! Verifica tu Correo Electrónico", info: info })
            //     }
            // })
        })

    },

}
const sentTokenVerifyByResend = async (correo) => {
    const resend = new Resend('re_HBr5uruE_D2d4wUVxcC43wovyjt6KW8rm');
    resend.emails.send({
        from: 'onboarding@resend.dev',
        to: correo,
        subject: 'Hello World',
        html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    })
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
}