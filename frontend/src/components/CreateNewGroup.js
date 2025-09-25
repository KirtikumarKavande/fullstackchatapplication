import React from 'react'
import FriendList from './FriendList'

const CreateNewGroup = ({setIsCreateNewGroup}) => {
  return (
    <FriendList isPersonalChat={false} setIsCreateNewGroup={setIsCreateNewGroup}/>

  )
}

export default CreateNewGroup