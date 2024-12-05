import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";
import { TextField, IconButton, InputAdornment } from "@mui/material";

function SearchInput() {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleInput = async (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Enter At least 3 Characters to search");
    }
    const conversation = conversations.find((c) =>
      c.username.toLowerCase().includes(search.toLocaleLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("Conversation does not exist");
  };

  return (
    <form onSubmit={handleInput} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" edge="end">
                <IoSearchSharp style={{ fontSize: "24px", color: "#00796b" }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          borderRadius: "50px",
          backgroundColor: "transparent",
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#212121", // Slight dark background for input field
            borderRadius: "50px",
          },
          "& .MuiInputLabel-root": {
            color: "#B0BEC5", // Light gray label color
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#00796b", // Border color on focus
          },
        }}
      />
    </form>
  );
}

export default SearchInput;
