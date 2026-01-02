const { where, Op , Sequelize } = require('sequelize');
const {NotificationTicket} = require('../models/index');
const notificationticket = require('../models/notificationticket');

class ReminderRepository {

    async createNotification (data) {
        try {
            const notification = await NotificationTicket.create(data);
            return notification;
        } catch (error) {
            throw error;
        }
    }

    // fetch all the notification
    async fetchAll () {
        try {
            const notifications = await NotificationTicket.findAll();
            return notifications;
        } catch (error) {
            throw error;
        }
    }

    // fetch all pendings
    async fetchAllPending (filter) {
        try {
            const notifications = await NotificationTicket.findAll({
                where : {
                    status : filter.status,
                    notificationTime : {
                        [Op.lte] : new Date()
                    }
                }
            });
            return notifications;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = ReminderRepository;