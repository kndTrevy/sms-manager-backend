const express = require('express');
const router = express.Router();
const { adminMiddleware } = require('../common-middleware');
const { initialData } = require('../controllers/initialData');

router.post('/initialdata' ,initialData);

module.exports = router;