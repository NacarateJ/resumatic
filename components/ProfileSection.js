import React, { useState } from 'react';
import SectionContainer from './SectionContainer';
import TextEditor from './TextEditor';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import { ScrollableInput } from '@mui/material/TextareaAutosize';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function ProfileSection({ resumeData, fetchResumeData }) {

  
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState(resumeData.profile_description || '');
  const [summaryError, setSummaryError] = useState('');

  const generateEnhancedSummary = async (inputSummary) => {
    // Check if the input summary is empty
    if (!inputSummary.trim()) {
      setSummaryError('Please enter your summary');
      return;
    }

    // Clear any previous error state
    setSummaryError('');

    // Set loading state while generating summary
    setLoading(true);

    const userInput = `I'm creating a summary for my resume, please rewrite it in a professional way. The summary should be written from the first-person point of view, it should be 2-3 short sentences expressing what I want to reflect to the employer, who I am, what the employer can expect from me, what's my specialization (BE/FE), why I am interested in this industry, my passions, interests, stack preferences, what type of products I like to create (intuitive, easy to use)... It should have max 485 characters: ${inputSummary}`;

    try {
      // Make an API request to the server with the summary content
      const response = await fetch('/api/get-ai-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ promptText: userInput }), // Sending the summary content to the server
      });

      if (response.ok) {
        const data = await response.json();
        // Set the generated summary and clear loading state
        setGeneratedSummary(data.completion);
        setLoading(false);
      } else {
        // Handle error cases here
        console.error('Failed to generate summary');
        setLoading(false);
      }
    } catch (error) {
      // Handle network errors
      console.error('Error occurred while generating summary:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if a generated summary exists
    if (!summary.trim()) {
      // Handle the case where no generated summary is available
      setSummaryError('Please generate a new summary before saving');
      return;
    }
   
    // Create an object with the enhanced summary
    const requestBody = {
      enhancedSummary: generatedSummary,
      resumeId: resumeData.resume_id,
    };

    try {
      // Make an API request to save the enhanced summary
      const response = await fetch('/api/profileSectionInsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        fetchResumeData(resumeData.resume_id);
        // Handle success, e.g., show a success message to the user
        console.log('Enhanced summary saved successfully');
      } else {
        // Handle error cases here
        console.error('Failed to save enhanced summary');
      }
    } catch (error) {
      // Handle network errors
      console.error('Error occurred while saving enhanced summary:', error);
    }
  };

  return (
    <SectionContainer>
      <Accordion sx={{ backgroundColor: 'WhiteSmoke', boxShadow: 'none' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Grid display='flex' alignItems='center'>
            <AccountBoxIcon style={{ fontSize: '2.25em' }} sx={{ pr: 1 }} />
            <Typography variant='h5'>Profile</Typography>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Box component='form' noValidate sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  id='profileSummary'
                  name='profileSummary'
                  label='Summary'
                  placeholder='Briefly introduce yourself: what you want to reflect to the employer, why are you interested in this industry, your passions, interests, stack preferences...'
                  fullWidth
                  variant='filled'
                  InputProps={{
                    style: {
                      backgroundColor: 'white',
                    },
                    inputComponent: ScrollableInput,
                  }}
                  inputProps={{
                    style: {
                      backgroundColor: 'white',
                      height: '100px',
                      paddingTop: '10px',
                      overflowY: 'auto',
                    },
                  }}
                  multiline
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  error={!!summaryError}
                  helperText={summaryError}
                />
              </Grid>
            </Grid>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button
                type='button' // Change type to "button"
                variant='contained'
                style={{
                  backgroundColor: '#00B4D8',
                }}
                sx={{ mt: 3, ml: 1 }}
                onClick={() => generateEnhancedSummary(summary)}
                disabled={loading}
              >
                Enhance
                <AutoFixHighIcon sx={{ fontSize: 20, ml: 1 }} />
              </Button>
            </div>

            {loading && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '20px',
                }}
              >
                <Typography variant='body1'>Generating Summary...</Typography>
              </div>
            )}

            {generatedSummary && !loading && (
              <div style={{ marginTop: '20px' }}>
                <Typography variant='h6'>Enhanced Summary:</Typography>
                <TextEditor generatedSummary={generatedSummary} />
              </div>
            )}

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
                type='submit' // Change type to "submit"
                variant='contained'
                style={{
                  backgroundColor: '#00B4D8',
                }}
                sx={{ mt: 3, ml: 1 }}
                onClick={handleSubmit}
              >
                Save Enhanced Summary
              </Button>
            </div>
          </Box>
        </AccordionDetails>
      </Accordion>
    </SectionContainer>
  );
}
