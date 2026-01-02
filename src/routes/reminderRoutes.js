const {createEmail,getAll} = require('../controllers/reminderController');
const express = require('express');
const router = express.Router();

router.post('/notification',createEmail);
router.get('/notification',getAll);

module.exports = router;