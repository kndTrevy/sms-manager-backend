const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    }, 
    status: {
    	type: String,
    	enum: ["disabled", "enabled"], 
    	default: "enabled"
    },
    clients:{
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);