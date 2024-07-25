import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import useConversation from '../../zustand/useConversation'
import { AuthContext, useAuthContext } from '../../context/AuthContext';

function MessageContainer() {

      const {selectedConversation, setSelectedConversation}=useConversation();

      //cleanup function
      useEffect(()=>{
          return () =>  setSelectedConversation(null);
      }, [setSelectedConversation])

  return (
  
        <div className='min-w-24 flex flex-col  '>
          
           {!selectedConversation ? (<NoChatSelected/>) : (
         <>
             
               <div className=' bg-gray-700 px-40 py-4 mb-2 '>
                <span className='label-text '>To:</span><span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
               </div>
               <Messages/>
               <MessageInput/>
         </>
)}
        </div>

  )
}

export default MessageContainer

const NoChatSelected = () =>{

      const{authUser} = useAuthContext();

      return(
               <div className='flex items-center justify-center w-full h-full'>

                  <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                        <p>Welcome ${authUser.username}</p>
                        <p>Select a chat to start messaging</p>

                  </div>
               </div>
      )
}