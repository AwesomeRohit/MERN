import React, { useState } from 'react'
import {IoSearchSharp} from "react-icons/io5"
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';
import toast from 'react-hot-toast';
function SearchInput() {

  const [search, setSearch] = useState("");
  const {setSelectedConversation} = useConversation();
  const {conversations} = useGetConversations();



  const handleInput = async (e) =>{
    e.preventDefault();
    if(!search) return;
    if(search.length < 3){
      return toast.error("Enter Atleast 3 Characters to search");
    }
    const conversation = conversations.find((c)=> c.username.toLowerCase().includes(search.toLocaleLowerCase()))
    if(conversation){
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error ("does not exists");

  }
  return (
       
       <form  onSubmit={handleInput} className='flex gap-2 items-center'>
        <input type="text" placeholder="Search" className='input input-bordered rounded-full' 
        value={search} onChange={(e)=> setSearch(e.target.value)}
        />
         <button type='submit' className='btn btn-circle bg-sky-500 text-white'><IoSearchSharp className='2-6 h-6 outline-none'></IoSearchSharp></button>
     
       </form>
  )
}

export default SearchInput
