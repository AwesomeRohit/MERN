import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import {
    getRecieverSocketId,
    io
} from "../socket/socket.js";
import client from "ioredis";
import {
    redis
} from "../utils/redis.js";

export const sendMessage = async (req, res) => {

    try {
        const {message} = req.body;
        const {id: recieverID} = req.params;
        const senderID = req.user._id;

        let conversation = await Conversation.findOne({participants: {$all: [senderID, recieverID]}})
        
        if (!conversation) { conversation = await Conversation.create({
                participants: [senderID, recieverID]
            })

        }

        const newMessage = new Message({senderID,recieverID,message})

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }


        // we optimized the code by using promises and running both of the save functions at the same time for less time consuming
        await Promise.all([conversation.save(), newMessage.save()]);

        //Redis Caching Code
        const cacheKey = `chat:messages:${senderID}:${recieverID}`
        const cachedMessages = await redis.get(cacheKey);
        if (cachedMessages) {
            const messages = await JSON.parse(cachedMessages);
            messages.push(newMessage);
            await redis.set(cacheKey, JSON.stringify(messages), 'EX', 3600)
        }

        //SOCKET IO Functionality will go here

        const recieverSocketId = getRecieverSocketId(recieverID);
        if (recieverSocketId) {
            io.to(recieverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);



    } catch (error) {
        console.log("Error in sendMessage controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }

    console.log("sent", req.params.id);
}
export const getMessage = async (req, res) => {

    try {
        const {
            id: userToChatId
        } = req.params;

        const senderID = req.user._id;


        //generate cachekey for redis
        const cacheKey = `chat:messages:${senderID}:${userToChatId}`;

        const cachedMessages = await redis.get(cacheKey);
        if (cachedMessages) return res.status(200).json(JSON.parse(cachedMessages));

        const conversation = await Conversation.findOne({

            participants: {
                $all: [senderID, userToChatId]
            },

        }).populate("messages");

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        await redis.set(cacheKey, JSON.stringify(messages),'EX', 3600); // Cache for 1 hour

        res.status(200).json(messages);



    } catch (error) {

        console.log("Error in getMessage controller", error.message);

        res.status(500).json({
            error: "Internal Server Error"
        });

    }
}