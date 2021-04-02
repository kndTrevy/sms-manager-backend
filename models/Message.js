const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true
    },
    clients: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, ref: "User", required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);