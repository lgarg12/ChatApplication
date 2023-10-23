import React, { useState, useEffect } from "react";
import { apiConnector } from "../../Operations/apiConnector";
import CenterPortion from "./CenterPortion";
import { io } from "socket.io-client"


export const Chat = () => {
  const [user, setUser] = useState({});
    // Initialize as an array
    const [conversations, setConversations] = useState([]);
    const [selectedTalk , setSelectedTalk] = useState(null);
    const [socket,setSocket] = useState(null);
    const [users , setUsers] = useState([]);

    useEffect(()=>{
      setSocket(io('http://localhost:8080'));
    },[])

    useEffect(()=>{
      socket?.emit('addUser',user?._id);
      socket?.on('getUsers',users => {
        console.log('ActivateUsers: ',users);
      })
    },[socket])



    useEffect(() => {
      const userJSON = localStorage.getItem("user");
      if (userJSON) {
        const userinfo = JSON.parse(userJSON);
        const response = apiConnector("GET", `http://localhost:8000/api/conversation/${userinfo._id}`);
        response
          .then(data => {
          //   console.log(data);
            setConversations(data?.data?.conversationData);
            setSelectedTalk(data?.data?.conversationData[0]);
          })
          .catch(error => {
            // Handle any errors that occurred during the promise
            console.error(error);
          });
        setUser(userinfo);
      }
    }, []);
    // console.log(selectedTalk);
  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-300 p-4 flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <img src={user.image} className="w-12 h-12 rounded-full border-2 border-white" alt="User Avatar" />
        <div className="text-xl font-bold">{user.name}</div>
      </div>
      <div className="bg-black h-[1px]" />
      <div>
        <div>Messages</div>
        {
          conversations.length > 0 && 
          <div className="mt-5 flex flex-col gap-4">
              {
                  conversations.map((item) => (
                      <div key={item._id} className="flex gap-3 items-center cursor-pointer" onClick={() => setSelectedTalk(item)}>
                          <img src={`https://api.dicebear.com/5.x/initials/svg?seed=${item.name}`} className="w-12 h-12 rounded-full border-2 border-white"/>
                          <span className="uppercase">{item.name}</span>
                      </div>
                  ))
              }
          </div>
        }
      </div>
      </div>
      <CenterPortion  conversation={selectedTalk}/>
      <div className="w-1/4 bg-gray-300 p-2">right portion</div>
    </div>
  );
};
