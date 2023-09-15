import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";

import FetchData from "../utilites/functions/FetchData";
import { BASE_URL } from "../utilites/constant";
import { BiArrowBack, BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GrAddCircle } from "react-icons/gr";
import { MdOutlineDone } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { io } from "socket.io-client";

import { toast } from "react-toastify";

const ChatHome = () => {
  const socket = io("http://localhost:5000");
  const messageRef = useRef();
  const groupNameRef = useRef();
  const navigate = useNavigate();
  const [messageData, setMessageData] = useState([]);
  const [knowName, setKnowName] = useState(null);
  const [isShowModel, setIsShowModel] = useState(false);
  const [isCreateNewGroup, setIsCreateNewGroup] = useState(false);
  const [user, setUser] = useState(null);
  const [addUserTOGroup, setAddUserTOGroup] = useState([]);
  const [showGroups, setShowGroups] = useState([]);
  const [SelectedGroup, setSelectedGroup] = useState(null);
  const [isEditGroupInfo, setIsEditGroupInfo] = useState(false);
  const [memberInPerticularGroup, setMemberInPerticularGroup] = useState([]);

  const handleChat = (e) => {
    e.preventDefault();
    FetchData(
      `${BASE_URL}/sendgroupmessage?groupId=${SelectedGroup.id}`,
      { message: messageRef.current.value },
      "POST"
    );
    socket.emit("send-message", {
      message: messageRef.current.value,
      groupId: SelectedGroup.id,
      user: {
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
      },
    });
    messageRef.current.value = "";
  };

  socket.on("message", (msg) => {
    if (msg.groupId === SelectedGroup?.id) {
      setMessageData([...messageData, msg]);
    }
    console.log("fibroadcasted msg", msg);
  });
  const logout = () => {
    navigate("/");
    localStorage.clear();
  };
  useEffect(() => {
    fetch("http://localhost:4000/getgroups", {
      headers: { Authorization: localStorage.getItem("token") },
    })
      .then((res) => {
        return res.json();
      })
      .then((group) => {
        setShowGroups([...showGroups, ...group.message]);
      });

    fetch("http://localhost:4000/getuser")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUser(data?.message);
      });
    // const id = setInterval(() => {
    fetchMessage();
    // }, 1000);
    // return () => clearInterval(id);
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
    // setMessageData(data);
  };

  const userTOGroup = (item) => {
    setAddUserTOGroup([...addUserTOGroup, item]);
  };
  // console.log(addUserTOGroup);

  const createGroup = (e) => {
    e.preventDefault();
    FetchData(
      `${BASE_URL}/creategroup`,
      { groupMember: addUserTOGroup, groupName: groupNameRef.current.value },
      "POST"
    );

    toast.info("Group created successfully");
    setIsCreateNewGroup(false);
  };

  const perticularGroupData = (item) => {
    setSelectedGroup(item);

    fetch(
      `http://localhost:4000/getGroupMember?groupId=${item.id}`,

      {
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setMemberInPerticularGroup([...memberInPerticularGroup, ...data]);
      });

    fetch(`http://localhost:4000/groupmessages?groupID=${item.id}`).then(
      (res) => {
        return res.json().then((data) => {
          setMessageData(data);
        });
      }
    );
  };
  const newMemberToGroup = (item) => {
    FetchData(
      `${BASE_URL}/newmember?groupId=${SelectedGroup.id}`,
      { userId: item.id },
      "POST"
    );
    toast.info("user added to group");
  };
  const removeUser = (item) => {
    FetchData(
      `${BASE_URL}/removeuser?groupId=${SelectedGroup.id}`,
      { userId: item.id },
      "POST"
    );
    toast.info("user removed successfully");
  };
  console.log("message data",messageData)

  return (
    <div className="bg-gray-200 font-sans ">
      <div className="flex h-screen">
        <div className="w-1/4 bg-[#FFFFFF] text-white p-4 ">
          <div className="mb-4">
            {/* <h2 className="text-xl font-semibold">Contacts</h2> */}
            <div className="flex items-center mt-2">
              {/* <img src="user-avatar.jpg" alt="User Avatar" className="w-10 h-10 rounded-full mr-2"/> */}
              <div className="flex">
                <p
                  className="text-lg text-black"
                  onClick={() => {
                    setIsShowModel(true);
                  }}
                  onBlur={() => {
                    setIsShowModel(false);
                  }}
                >
                  <BsThreeDotsVertical />
                </p>
                <p className="text-black mx-5 font-extrabold">GROUP CHAT APP</p>
              </div>
            </div>
          </div>
          {isShowModel && (
            <div className="w-28 h-24 p-2 shadow-md rounded-lg bg-[#E5E7EB] absolute ">
              <div className="space-y-3">
                <div
                  className="text-gray-600 hover:bg-[#D9DBDF] w-full cursor-pointer"
                  onClick={() => {
                    setIsCreateNewGroup(true);
                    setIsShowModel(false);
                  }}
                >
                  New group
                </div>
                <div>
                  <button
                    className="text-gray-600 hover:bg-[#D9DBDF] w-full text-left"
                    onClick={logout}
                  >
                    {" "}
                    Logout
                  </button>
                </div>
                <div
                  className="text-gray-500"
                  onClick={() => {
                    setIsShowModel(false);
                  }}
                >
                  <BiArrowBack />{" "}
                </div>
              </div>
            </div>
          )}

          <hr className="text-red-500" />
          <div>
            {showGroups &&
              showGroups.map((item) => {
                return (
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      perticularGroupData(item);
                    }}
                  >
                    <div className="flex items-center mt-2">
                      <div className="w-10 h-10 rounded-full bg-blue-500 text-white  mr-6 pl-1 pt-1">
                        {item.groupname.substring(0, 4)}
                      </div>
                      <div className="text-black ">{item?.groupname}</div>
                    </div>
                    <hr className="text-red-600 w-full  mt-3" />
                  </div>
                );
              })}
          </div>
        </div>

        {isCreateNewGroup && (
          <div className="w-1/4 bg-[#FFFFFF] text-white p-4 absolute max-h-screen ">
            <div className="mb-4">
              {/* <h2 className="text-xl font-semibold">Contacts</h2> */}
              <div className="flex items-center mt-2">
                {/* <img src="user-avatar.jpg" alt="User Avatar" className="w-10 h-10 rounded-full mr-2"/> */}
                <div className="flex">
                  <p className="text-black mx-5 font-extrabold">Create Group</p>
                </div>
              </div>
            </div>

            {/* <div className="border border-b-black"><input /></div> */}
            <div>
              {addUserTOGroup?.map((user) => {
                return (
                  <div className="text-gray-500 inline px-1">{user.name}</div>
                );
              })}

              <input
                className="border text-gray-600 border-b-gray-500 w-full outline-none p-1 border-t-white border-x-white"
                placeholder="Type name"
              />
            </div>

            <hr className="font-extrabold" />
            <div>
              {user &&
                user.map((item) => {
                  if (localStorage.getItem("email") !== item.email) {
                    return (
                      <div className="shadow-md p-1 mt-3 flex text-black justify-between">
                        <div className="text-black ">{item.name}</div>
                        <button
                          onClick={() => {
                            userTOGroup(item);
                          }}
                        >
                          {" "}
                          <GrAddCircle size={21} />{" "}
                        </button>
                      </div>
                    );
                  }
                })}
            </div>
            <div className="w-full h-20 mt-2 ">
              <input
                className="border text-gray-600 border-b-gray-500 w-full outline-none p-1 border-t-white  border-x-white focus:border-b-blue-500 "
                placeholder="Type Group Name"
                ref={groupNameRef}
              />
              <button
                className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center mx-24 my-1 pl-2  mr-2"
                onClick={createGroup}
              >
                <MdOutlineDone size={25} />
              </button>
            </div>
          </div>
        )}

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

              {memberInPerticularGroup?.map((item) => {
                return (
                  <div key={item.id} className="flex justify-between">
                    <div className="text-black"> {item.name} </div>
                    <div
                      className="text-red-500 cursor-pointer"
                      onClick={() => {
                        removeUser(item);
                      }}
                    >
                      {" "}
                      Remove{" "}
                    </div>
                  </div>
                );
              })}
            </div>
            <hr className="text-red-600 mb-4" />

            <div>
              {addUserTOGroup?.map((user) => {
                return (
                  <div className="text-gray-500 inline px-1">{user.name}</div>
                );
              })}

              <input
                className="border text-gray-600 border-b-gray-500 w-full outline-none p-1 border-t-white border-x-white"
                placeholder="Type name"
              />
            </div>

            <hr className="font-extrabold" />
            <div>
              {user.map((item) => {
                const isMemberInGroup = memberInPerticularGroup.some(
                  (member) => member.name === item.name
                );
                if (!isMemberInGroup) {
                  return (
                    <div
                      className="shadow-md p-1 mt-3 flex text-black justify-between"
                      key={item.name}
                    >
                      <div className="text-black">{item.name}</div>
                      <button
                        onClick={() => {
                          newMemberToGroup(item);
                        }}
                      >
                        <GrAddCircle size={21} />
                      </button>
                    </div>
                  );
                }

                return null; // Member is already in the group, so don't render anything.
              })}
            </div>
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

        <div className="w-3/4 bg-[#EFEAE2] ">
          <div
            className="bg-gray-200 p-4 border-b border-gray-300"
            onClick={() => {
              setIsEditGroupInfo(true);
            }}
          >
            <div className="flex items-center">
              {/* <img src="user-avatar.jpg" alt="User Avatar" className="w-12 h-12 rounded-full mr-2"/> */}
              <div>
                <p className="text-xl font-semibold">
                  {SelectedGroup?.groupname}
                </p>
                <p className="text-gray-500">Online</p>
              </div>
            </div>
          </div>
          <div className="p-4 h-3/4 overflow-y-scroll ">
            <div className=" w-fit h-fit text-gray-700  border border-white shadow-lg absolute left-[600px]">
              {knowName}
            </div>
            {messageData.map((item) => (
              <div>
                {item?.user?.email !== localStorage.getItem("email") && (
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
                      {item?.user?.name.substring(0, 4)}
                    </div>
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <p className="text-blue-800">{item.message}</p>
                    </div>
                  </div>
                )}
                {item?.user?.email === localStorage.getItem("email") && (
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
