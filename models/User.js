const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        min: 3,
        max: 20,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    hash_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "customer"]
    },
    contactNumber: { type: Number, default:null },
    profilePicture: {
        type: String
    },
    company:{
         type: mongoose.Schema.Types.ObjectId, ref: "Company"
    },
    activated: {
        type: Boolean,
        required: true,
        default: false
    },
    description:{
        type:String,
        default:""
    },
    titre:{
        type:String,
        default:""
    },
    facebook:{
        type:String
    },
    twiter:{
        type:String
    },
    insta:{
        type:String
    },
    linkedIn:{
        type:String
    },
}, { timestamps: true });

userSchema.virtual('fullName')
    .get(function () {
        return `${this.firstName} ${this.lastName}`;
    });
userSchema.methods = {
    authenticate: async function (password) {
        return await bcrypt.compare(password, this.hash_password);
    }
};

module.exports = mongoose.model('User', userSchema);