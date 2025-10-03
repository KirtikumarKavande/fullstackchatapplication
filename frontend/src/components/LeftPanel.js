import React, { useEffect, useRef, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { chatMenuitems } from '../utilites/constant';
import LeftPopup from "./LeftPopup";
import { BiArrowBack } from 'react-icons/bi';
import CreateNewGroup from './CreateNewGroup';
import FriendList from './FriendList';
import { useInfiniteQuery } from "@tanstack/react-query";



const LeftPanel = () => {
  const [isShowModel, setIsShowModel] = useState(false);
  const [isCreateNewGroup, setIsCreateNewGroup] = useState(false);

  const [isShowContacts, setIsShowContacts] = useState(false)
  const sentinelRef = useRef(null);

  const fetchGroups = async ({ pageParam }) => {
    console.log("pageparams", pageParam);
    const token = localStorage.getItem("token");
    const pageNumber = pageParam;
    const limit = 3;
    const res = await fetch(
      `http://localhost:4000/getgroups?pageNumber=${pageNumber}&limit=${limit}`,
      {
        headers: { Authorization: token },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch groups");
    }

    return res.json();
  };

  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["groups"],
    queryFn: fetchGroups,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      console.log("lastPage", lastPage.groups?.hasMore);
      console.log("allPages", allPages);
      if (lastPage.groups?.hasMore) {
        return allPages.length + 1;
      }
      return undefined;
    }
  })

  const latestValues = useRef({ fetchNextPage: fetchNextPage, hasNextPage: hasNextPage })
  useEffect(() => {
    latestValues.current = { fetchNextPage, hasNextPage }
  }, [fetchNextPage, hasNextPage]) // or just omit deps to update on every render

  let groups = []
  if (status === "success") {
    groups = data?.pages?.flatMap((item) => item.groups.data)
    // groups = [...groups, ...groups, ...groups, ...groups]

  }
  function IntersectionObserverHandler(observerData) {
    const { fetchNextPage, hasNextPage } = latestValues.current
    if (hasNextPage && observerData && observerData[0]?.isIntersecting) {
      fetchNextPage()
    }

  }

  useEffect(() => {
    const node = sentinelRef.current
    const observer = new IntersectionObserver(IntersectionObserverHandler)
    if (node) {
      observer.observe(node)
    }

    return () => {
      if (node) {
        observer.unobserve(node)
      }
    }
  }, [])
  console.log("fun", groups);

  function populateContacts() {
    setIsCreateNewGroup(false);
    setIsShowModel(false);

    setIsShowContacts(true)

  }
  function createNewGroup() {
    setIsCreateNewGroup(true);
    setIsShowModel(false);

  }


  function handleLogout() {

  }

  const menuItemsMap = new Map([
    ['contacts', populateContacts],
    ['newGroup', createNewGroup],
    ['logout', handleLogout]

  ])
  const handleMenuSelected = (key) => {
    const handler = menuItemsMap.get(key)
    if (handler && typeof handler === 'function') {
      handler()
    }
  }

  return (
    <div className='w-[100%]'>
      <div className=" bg-[#FFFFFF] text-white p-3">
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
          <div className="w-60  p-2 shadow-md rounded-lg bg-[#E5E7EB] absolute space-y-3" onBlur={() => { console.log("hello"); }}>
            {
              chatMenuitems.map((option) => {
                return (
                  <div
                    className="text-gray-600 hover:bg-[#D9DBDF] w-full cursor-pointer"
                    onClick={() => {
                      handleMenuSelected(option.key)

                    }}
                  >
                    {option.label}
                  </div>
                )

              })
            }
            <div
              className="text-gray-500"
              onClick={() => {
                setIsShowModel(false);
              }}
            >
              <BiArrowBack />{" "}
            </div>
          </div>
        )}

        <hr className="text-red-500" />
        <div>

          {

            groups.length>0 && groups.map((group) => {
              return (
                <div
                  className="cursor-pointer"
                  key={group.id}
                >
                  <div className="flex items-center mt-2">
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white  mr-6 pl-1 pt-1">
                      kk
                    </div>
                    <div className="text-black ">{group?.groupname}</div>
                  </div>
                  <hr className="text-red-600 w-full  mt-3" />
                </div>
              )
            })

          }


        </div>

        <div ref={sentinelRef}></div>
      </div>


      {isCreateNewGroup && (

        <LeftPopup title={"Create a Group"}>
          <CreateNewGroup setIsCreateNewGroup={setIsCreateNewGroup} />
        </LeftPopup>
      )}
      {
        isShowContacts && (
          <LeftPopup title={"Chat with Friends"}>
            <FriendList isPersonalChat={true} setIsCreateNewGroup={() => { }} />
          </LeftPopup>
        )
      }

    </div>
  )
}

export default LeftPanel