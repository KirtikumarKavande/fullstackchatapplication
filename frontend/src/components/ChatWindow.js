import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { useSelector } from 'react-redux'

const ChatWindow = () => {
    const messageRef = useRef()
    const chatId = useSelector((store) => store.selectedEntry.selectedChatId)
    const messageContainerRef=useRef()

    async function fetchMessages() {
        if (!chatId) return
        console.log("good", chatId);
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:4000/showmessage/${chatId}}`,
            {
                headers: { Authorization: token },
            }
        )
        console.log("res", res);
        if (!res.ok) {
            throw new Error("failed to fetch data")

        }
        return res.json()
    }
    const { data, isLoading, error } = useQuery({
        queryKey: ['messages', chatId],
        queryFn: fetchMessages
    })

    useEffect(()=>{
        if(messageContainerRef && data){
            messageContainerRef.current.scrollTop=messageContainerRef.current.scrollHeight
        }
    },[data])
    // if (error) return <div>something went wrong</div>
    // console.log(data)

    return (

        <div className="w-3/4 bg-[#EFEAE2] ">
            <div
                className="bg-gray-200 p-4 border-b border-gray-300"
            // onClick={() => {
            //   setIsEditGroupInfo(true);
            // }}
            >
                <div className="flex items-center">
                    <div>
                        <p className="text-xl font-semibold">
                            Virat
                        </p>
                        <p className="text-gray-500">Online</p>
                    </div>
                </div>
            </div>
            <div ref={messageContainerRef} className="p-4 h-3/4 overflow-y-scroll ">
                <div>

                    {
                        data && data?.messages.map((msg) => {
                            console.log(msg.user.id);
                            return (
                                <div>{
                                    +msg.user.id !== +localStorage.getItem("userId") ? (

                                        <div className="flex mb-4">
                                            <div

                                                className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2"
                                            >
                                                {/* {item?.user?.name.substring(0, 4)} */}
                                            </div>
                                            <div className="bg-blue-100 p-2 rounded-lg">
                                                <p className="text-blue-800">{msg?.message}</p>
                                            </div>
                                        </div>




                                    ) : (<div className="flex justify-end">
                                        <div className="bg-gray-200 p-2 rounded-lg">
                                            <p className="text-gray-600">{msg?.message}</p>
                                        </div>
                                    </div>)

                                }



                                </div>
                            )

                        })
                    }

                </div>

            </div>
            <form
                className="p-4 border-t border-gray-300 relative bottom-3"
            // onSubmit={handleChat}
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
    )
}

export default ChatWindow