import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";

import FetchData from "../utilites/functions/FetchData";
import { BASE_URL } from "../utilites/constant";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const ChatHome = () => {
  const messageRef = useRef();
  const navigate = useNavigate();
  const [messageData, setMessageData] = useState([]);
  const[knowName,setKnowName]=useState(null)

  const handleChat = (e) => {
    e.preventDefault();
    FetchData(
      `${BASE_URL}/savemessage`,
      { message: messageRef.current.value },
      "POST"
    );
    messageRef.current.value = "";
  };
  const logout = () => {
    navigate("/");
    localStorage.clear();
  };
  useEffect(() => {
    fetchMessage();
  }, []);
  const fetchMessage = async () => {
    const res = await fetch(`${BASE_URL}/showmessage`, {
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await res.json();
    if (!data) return;
    setMessageData(data);
  };

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
          <button className="text-black " onClick={logout}>
            {" "}
            <BiLogOut size={25} className="inline" /> Logout
          </button>
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
          <div className="p-4 h-3/4 overflow-y-scroll ">
          <div className=" w-fit h-fit text-gray-700  border border-white shadow-lg absolute left-[600px]">{knowName}</div>
            {messageData.map((item) => (
              <div>
                {item.email !== localStorage.getItem("email") && (
                  <div className="flex mb-4">
                    <div
                      onMouseMove={() => {
                        setKnowName(item.name);
                      }}
                      onMouseOut={() => {
                        setKnowName(null);
                        

                      }}
                      className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2"
                    >
                      {item.name.substring(0, 4)}
                    </div>
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <p className="text-blue-800">{item.message}</p>
                    </div>
                  </div>
                )}
                {item.email === localStorage.getItem("email") && (
                  <div className="flex justify-end">
                    <div className="bg-gray-200 p-2 rounded-lg">
                      <p className="text-gray-600">{item.message}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <form
            className="p-4 border-t border-gray-300 relative bottom-3"
            onSubmit={handleChat}
          >
            <div className="flex">
              <input
                ref={messageRef}
                type="text"
                placeholder="Type a message..."
                className="flex-1 border rounded-full py-2 px-4 focus:outline-none focus:border-blue-500"
              />
              <button className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center ml-2">
                <AiOutlineSend />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatHome;
