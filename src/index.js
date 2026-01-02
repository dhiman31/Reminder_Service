const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/reminderRoutes');
const {setUpJobs} = require('./utils/job');
const {fetchAllPending} = require('./services/reminderService');

const setUpAndStartServer = async () => {

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',apiRoutes);

    app.listen(PORT , async () => {
        console.log("Server started on PORT : ",PORT)
        setUpJobs();
    })

}

setUpAndStartServer();


/*
Emails : create notification(PENDING) ,
         fetchEmailsAll ,
         fetchEmails(pending) ,
         sendemails(PENDING) ,
*/