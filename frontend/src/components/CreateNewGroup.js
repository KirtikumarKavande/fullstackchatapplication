import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { GrAddCircle } from 'react-icons/gr';
import { MdOutlineDone } from 'react-icons/md';
import FetchData from '../utilites/functions/FetchData';
import { BASE_URL } from '../utilites/constant';
import { toast } from 'react-toastify';
import { getFriendList } from '../store/redux/slices/friendList.slice';
import { useDispatch, useSelector } from 'react-redux';


const CreateNewGroup = (props) => {
    const { setIsCreateNewGroup } = props
    const [addUserTOGroup, setAddUserTOGroup] = useState([]);
    const [user, setUser] = useState(null);
    const groupNameRef = useRef();
    const friends = useSelector((store) => store.friendList.friends)
    const dispatch = useDispatch()


    const userTOGroup = (item) => {
        setAddUserTOGroup([...addUserTOGroup, item]);
    };


    useEffect(() => {
        if (friends.length) {
            setUser(friends.message)
        } else {
            fetchFriendsData()
        }



    }, [])


    function fetchFriendsData() {
        fetch("http://localhost:4000/getuser")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setUser(data?.message);
               dispatch(getFriendList(data?.message))

            });
    }

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

    return (
        <>
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

        </>
    )
}

export default CreateNewGroup