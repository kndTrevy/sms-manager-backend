const express = require('express');
const { requireSignin, customerMiddleware, adminMiddleware } = require('../common-middleware');
const { createClient, deleteClient, getClients, getClientsByCompany } = require('../controllers/client');
const router = express.Router();

router.post('/create/client', requireSignin, createClient);
router.post('/delete/client', requireSignin, customerMiddleware, deleteClient);



router.get('/get/clients', requireSignin, getClients);
router.get('/get/clientsByCompany', requireSignin, getClientsByCompany);

module.exports = router;