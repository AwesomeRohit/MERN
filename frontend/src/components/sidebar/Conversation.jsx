import React from 'react';
import useConversation from '../../zustand/useConversation';
import { useSocketContext } from '../../context/SocketContext';

function Conversation({ conversation, lastIdx }) {
    const {selectedConversation, setSelectedConversation} = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  const {onlineUsers} = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id)

    return (
        <>
            <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-2 cursor-pointer
                 ${isSelected ? "bg-sky-500" : ""}
            `} onClick={()=> setSelectedConversation(conversation)}>
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className="w-10 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between'>
                        <p className='font-bold text-slate-100'>{conversation.username}</p>
                        <span>Last Message</span>
                    </div>
                </div>
            </div>
            {!lastIdx  && <div className='divider py-0 my-0 h-1'></div>}
        </>
    );
}

export default Conversation;
