
var nodemailer = require('nodemailer');
var Utils = require('./utils')
var msg =""
const config = require('./constants')

module.exports = {
// create reusable transport method (opens pool of SMTP connections)
send_email: async function(body) {  
   
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service : 'gmail',
        auth: {
            user: config.EMAIL, // generated ethereal user
            pass: config.PASSWORD, // generated ethereal password
        },    
    });

    let message = {
        from: config.EMAIL, // sender address
        to: body.isadminnotificationemail===true?config.EMAIL:body.toemail, // list of receivers
        cc: body.ccemails,
        subject: "Inivitation mail.",
        html:  Utils.createEmailTemplate(body), // html body
    }

    if(body.attachment_file){
        message.attachments = [{
            path:`${config.BACK_END_URL}/{body.attachment_file}`
        }]

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