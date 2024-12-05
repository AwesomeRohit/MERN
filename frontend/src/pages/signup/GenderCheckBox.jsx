import React from 'react';
import { FormControlLabel, Checkbox, Box } from '@mui/material';

function GenderCheckBox({ onCheckBoxChange, selectedGender }) {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedGender === 'male'}
            onChange={() => onCheckBoxChange('male')}
            color="primary"
          />
        }
        label="Male"
        sx={{
          '& .MuiCheckbox-root': {
            borderColor: selectedGender === 'male' ? '#1976d2' : '#ccc',
          },
        }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedGender === 'female'}
            onChange={() => onCheckBoxChange('female')}
            color="primary"
          />
        }
        label="Female"
        sx={{
          '& .MuiCheckbox-root': {
            borderColor: selectedGender === 'female' ? '#1976d2' : '#ccc',
          },
        }}
      />
    </Box>
  );
}

export default GenderCheckBox;
