import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({

    senderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,

    },

    recieverID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    message: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true })

const Message = mongoose.model("Message", messageSchema);

export default Message;