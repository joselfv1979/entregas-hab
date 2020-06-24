const nodemailer = require('nodemailer');  // librería para el envío de emails

// función para el envío de emails recibe como parámetros la dirección de email del receptor y el mensaje a enviar
const sendMail = (address, text) => {
    // Definimos el transporter: servidor smtp (en este caso mailtrap para pruebas)
    const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525, 
        auth: {      
            user: "189c82a814291a",
            pass: "bdf221d182da07"
        }
    });
    
    // Definimos el email: emisor, destinatario, mensaje
    const mailOptions = {
        from: 'placeFinder@gmail.com',
        to: address,
        subject: 'Asunto',
        text
    };

    // Enviamos el email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send(500, err.message);
        } else {
            console.log("Email sent");
            console.log(req.body);
            res.status(200).jsonp(req.body);
        }
    });
}

module.exports = { sendMail }; // exportamos la función