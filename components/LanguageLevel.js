import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function LanguageLevel() {
  const [level, setLevel] = React.useState('');

  const handleChange = (event) => {
    setLevel(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Level</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={level}
          label="Level"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="beginner">Beginner</MenuItem>
          <MenuItem value="elementary">Elementary Proficiency</MenuItem>
          <MenuItem value="limited">Limited Working Proficiency</MenuItem>
          <MenuItem value="professional">Professional Working Proficiency</MenuItem>
          <MenuItem value="native">Native / Bilingual Proficiency</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
