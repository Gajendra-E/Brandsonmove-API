
var nodemailer = require('nodemailer');
var Utils = require('./utils')
const config = require('./constants')

module.exports = {
    // create reusable transport method (opens pool of SMTP connections)
    send_email: async function (body) {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.EMAIL, // generated ethereal user
                pass: config.PASSWORD, // generated ethereal password
            },
        });

        let message = {
            from: config.EMAIL, // sender address
            to: body.isadminnotificationemail === true ? config.EMAIL : body.toemail, // list of receivers
            cc: body.ccemails,
            subject: "Inivitation mail.",
            html: Utils.createEmailTemplate(body), // html body
        }

        if(body.isusernotificationemail){
            message.subject = `Invitation for a meeting on ${convertToDate(body.approvedtimeslot.date)} and ${body.approvedtimeslot.time}`
        }
        if(body.isinvitedeclineemail){
            message.subject = "Regret our prior engagement on your preferred time slots"
        }
        if(body.ismeetingcompleteemail){
            message.subject = "Thank you for your time and discussion"
        }

        if (body.attachment_file) {
            message.attachments = [{
                path: `${config.BACK_END_URL}/uploads/${body.attachment_file}`
            }]
            
        }
        transporter.sendMail(message).then((info) => {
            return {
                msg: "you should receive an email",
                info: info.messageId,
                preview: nodemailer.getTestMessageUrl(info)
            }
        }).catch(error => {
            return error
        })
    }
}

const convertToDate = (date) => {
    const timestamp = new Date(date);
    const date1 = timestamp.getDate();
    const month = timestamp.toLocaleString('default', { month: 'long' });
    const year = timestamp.getFullYear();
    return `${date1}, ${month}-${year}`;
}