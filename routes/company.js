const express = require('express');
const { requireSignin, customerMiddleware, adminMiddleware } = require('../common-middleware');
const { createCompany, disableCompany, enableCompany, getCompany, getOneCompany, deleteCompany } = require('../controllers/company');
const router = express.Router();

router.post('/create/company', requireSignin, createCompany);
router.post('/disable/company', requireSignin, adminMiddleware, disableCompany);
router.post('/enable/company', requireSignin, adminMiddleware, enableCompany);
router.post('/delete/company', requireSignin, adminMiddleware, deleteCompany);



router.get('/get/company', requireSignin, adminMiddleware, getCompany);
router.get('/get/oneCompany', requireSignin, adminMiddleware, getOneCompany);

module.exports = router;