import { useState } from "react";

import { RxCross1 } from "react-icons/rx";


import ChatWindow from "./ChatWindow";
import LeftPanel from "./LeftPanel";
const ChatHome = () => {
  const [isEditGroupInfo, setIsEditGroupInfo] = useState(false);





  return (
    <div className="bg-gray-200 font-sans ">
      <div className="flex h-screen">
        <div className="w-1/4 bg-[#FFFFFF] text-white p-4 ">
          <LeftPanel />
        </div>


        {isEditGroupInfo && (
          <div className="w-1/4 bg-[#FFFFFF] text-white p-4 absolute max-h-screen ">
            <div className="mb-4">
              <div className="flex items-center mt-2">
                <div className="flex">
                  <p className="text-black mx-5 font-extrabold">Edit Group</p>
                </div>
              </div>
            </div>
            <div>
              <div className="text-black font-extrabold ml-2">Group Member</div>

            </div>
            <hr className="text-red-600 mb-4" />


            <hr className="font-extrabold" />

            <div className="w-full h-20 mt-2 ">
              <button
                className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center mx-24 my-1 pl-2  mr-2"
                onClick={() => {
                  setIsEditGroupInfo(false);
                }}
              >
                <RxCross1 size={25} />
              </button>
            </div>
          </div>
        )}


        <ChatWindow />


      </div>
    </div>
  );
};

export default ChatHome;
