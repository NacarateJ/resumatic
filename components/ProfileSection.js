import React, { useState } from 'react';
import SectionContainer from './SectionContainer';
import TextEditor from './TextEditor';
import CancelButton from './CancelButton';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function ProfileSection({ resumeData, fetchResumeData, isOpen, onToggleAccordion }) {
  const [summary, setSummary] = useState(resumeData.profile_description || '');
  const [userInput, setUserInput] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState('');
  const [isEnhancedSummaryUsed, setIsEnhancedSummaryUsed] = useState(false);
  const [summaryError, setSummaryError] = useState('');
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const generateEnhancedSummary = async (inputSummary) => {
    if (!inputSummary.trim()) {
      setSummaryError('Please enter your summary');
      return;
    }

    setSummaryError('');

    setLoading(true);

    const userInput = `I'm creating a summary for my resume, please rewrite it in a professional way. The summary should be written from the first-person point of view based on the provided information: ${inputSummary}. It should be 2-3 short sentences expressing what I want to reflect to the employer, who I am, what the employer can expect from me, what's my specialization (BE/FE), why I am interested in this industry, my passions, interests, stack preferences, what type of products I like to create (intuitive, easy to use)... It should have max 485 characters.`;

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
        setEditorContent(data.completion);
        setLoading(false);
      } else {
        console.error('Failed to generate summary');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error occurred while generating summary:', error);
      setLoading(false);
    }
  };

  const handleSummaryChange = (event) => {
    // Update the summary text based on user input
    const newUserInput = event.target.value;
    setSummary(newUserInput);
    setUserInput(newUserInput);
  };
  
  const handleUseEnhancedSummaryChange = () => {
    // Toggle the useEnhancedSummary state
    setIsEnhancedSummaryUsed(!isEnhancedSummaryUsed);

    // If switching to enhanced summary, set the summary text to the generated summary
    if (!isEnhancedSummaryUsed && generatedSummary) {
      setSummary(generatedSummary);
      setEditorContent('');
    } else {
      // If switching back to original summary, reset the summary text to the original value
      setSummary(userInput || resumeData.profile_description);
      setEditorContent(generatedSummary);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!summary.trim()) {
      setSummaryError('Please generate a new summary before saving');
      return;
    }
   
    const finalSummary = isEnhancedSummaryUsed ? generatedSummary : summary;

    const requestBody = {
      enhancedSummary: finalSummary,
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
        console.log('Enhanced summary saved successfully');
      } else {
        console.error('Failed to save enhanced summary');
      }
    } catch (error) {
      console.error('Error occurred while saving enhanced summary:', error);
    }
  };

   const handleCancel = () => {
     setIsAccordionOpen(false);
   };

  return (
    <SectionContainer>
      <Accordion
        sx={{ backgroundColor: 'WhiteSmoke', boxShadow: 'none' }}
        expanded={isOpen}
        onChange={onToggleAccordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
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
                  }}
                  inputProps={{
                    style: {
                      backgroundColor: 'white',
                      paddingTop: '10px',
                    },
                  }}
                  multiline={true}
                  rows={10}
                  value={isEnhancedSummaryUsed ? generatedSummary : summary}
                  onChange={handleSummaryChange}
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
                type='button'
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
                <Typography variant='h6' sx={{ mb: 1 }}>
                  Enhanced Summary:
                </Typography>
                <TextEditor
                  editorContent={editorContent}
                  useEnhancedSummary={isEnhancedSummaryUsed}
                />
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isEnhancedSummaryUsed}
                        onChange={handleUseEnhancedSummaryChange}
                        sx={{
                          color: 'default',
                          '&.Mui-checked': {
                            color: '#00B4D8',
                          },
                        }}
                      />
                    }
                    label='Use Enhanced Summary'
                    sx={{ mt: 1 }}
                  />
                </FormGroup>
              </div>
            )}
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
                onClick={handleSubmit}
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
