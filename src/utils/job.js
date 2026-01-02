const cron = require('node-cron');
const {fetchAllPending , sendBasicEmail} = require('../services/reminderService');
const { EMAIL_ID } = require('../config/serverConfig');
const sender = require('../config/emailConfig');
const {NotificationTicket} = require('../models/index');

const setUpJobs = () => {
    cron.schedule('* * * * *' , async() => {

        const notifications = await fetchAllPending();
        console.log(notifications);
        
        for (const element of notifications) {
        await sender.sendMail({
            from: EMAIL_ID,
            to: EMAIL_ID,
            subject: element.subject,
            text: element.content
        });

        await NotificationTicket.update(
            { status: 'SUCCESS' },
            { where: { id: element.id } }
        );

        }


    })
}

module.exports = {
    setUpJobs
}