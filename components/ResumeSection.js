import SectionContainer from './SectionContainer';
import CancelButton from './CancelButton';
import {
  Box,
  Grid,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

export default function ResumeSection({ resumeData, resumeId, }) {


  const [resumeTitle, setResumeTitle] = useState(resumeData.resume_title || '');
  const [resumeDescription, setResumeDescription] = useState(resumeData.resume_description || '');
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();



    try {
      const response = await fetch('/api/resumeSectionInsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dataType: 'resume', // Specify the data type as 'resume'
          data: {
            resumeId: resumeId,
            resumeTitle,
            resumeDescription,
          },
        }),
      });

      if (response.ok) {
        const responseData = await response.json();

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

  const handleCancel = () => {
    setIsAccordionOpen(false);
  };

  return (
    <SectionContainer>
      <Accordion
        sx={{ backgroundColor: 'WhiteSmoke', boxShadow: 'none' }}
        expanded={isAccordionOpen}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        >
          <Typography variant='h5'>Resume</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  id='resumeTitle'
                  name='resumeTitle'
                  label='Title'
                  value={resumeTitle}
                  onChange={(e) => setResumeTitle(e.target.value)}
                  fullWidth
                  variant='filled'
                  inputProps={{
                    style: { backgroundColor: 'white', overflowY: 'auto' },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='resumeDescription'
                  name='resumeDescription'
                  label='Description'
                  value={resumeDescription}
                  onChange={(e) => setResumeDescription(e.target.value)}
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
              <CancelButton onClick={handleCancel} />
              <Button
                type='submit'
                variant='contained'
                style={{
                  backgroundColor: '#00B4D8',
                }}
                sx={{ mt: 3, ml: 1 }}
              >
                Save
              </Button>
            </div>
          </Box>
        </AccordionDetails>
      </Accordion>
    </SectionContainer>
  );
}