import React from 'react';
import { Container, Divider, Box } from '@mui/material';
import SearchInput from './SearchInput';
import Conversations from './Conversations';
import LogoutButton from './LogoutButton';

function Sidebar() {
  return (
    <Container
      maxWidth="xs" // Limits the width to 'xs' (extra small)
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh', // Full height
        backgroundColor: 'grey.900', // Grey background for sidebar
        padding: 2, // Padding for the content inside
        borderRadius: 1, // Optional: rounded corners
        boxShadow: 2, // Optional: adds depth/shadow to the sidebar
        position: 'relative', // To control positioning if needed
      }}
    >
      <SearchInput />

      <Divider sx={{ my: 1 }} /> {/* Divider between SearchInput and Conversations */}
      
      <Conversations />

      <Box sx={{ marginTop: 'auto' }}> {/* Push LogoutButton to the bottom */}
        <LogoutButton />
      </Box>
    </Container>
  );
}

export default Sidebar;
