const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 50
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
    },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);