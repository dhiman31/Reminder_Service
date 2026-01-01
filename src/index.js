const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig');
const sendBasicEmail = require('./services/reminderService');
const {EMAIL_ID,EMAIL_PASS} = require('./config/serverConfig');

const setUpAndStartServer = async () => {

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.listen(PORT , async () => {
        console.log("Server started on PORT : ",PORT);

        for(let i=0 ; i<100 ; i++)
        {
            await sendBasicEmail(
            'support@dhimanairlineservice.com',
            'diviyadhiman02@gmail.com',
            'A Gentle Reminder For Onboarding',
            `Dear Customer,
             Sojao`
            )
        }

    })

}

setUpAndStartServer();