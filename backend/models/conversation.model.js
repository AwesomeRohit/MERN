import mongoose from "mongoose";

const conversationModel = new mongoose.Schema({
    participants : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",

    }],
    messages : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Message",
        default : [],
    }],

    
    
},{timestamps : true})

const conversation = mongoose.model("Conversation", conversationModel);
export default conversation;