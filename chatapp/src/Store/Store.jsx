import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slices/authSlice"
import profileReducer from "../Slices/profileSlice";

export default configureStore({
    reducer:{
        auth: authReducer,
        profile: profileReducer,
    } 
});


