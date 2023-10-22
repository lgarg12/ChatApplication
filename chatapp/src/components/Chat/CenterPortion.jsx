import React from "react";

const CenterPortion = ({conversation}) => {
    const userJSON = localStorage.getItem("user");
    const userinfo = JSON.parse(userJSON);
    console.log(userinfo);
    return (
        <div className="w-1/2">
            {
                conversation ? 
                <div>
                    
                </div> : <div className="flex justify-center items-center font-bold text-3xl">No Messages</div>
            }
        </div>
    )
}

export default CenterPortion;