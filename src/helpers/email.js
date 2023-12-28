
var nodemailer = require('nodemailer');
var Utils = require('./utils')
//var smtpTransport = require('nodemailer-smtp-transport');
var msg =""

module.exports = {
// create reusable transport method (opens pool of SMTP connections)
send_email: async function(body) {  
    // setup e-mail data with unicode symbols

    // var transporter = nodemailer.createTransport({
    //     host:"103.86.176.137",
    //     port: 587,
    //     //secure: true, // true for 465, false for other ports
    //     auth: {
    //             user:"info@hypersonal.video", // Your email id (Sender's e-mail address)
    //             pass:"Getmorph202@" // Your password
    //         },
    //         tls: {
    //             // do not fail on invalid certs
    //             rejectUnauthorized: false,
    //           }
    //     });

      /** testing account */
      let testAccount = await nodemailer.createTestAccount();
      // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service : 'gmail',
        auth: {
            user: 'rayapurv59@gmail.com', // generated ethereal user
            pass: 'piwhdkiqgsgvbmuv', // generated ethereal password
        },    
    });

    let message = {
        from: '"Fred Foo 👻" <rayapurv59@gmail.com>', // sender address
        to: body.email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Successfully Register with us.", // plain text body
        html:  Utils.createEmailTemplate(body), // html body
    }
    transporter.sendMail(message).then((info) => {
        return { 
            msg: "you should receive an email",
            info : info.messageId,
            preview: nodemailer.getTestMessageUrl(info)
        }
    }).catch(error => {
        return  error 
    })

   
    }
}