import React from "react";
import { Link } from "react-router-dom";
import {FiLogOut} from "react-icons/fi";
import {BsChatLeftDots} from "react-icons/bs";
import { useDispatch } from "react-redux";
import { logout } from "../Operations/AuthApi";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const handleLogOut = async()=>{
        dispatch(logout(navigate));
    }
    return(
        <div className="flex justify-center items-center h-screen">
            <div className="w-1/2 bg-blue-300 rounded-lg flex flex-col gap-4 p-4">
                <div className="text-3xl font-bold p-4 rounded-lg text-center">Home Page</div>
                {
                    !token && 
                    <div className="flex flex-col gap-4">
                        <Link className="bg-blue-400 rounded-lg p-4 text-2xl transition-all duration-200 transform scale-90 hover:scale-100 hover:duration-500" to={"/login"}>Sign In</Link>
                        <Link className="bg-blue-400 rounded-lg p-4 text-2xl transition-all duration-200 transform scale-90 hover:scale-100 hover:duration-500" to={"/signup"}>Sign Up</Link>
                    </div>
                }
                {
                    token && 
                    <div className="flex flex-col gap-4">
                        <Link className="bg-blue-400 rounded-lg p-4 text-2xl transition-all duration-200 transform scale-90 hover:scale-100 hover:duration-500 flex gap-2 items-center" onClick={handleLogOut}><span>Logout</span><FiLogOut/></Link>
                        <Link className="bg-blue-400 rounded-lg p-4 text-2xl transition-all duration-200 transform scale-90 hover:scale-100 hover:duration-500 flex gap-2 items-center" to={"/chat"}><span>Chat</span><BsChatLeftDots/></Link>
                    </div> 
                }
            </div>
        </div>
    )
}

export default HomePage; 