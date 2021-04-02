const express = require('express');
const { signupValidator, signInValidator, updateUserValidator, updatePasswordValidator } = require('../validators/validatorsSchema')
const { requireSignin, customerMiddleware, adminMiddleware } = require('../common-middleware');
const { signUp, signIn, signOut, updateProfile, getUsers, getOneUser } = require('../controllers/auth');
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

router.post('/user/signup', upload.single('profilePicture'),signUp);
router.post('/user/signin', signIn);
router.post('/user/updateProfile', requireSignin, upload.single('profilePicture'),updateProfile);
router.post('/user/signout', requireSignin, signOut);

router.get('/get/users', requireSignin, getUsers);
router.get('/get/user/:_id', requireSignin, getOneUser);

module.exports = router;
