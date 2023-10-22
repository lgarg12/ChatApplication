import React from "react";

const privateRoute = ({ children }) => {
  // Check if a token is present in localStorage
  const token = localStorage.getItem("token");

  if (token) {
    // Token is not present, show the children
    return <div>{children}</div>;
  } else {
    // Token is present, you can choose to redirect or render something else
    return <div></div>;
  }
};

export default privateRoute;
