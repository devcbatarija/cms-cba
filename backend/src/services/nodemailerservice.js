const nodemailer=require("nodemailer");
module.exports={
    sentTokenVerify: async (token,correo)=>{
        return new Promise((resolve,reject)=>{
            const transporter=nodemailer.createTransport({
                host:"smtp.forwardemail.net",
                service:"gmail",
                port:465,
                secure:true,
                auth:{
                    user:"subelzaolivitocabezas@gmail.com",
                    pass:"nnmdtezqwkqfpsjw"
                }
            });
            const optionsMail={
                from: '"CBA" <subelzaolivitocabezas@gmail.com>',
                to: correo, 
                subject: "Verificación de correo electrónico! ✔",
                text: "Hello world?",
                html:`
                <p>Hola,</p>
                <p>Gracias por registrarte. Por favor, verifica tu correo electrónico haciendo clic en el siguiente enlace:</p>
                <p><a href="http://localhost:3001/api/users/valid/token/email?token=${token}" target="_blank">Verificar correo electrónico</a></p>
                <p>Si no te has registrado, por favor, ignora este correo.</p>
                <p>Saludos,</p>
                <p>El equipo CBA </p>`
            }
            transporter.sendMail(optionsMail,function(error,info){
                if(error){
                    reject({error:error});
                }else{
                    resolve({success:"¡Registro Exitoso! Verifica tu Correo Electrónico",info:info})
                }
            })
        })

    }
}