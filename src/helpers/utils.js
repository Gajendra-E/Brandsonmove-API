module.exports = { 
    createEmailTemplate:  function(data) {   {
    if(data.isadminnotificationemail) {
        let htmlContent = `
            <p>
                <b>Greetings,</b>
            </p>
            <p>
                <b> ${data.name}</b> created the new meeting request, looking to connect with you. Please invite or decline from the admin dashboard.
            </p>
            <br />
        `;

        if(data.preferreddatetime1) {
            htmlContent = htmlContent + `
            <p>
                <b>Date: </b> ${convertToDate(data.preferreddatetime1)} - <b>Time:</b> ${convertToTime(data.preferreddatetime1)}
            </p>`;
        }
        if(data.preferreddatetime2) {
            htmlContent = htmlContent + `
            <p>
                <b>Date: </b> ${convertToDate(data.preferreddatetime2)} - <b>Time:</b> ${convertToTime(data.preferreddatetime2)}
            </p>`;
        }
        if(data.preferreddatetime3) {
            htmlContent = htmlContent + `
            <p>
                <b>Date: </b> ${convertToDate(data.preferreddatetime3)} - <b>Time:</b> ${convertToTime(data.preferreddatetime3)}
            </p>`;
        }

        htmlContent = htmlContent + `
            <br />
            <p>
                <b>Regards</b> <br />
                <span>Brandsonmove</span>
            </p>
        `;

        return htmlContent;
    }

    if(data.isusernotificationemail) {
        let htmlContent = `
            <p>
                <b>Greetings ${data.name}</b>
            </p>
            <p>
                Thank you for visiting our website. We are glad to know your interest in our work. Looking forward to meeting you and scripting a growth story together. 
            </p>
        `;

        if(data.meetinginvitelink) {
            htmlContent = htmlContent + `
            <p>
                Click <a href=${data.meetinginvitelink}> Click here to join meeting.</a>
            </p>`;
        }

        if(data.passcode) {
            htmlContent = htmlContent + `<p> Passcode ${data.passcode}</p>`;
        }

        if(data.approvedtimeslot) {
            htmlContent = htmlContent + `
            <p>
                <b>Date: </b> ${data.approvedtimeslot.date} - <b>Time:</b> ${data.approvedtimeslot.time}
            </p>`;
        }

        htmlContent = htmlContent + `
            <br />
            <p>
                <b>Regards</b> <br />
                <span>Brandsonmove</span>
            </p>
        `;

        return htmlContent;
    }

    if(data.isinvitedeclineemail) {
        let htmlContent = `
            <p>
                <b>Greetings ${data.name}</b>
            </p>
            <p>
                Thank you for your kind interest. Your time slots are currently pre-engaged. We shall write to you shortly seeking another time and date for a meeting.
            </p>
        `;
        htmlContent = htmlContent + `
            <br />
            <p>
                <b>Regards</b> <br />
                <span>Brandsonmove</span>
            </p>
        `;
        return htmlContent;
    }

    if(data.ismeetingcompleteemail) {
        let htmlContent = `
            <p>
                <b>Greetings ${data.name}</b>
            </p>
            <p>
                Thank you for your time and discussion. Please have a look at the below document.
            </p>
        `;
        if(data.documentlink) {
            htmlContent = htmlContent + `
                <br />
                <p>
                    <a href=${data.documentlink}>Please visit the document.</a>
                </p>

            `;
        }
        htmlContent = htmlContent + `
            <br />
            <p>
                <b>Regards</b> <br />
                <span>Brandsonmove</span>
            </p>
        `;
        return htmlContent;
    }

}

    }
}
