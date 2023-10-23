import React, { useEffect, useState } from "react";
import { apiConnector } from "../../Operations/apiConnector";
import {BsSend} from "react-icons/bs"


const CenterPortion = ({ conversation }) => {
    const userJSON = localStorage.getItem("user");
    const userinfo = JSON.parse(userJSON);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
//  console.log(userinfo , conversation);

    useEffect(() => {
      if(conversation){
          const senderMessages = apiConnector("GET",`http://localhost:8000/api/messages/${userinfo._id}`)
          const receiverMessages = apiConnector("GET",`http://localhost:8000/api/messages/${conversation._id}`)
          Promise.all([senderMessages, receiverMessages])
              .then((responses) => {
                const [senderMessages, receiverMessages] = responses;
                const combinedMessages = [...receiverMessages?.data?.messages, ...senderMessages?.data?.messages];
                const sortedData = combinedMessages.sort((a, b) => new Date(a.time) - new Date(b.time));
                setMessages(sortedData);
              })
              .catch((error) => {
                console.error('API requests error:', error);
              });
      }
    }, [conversation]);
    function formatTime(timestamp) {
        const date = new Date(timestamp);
        const options = {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true, // or false if you want 24-hour format
        };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }
    const handleSubmit = (event) => {
        event.preventDefault(); 
        console.log("Message submitted:", message);
        const response  = apiConnector("POST","http://localhost:8000/api/sendMessage",{conversationId: conversation._id , senderId: userinfo._id , message: message});
        console.log(response);
        setMessage("");
    };
  console.log(message);

return (
    <div className="w-1/2">
      {conversation ? (
        <div>
          <div className="flex gap-2 items-center uppercase bg-gray-400 my-2 rounded-full p-3 mx-2">
            <img src={`https://api.dicebear.com/5.x/initials/svg?seed=${conversation.name}`} className="w-12 h-12 rounded-full border-2 border-white" alt="User Avatar" />
            <span>{conversation.name}</span>
          </div>
          <div className="border-2 border-gray-100 p-2 mx-2 min-h-[600px] overflow-y-auto rounded-lg">
            {messages.length > 0 ? (
              <div>
                {messages.map((message) => (
                  <div key={message._id} className="flex flex-col gap-4">
                    {message.senderId === userinfo._id ? (
                      <div className="flex gap-2 items-center justify-end">
                        <div className="max-w-[50%]">
                            <p className="border-2 p-2 rounded-lg">{message.message}</p>
                            <p className="text-[10px]">{formatTime(message.time)}</p>
                        </div>
                        <img src={`https://api.dicebear.com/5.x/initials/svg?seed=${userinfo.name}`} className="h-10 w-10 border-2 border-gray-200 rounded-full"/>
                      </div>
                    ) : (
                      <div className="flex gap-2 items-center">
                        <img className="h-10 w-10 border-2 border-gray-200 rounded-full" src={`https://api.dicebear.com/5.x/initials/svg?seed=${conversation.name}`}/>
                        <div className="max-w-[50%]">
                            <p className="border-2 p-2 rounded-lg">{message.message}</p>
                            <p className="text-[10px]">{formatTime(message.time)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div>No Messages</div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center font-bold text-3xl">No Messages</div>
      )}
      <div>
        <form className="flex gap-2 items-center mt-5" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Message"
              className="border-2 border-gray-200 mx-2 p-2 rounded-lg w-[90%]"
              value={message}
              onChange={(e) => setMessage(e.target.value)} // Update the 'message' state
            />
            <button type="submit">
              <BsSend className="h-5 w-5" />
            </button>
        </form>
      </div>
    </div>
  )};
  
export default CenterPortion
