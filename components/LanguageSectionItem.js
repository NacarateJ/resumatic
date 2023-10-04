import { useState } from 'react';
import {
  Grid,
  AccordionDetails,
  TextField,
  Box,
  Button,
  Accordion,
  AccordionSummary,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LanguageLevel from './LanguageLevel';



export default function LanguageSectionItem({ languageName, languageLevel, fetchResumeData, resumeId }) {
  const [selectedLevel, setSelectedLevel] = useState(languageLevel || '');
  const [langName, setLangName] = useState(languageName || "");
  const handleLevelChange = (event) => {
    const selectedValue = event.target.value;
    if (['', 'Beginner', 'Elementary', 'Limited', 'Professional', 'Native'].includes(selectedValue)) {
      setSelectedLevel(selectedValue);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let formData = {
        resumeId: resumeId,
        langName: langName,
        selectedLevel: selectedLevel,
      };
      console.log(formData);
      const response = await fetch('/api/languageSectionInsert', {
        method: "Post",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          data: formData,
        }),

      });


      if (response.ok) {
        const responseData = await response.json();
        fetchResumeData(resumeId);
        // Handle the response data as needed, e.g., show a success message.
      } else {
        console.error('Error inserting resume data:', response.statusText);
        // Handle error and display an error message to the user.
      }
    } catch (error) {
      console.error('Error inserting resume data:', error);
      // Handle network errors or other exceptions.
    }
  };

  return (
    <>

      <Accordion sx={{ backgroundColor: 'WhiteSmoke', boxShadow: 'none' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography variant='h8'>Language #3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box component='form' sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  id='language'
                  name='language'
                  label='Enter Language'
                  value={langName}
                  onChange={((e) => setLangName(e.target.value))}
                  variant='filled'
                  inputProps={{ style: { backgroundColor: 'white' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <LanguageLevel languageLevel={languageLevel} selectedLevel={selectedLevel} handleLevelChange={handleLevelChange} />
              </Grid>
            </Grid>

            <div
              style={{
                display: 'flex',
                justifyContent: 'right',
              }}
            >
              <Button
                style={{
                  color: '#00B4D8',
                }}
                sx={{ mt: 3, ml: 1 }}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                variant='contained'
                style={{
                  backgroundColor: '#00B4D8',
                }}
                onClick={(event) => handleSubmit(event)}
                sx={{ mt: 3, ml: 1 }}
              >
                Save
              </Button>
            </div>
          </Box>
        </AccordionDetails>
      </Accordion >
    </>
  );
};
