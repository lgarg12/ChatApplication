const express = require('express');
const router = express.Router();
const { conversation , allConversation , sendMessage ,conversationMessages ,getUsers} = require("../Controllers/messages");

router.post("/conversation",conversation);
router.get("/conversation/:userId",allConversation);
router.post("/sendMessage",sendMessage);
router.get("/conversationMessages/:conversationId",conversationMessages);
router.get("/getUser",getUsers);

module.exports = router;