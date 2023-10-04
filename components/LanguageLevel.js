import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function LanguageLevel({ languageLevel, selectedLevel, handleLevelChange }) {


  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Level</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedLevel}
          label="Level"
          onChange={handleLevelChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Beginner">Beginner</MenuItem>
          <MenuItem value="Elementary">Elementary Proficiency</MenuItem>
          <MenuItem value="Limited">Limited Working Proficiency</MenuItem>
          <MenuItem value="Professional">Professional Working Proficiency</MenuItem>
          <MenuItem value="Native">Native / Bilingual Proficiency</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
