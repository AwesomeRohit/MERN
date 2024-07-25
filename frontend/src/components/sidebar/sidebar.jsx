import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogoutButton from './LogoutButton'
function sidebar() {
  return (
    <div className='border-r border-slate-500 px-9'>

      <SearchInput />

      <div className='divider'></div>
      
      <Conversations />
      
      <LogoutButton />

    </div>
  )
}

export default sidebar
