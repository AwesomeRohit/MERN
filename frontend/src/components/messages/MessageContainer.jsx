import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import useConversation from '../../zustand/useConversation'
import { AuthContext, useAuthContext } from '../../context/AuthContext';

function MessageContainer() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  // Cleanup function
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className='flex flex-col min-h-screen w-full'>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className='bg-gray-700 px-2 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 mb-2'>
            <span className='text-gray-200 text-xs sm:text-sm md:text-base lg:text-lg'>
              To:
            </span>
            <span className='text-gray-100 font-bold ml-1 text-xs sm:text-sm md:text-base lg:text-lg'>
              {selectedConversation.username}
            </span>
          </div>
          <div className='flex-grow overflow-auto'>
            <Messages />
          </div>
          <div className='p-1 sm:p-2 md:p-3'>
            <MessageInput />
          </div>
        </>
      )}
    </div>
  );
}

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();

  return (
    <div className='flex items-center justify-center w-full h-full p-2 sm:p-4'>
      <div className='text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-200 font-semibold flex flex-col items-center gap-1 sm:gap-2'>
        <p>Welcome {authUser.username}</p>
        <p>Select a chat to start messaging</p>
      </div>
    </div>
  );
}
