import React from 'react';
import Conversation from './Conversation';
import useGetConversations from '../../hooks/useGetConversations';
import useConversation from '../../zustand/useConversation';

function Conversations() {
  const { loading, conversations } = useGetConversations();

  
  

  return (
    <div className='flex py-2 flex-col overflow-auto'>
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
      {loading ? <span className='loading loading-spinner'></span> : null}
    </div>
  );
}

export default Conversations;
