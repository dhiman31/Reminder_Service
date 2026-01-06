const {createNotification,fetchAll} = require('../services/reminderService');

const createEmail = async (req,res) => {
    try {
        const notificationData = {
            subject : req.body.subject,
            content : req.body.content,
            recepientEmail : req.body.recepientEmail,
            notificationTime : req.body.notificationTime
        }
        // const istDate = new Date(req.body.notificationTime);
        // const utcDate = new Date(istDate.getTime() - (5.5 * 60 * 60 * 1000));
        // notificationData.notificationTime = utcDate;

        const notification = await createNotification(notificationData);
        return res.status(200).json({
            data : notification,
            success : true,
            message : 'Successfully created notification',
            err : {}
        })
        
    } catch (error) {
            return res.status(500).json({
            data:{},
            success:false,
            message : error.message || 'Not able to create notification',
            err : error.explaination || error
        })
    }
}

const getAll = async (req,res) => {
    try {
        const notifications = await fetchAll();
        return res.status(200).json({
            data : notifications,
            success : true,
            message : 'Successfully fetched all notifications',
            err : {}
        })
    } catch (error) {
        return res.status(500).json({
            data:{},
            success:false,
            message : error.message || 'Not able to fetch notifications',
            err : error.explaination || error
        })
    }
}

module.exports = {
    createEmail,
    getAll
}