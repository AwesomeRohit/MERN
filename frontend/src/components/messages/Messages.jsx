import  { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../../skeleton/MessageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';

function Messages() {

  const { messages, loading } = useGetMessages();
  useListenMessages();
   const LastMessageRef = useRef();
    useEffect(()=>{
      setTimeout(()=>{
      LastMessageRef.current?.scrollIntoView({behavior: "smooth"});
      },100);
    },[messages]);
   return (
    <div className='px-4 overflow-auto flex-1 '>
      {!loading && messages.length > 0 && messages.map((message) => (
        <div key={message._id} ref={LastMessageRef}>
          <Message message={message} />
        </div>
      ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className='text-center'>Please a send a message to start the conversation </p>
      )}






    </div>
  )
}

export default Messages
