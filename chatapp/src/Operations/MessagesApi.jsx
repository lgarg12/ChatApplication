import React from "react";
import { apiConnector } from "./apiConnector";
import { messages } from "./apis";
import toast from "react-hot-toast";

const { ALLCONVERSATION } = messages;

export function allconversations({userId}){
    return async(dispatch) => {
        try{
            const response = await apiConnector("GET", `${ALLCONVERSATION}/${userId}`);
            console.log(response);
        }catch(error){
            console.log("LOGIN API ERROR............", error);
            toast.error("Failed To Fetch Info Of Conversations");
        }
    }
}