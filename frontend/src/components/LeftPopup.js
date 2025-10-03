import React from 'react'

const LeftPopup = (props) => {
  const {title,children}=props
  return (
    <div className="w-1/4 bg-[#FFFFFF] text-white p-4 absolute max-h-screen ">
      <div className="mb-4">
        <div className="flex items-center mt-2">
          <div className="flex">
            <p className="text-black mx-5 font-extrabold">{title}</p>
          </div>
        </div>
      </div>
        {children}
    </div>
  )
}

export default LeftPopup