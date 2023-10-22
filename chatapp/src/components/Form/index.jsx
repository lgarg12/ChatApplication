import React, { useState } from 'react';
import { login } from '../../Operations/AuthApi';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router';
import { apiConnector } from '../../Operations/apiConnector';


export const Form = ({ isSignUp }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        ...(isSignUp && { name: '' }), // Include "name" only if isSignUp is true
        email: '',
        password: '',
    });
      

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(isSignUp){
      // SignUp 
      console.log({status: isSignUp , data: formData});
      const response = await apiConnector("POST" , "http://localhost:8000/api/auth/signup" , {email: formData.email, name: formData.name , password: formData.password});
      console.log("Reponse of SignUp Api ",response);
      navigate("/login");
    }
    else{
      // Login
      dispatch(login(formData.email, formData.password , navigate))
      console.log({status: isSignUp , data: formData});
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-200">
      <div className="w-1/2 flex flex-col gap-5 items-center p-5 shadow-lg rounded-lg bg-white">
        <div className="text-3xl font-semibold">
        {isSignUp ? 'Welcome To Chat App' : 'Welcome Back'}
        </div>
        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              {isSignUp && (
                <div className="flex flex-col gap-1">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    className="p-2 rounded-lg bg-blue-200"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              )}
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="p-2 rounded-lg bg-blue-200"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="p-2 rounded-lg bg-blue-200"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transform transition-transform hover:scale-105"
                type="submit"
              >
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
