import React, { useEffect, useRef } from 'react'
import { AiOutlineSend } from 'react-icons/ai'

const ChatWindow = (props) => {
    const {chatId}=props
    const messageRef=useRef()

    useEffect(()=>{

        


    },[chatId])

    function handleChat(e) {
        e.preventDefault()
             console.log("chatid",chatId,messageRef.current.value);

    }
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
            <div className="p-4 h-3/4 overflow-y-scroll ">





                <div>
                    <div className="flex mb-4">
                        <div

                            className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2"
                        >
                            {/* {item?.user?.name.substring(0, 4)} */}
                        </div>
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <p className="text-blue-800">good</p>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="bg-gray-200 p-2 rounded-lg">
                            <p className="text-gray-600">bad</p>
                        </div>
                    </div>
                </div>

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
    )
}

export default ChatWindow