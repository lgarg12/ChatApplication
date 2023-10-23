const Conversation = require("../models/Conversation");
const Users = require("../models/Users");
const Message = require("../models/Messages");


const conversation = async (req,res)=>{
    try{
        const { senderId , receiverId } = req.body;
        const newConversation = new Conversation({members: [senderId , receiverId]});
        await newConversation.save();
        res.status(200).json({
            success: true,
            message: "Conversation created successfully",
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Conversation Error",
        })
    }
}

const allConversation = async (req, res) => {
    try {
        const userId = req.params.userId;

        const conversations = await Conversation.find({ members: { $in: [userId] } });

        const conversationData = await Promise.all(conversations.map(async (conversation) => {
            const receiverId = conversation.members.find((member) => member !== userId);
            const receiver = await Users.findById(receiverId); // Use User.findById
            return receiver; // Return the user document
        }));

        res.status(200).json({
            success: true,
            message: "All Conversations between users",
            conversations,
            conversationData, // Change variable name to conversationData
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch conversations",
        });
    }
};


const sendMessage = async(req,res) => {
    try{
        const {conversationId, senderId , message} = req.body;
        const newMessage = new Message({conversationId , senderId , message});
        await newMessage.save();
        res.status(200).send('Message sent successfully');
    }catch(error){
        console.log(error, 'Error');
    }      
} 

const conversationMessages = async(req,res)=>{
    try{
        const conversationId = req.params.conversationId;
        const message = await Message.find({conversationId});
        const messageUserData = await Promise.all(message.map(async (message) => {
            const user = await Users.findById(message.senderId);
            return {user: {email: user.email , name: user.name} , message: message.message}
        }));
        res.status(200).json(messageUserData);
    }catch(error){
        console.log('Error', error);
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await Users.find();
        const userDataPromises = users.map(async (user) => {
            return {
                user: {
                    email: user.email,
                    name: user.name
                },
                userId: user._id
            };
        });

        const userData = await Promise.all(userDataPromises);

        res.status(200).json({ userData });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message // Use error.message to get the error message.
        });
    }
}
const AllMessages = async (req, res) => {
    try {
        const userID = req.params.userID;
        const messages = await Message.find({ senderId: userID }); // Wait for the query to complete

        res.status(200).json({
            success: true,
            messages: messages, // Send the messages in the response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};

module.exports = { conversation , allConversation , sendMessage , conversationMessages , getUsers ,AllMessages}