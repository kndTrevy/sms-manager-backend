const express = require('express');
const { requireSignin, customerMiddleware, adminMiddleware } = require('../common-middleware');
const { createCompany, disableCompany, enableCompany, getCompany, getOneCompany, deleteCompany } = require('../controllers/company');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const upload = multer({ storage });

router.post('/create/company', requireSignin, upload.single('image'), createCompany);
router.post('/disable/company', requireSignin, adminMiddleware, disableCompany);
router.post('/enable/company', requireSignin, adminMiddleware, enableCompany);
router.post('/delete/company', requireSignin, adminMiddleware, deleteCompany);



router.get('/get/company', requireSignin, adminMiddleware, getCompany);
router.get('/get/oneCompany', requireSignin, adminMiddleware, getOneCompany);

module.exports = router;