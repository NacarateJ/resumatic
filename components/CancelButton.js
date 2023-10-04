import React, { useState } from 'react';
import Button from '@mui/material/Button';

export default function CancelButton({ onClick }) {
  return (
    <Button
      style={{
        color: '#00B4D8',
      }}
      sx={{mt: 3}}
      onClick={onClick}
    >
      Cancel
    </Button>
  );
}
