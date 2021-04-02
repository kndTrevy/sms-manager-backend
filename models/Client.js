const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
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
    role: {
        type: String,
        enum: ["client"],
        default: "client"
    },
    contactNumber: { type: Number, default:null },
    activated: {
        type: Boolean,
        required: true,
        default: false
    },
    company:{
         type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, ref: "User", required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);