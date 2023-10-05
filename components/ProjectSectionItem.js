import React, { useState } from 'react';
import TextEditor from './TextEditor';
import {
  AccordionDetails,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Checkbox,
  Accordion,
  AccordionSummary,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import { ScrollableInput } from '@mui/material/TextareaAutosize';
import {
  AdapterDayjs,
  LocalizationProvider,
  DatePicker,
} from '@mui/x-date-pickers';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CancelButton from './CancelButton';

export default function ProjectSectionItem({ projectNum }) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState('');
  const [summaryError, setSummaryError] = useState('');
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

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

    const userInput = `I'm creating a description for a project that I worked on for my resume, please rewrite it in a professional way. The description should be written from the first-person point of view, it should be 2-3 short sentences expressing to the employer what my role was in the project and teh technologies I used along with what skills were necessary and demonstrate how I used my expertise. It should have max 485 characters: ${inputSummary}`;

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

    // Call generateEnhancedSummary to generate the enhanced summary
    await generateEnhancedSummary(summary);

    // Rest of your form submission logic goes here, if any
    // For example, you can handle form data and make another API call if needed.
    const data = new FormData(event.currentTarget);
    console.log({
      data,
      summary,
      generatedSummary, // You can access the generated summary here if needed
    });

    // Add additional logic to handle form submission, if necessary
  };

  const handleCancel = () => {
    setIsAccordionOpen(false);
  };

  return (
    <>
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
          <Typography variant='h8'>{projectNum}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box component='form' sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  id='projectName'
                  name='projectName'
                  label='Project Name'
                  fullWidth
                  autoComplete='project'
                  variant='filled'
                  inputProps={{ style: { backgroundColor: 'white' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='projectLink'
                  name='projectLink'
                  label='Project Link'
                  fullWidth
                  autoComplete='project'
                  variant='filled'
                  inputProps={{ style: { backgroundColor: 'white' } }}
                />
              </Grid>
              <Grid item xs={12}></Grid>
              <Grid
                container
                spacing={1}
                justifyContent='space-evenly'
                columnSpacing={6}
                sx={{ mb: 2 }}
              >
                <Grid justifyContent='flex-start' item xs={5}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label={'Start Date'}
                      views={['month', 'year']}
                    />
                  </LocalizationProvider>
                  {/* <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Don't Show"
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label='Only Year'
                    />
                  </FormGroup> */}
                </Grid>
                <Grid justifyContent='flex-start' item xs={5}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label={'End Date'} views={['month', 'year']} />
                  </LocalizationProvider>
                  {/* <FormControlLabel control={<Checkbox />} label="Don't Show" />
                  <FormControlLabel control={<Checkbox />} label='Only Year' />
                  <FormControlLabel
                    control={<Checkbox />}
                    label='Present (Current)'
                  /> */}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  id='projectSummary'
                  name='projectSummary'
                  label='Summary'
                  placeholder='Describe your project including what your role was in the project and the technologies and skills you used.'
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
                      // overflowY: 'auto',
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
                <Typography variant='h6'>Summary Suggestion:</Typography>
                <TextEditor generatedSummary={generatedSummary} />
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
                type='submit' // Change type to "submit"
                onClick={(event) => handleSubmit(event)}
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
    </>
  );
}
