
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SectionContainer from './SectionContainer';
import PsychologyIcon from '@mui/icons-material/Psychology';
import {
  Grid,
  Accordion,
  AccordionSummary,
  Typography,
  Button,
  TextField,
  AccordionDetails,
  Box,
} from '@mui/material';
import { useState, useEffect } from 'react';

export default function LanguageSection({ resumeData, fetchResumeData, resumeId }) {


  const [progLang, setProgLang] = useState(resumeData.skills?.[0]?.skill_name || "");
  const [frmwrkLibDb, setfrmwrkLibDb] = useState(resumeData.skills?.[1]?.skill_name || "");
  const [toolsTech, settoolsTech] = useState(resumeData.skills?.[2]?.skill_name || "");





  const handleSubmit = async (event, skillDescription) => {
    event.preventDefault();

    try {
      let formData;
      if (skillDescription === "Programming Languages") {
        formData = { resumeId: resumeId, skill: progLang, skillDescription: "Programming Languages" };
      } else if (skillDescription === "Frameworks, Libraries & Databases Description") {
        formData = { resumeId: resumeId, skill: frmwrkLibDb, skillDescription: "Frameworks, Libraries & Databases Description" };
      } else if (skillDescription === 'Tools & Other Technologies') {
        formData = { resumeId: resumeId, skill: toolsTech, skillDescription: 'Tools & Other Technologies' };
      }

      const response = await fetch('/api/skillSectionInsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      <SectionContainer>
        <Accordion sx={{ backgroundColor: 'WhiteSmoke', boxShadow: 'none' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Grid display='flex' alignItems='center'>
              <PsychologyIcon style={{ fontSize: '2.25em' }} sx={{ pr: 1 }} />
              <Typography variant='h5'>Skills</Typography>
            </Grid>
          </AccordionSummary>

          <Accordion sx={{ backgroundColor: 'WhiteSmoke', boxShadow: 'none' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography variant='h6'>Programming Languages</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box component='form' sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id='programmingLanguages'
                      name='programmingLanguages'
                      label='(Eg. Python, Javascript, Ruby)'
                      fullWidth
                      value={progLang}
                      onChange={((e) => setProgLang(e.target.value))}
                      variant='filled'
                      inputProps={{ style: { backgroundColor: 'white' } }}
                    />
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
                    onClick={(event) => handleSubmit(event, 'Programming Languages')}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Save
                  </Button>
                </div>
              </Box>
            </AccordionDetails>
          </Accordion >
          <Accordion sx={{ backgroundColor: 'WhiteSmoke', boxShadow: 'none' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography variant='h6'>Frameworks, Libraries & Databases</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box component='form' sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id='frameworksLibrariesDatabases'
                      name='frameworksLibrariesDatabases'
                      label='Eg. Express, React, PostgreSQL'
                      value={frmwrkLibDb}
                      onChange={((e) => setfrmwrkLibDb(e.target.value))}
                      fullWidth
                      variant='filled'
                      inputProps={{ style: { backgroundColor: 'white' } }}
                    />

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
                    onClick={(event) => handleSubmit(event, 'Frameworks, Libraries & Databases Description')}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Save
                  </Button>
                </div>
              </Box>
            </AccordionDetails>          </Accordion >
          <Accordion sx={{ backgroundColor: 'WhiteSmoke', boxShadow: 'none' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography variant='h6'>Tools & Other Technologies</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box component='form' sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id='skill'
                      name='skill'
                      label='Eg. GitHub, Sublime Text, Figma'
                      value={toolsTech}
                      onChange={((e) => settoolsTech(e.target.value))}
                      fullWidth
                      variant='filled'
                      inputProps={{ style: { backgroundColor: 'white' } }}
                    />

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
                    onClick={(event) => handleSubmit(event, 'Tools & Other Technologies')}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Save
                  </Button>
                </div>
              </Box>
            </AccordionDetails>          </Accordion >
        </Accordion>
      </SectionContainer>
    </>
  );
}