import React from "react";
import LeftPortion from "./LeftPortion";
import CenterPortion from "./CenterPortion";
export const Chat = () => {

  return (
    <div className="flex h-screen">
      <LeftPortion/>
      <CenterPortion/>
      <div className="w-1/4 bg-gray-300 p-2"> right portion</div>
    </div>
  );
};
