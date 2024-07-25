import React from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import MessageContainer from '../../components/messages/MessageContainer'

function home() {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-transparent bg-clip-padding backdrop-filter backdrop-blur-lg lg-opacity-0'>
         
    <Sidebar/>
    <div className='divider'></div>
    <MessageContainer/>
         
    </div>
  )
}

export default home
