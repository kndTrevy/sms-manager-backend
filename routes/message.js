const express = require('express');
const { requireSignin, customerMiddleware, adminMiddleware } = require('../common-middleware');
const { createMessage, deleteMessage, updateMessage, getMessages, getOneMessage } = require('../controllers/message');
const router = express.Router();

router.post('/create/message', requireSignin, createMessage);
router.post('/delete/message', requireSignin, deleteMessage);
router.post('/update/message', requireSignin, updateMessage);

router.get('/get/messages', requireSignin, getMessages);
router.get('/get/message/:_id', requireSignin, getOneMessage);

module.exports = router;