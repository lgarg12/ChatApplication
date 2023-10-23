const express = require('express');
const router = express.Router();
const { conversation , allConversation , sendMessage ,conversationMessages ,getUsers ,AllMessages} = require("../Controllers/messages");

router.post("/conversation",conversation);
router.get("/conversation/:userId",allConversation);
router.post("/sendMessage",sendMessage);
router.get("/conversationMessages/:conversationId",conversationMessages);
router.get("/getUser",getUsers);
router.get("/messages/:userID",AllMessages);

module.exports = router;