import React, { useState } from 'react'
import useSendMessage from '../../hooks/useSendMessage';
function MessageInput() {

  const [message, setMessage] = useState("");
  const {loading, sendMessage} = useSendMessage();
  const handleInput = async (e) =>{
    e.preventDefault();
    if(!message) return;
    await sendMessage(message);
    setMessage("");

  }
  return (
  <form className='px-4 my-3' onSubmit={handleInput}>
        <div className='w-full relative'>
            <input className='border text-sm rounded-lg bg-transparent block w-full p-2.5 border-white text-white' type='text' placeholder='Message' value={message} 
             onChange={(e)=> setMessage(e.target.value) }
            ></input>
        <button type='submit ' className='absolute inset-y-0 end-0 flex items-center pe-3 '>
          Send
        </button>
        </div>
  </form>
  )
}

export default MessageInput
