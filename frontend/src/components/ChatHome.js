import React from "react";
import { AiOutlineSend } from "react-icons/ai";

const ChatHome = () => {
  return (
    <div className="bg-gray-200 font-sans">
      <div className="flex h-screen">
        <div className="w-1/4 bg-[#FFFFFF] text-white p-4">
          <div className="mb-4">
            {/* <h2 className="text-xl font-semibold">Contacts</h2> */}
            <div className="flex items-center mt-2">
              {/* <img src="user-avatar.jpg" alt="User Avatar" className="w-10 h-10 rounded-full mr-2"/> */}
              <div>
                <p className="text-lg text-black">Group chat</p>
                <p className="text-gray-400">Last message...</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-3/4 bg-[#EFEAE2] ">
          <div className="bg-gray-200 p-4 border-b border-gray-300">
            <div className="flex items-center">
              {/* <img src="user-avatar.jpg" alt="User Avatar" className="w-12 h-12 rounded-full mr-2"/> */}
              <div>
                <p className="text-xl font-semibold">Group chat</p>
                <p className="text-gray-500">Online</p>
              </div>
            </div>
          </div>
          <div className="p-4 h-3/4">
            <div className="flex mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2">
                JD
              </div>
              <div className="bg-blue-100 p-2 rounded-lg">
                <p className="text-blue-800">Hello, how are you doing?</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-gray-200 p-2 rounded-lg">
                <p className="text-gray-600">I'm doing great, thanks!</p>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-gray-300">
            <div className="flex">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border rounded-full py-2 px-4 focus:outline-none focus:border-blue-500"
              />
              <button className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center ml-2">
                <AiOutlineSend />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHome;
