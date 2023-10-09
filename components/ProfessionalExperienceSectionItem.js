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
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import {
  AdapterDayjs,
  LocalizationProvider,
  DatePicker,
} from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CancelButton from './CancelButton';

export default function ProfessionalExperienceSectionItem({
  experienceNum,
  workExp,
  fetchResumeData,
  resumeId,
  isOpen,
  onToggleAccordion
}) {
  const [jobTitle, setJobTitle] = useState(workExp?.job_title || '');
  const [employer, setEmployer] = useState(workExp?.employer || '');
  const [city, setCity] = useState(workExp?.city || '');
  const [country, setCountry] = useState(workExp?.country || '');
  const [startDate, setStartDate] = useState(
    workExp?.start_date ? dayjs(workExp.start_date) : null
  );
  const [endDate, setEndDate] = useState(
    workExp?.end_date ? dayjs(workExp.end_date) : null
  );
  const [summary, setSummary] = useState('');
  const [userInput, setUserInput] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState(
    workExp?.experience_description || ''
  );
   const [isEnhancedSummaryUsed, setIsEnhancedSummaryUsed] = useState(false);
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

    const userInput = `I'm writing a description for one of my work experiences for my resume, please rewrite it in a professional way. The description should be written from the first-person point of view based on the provided infoirmation: ${inputSummary}. It should be 2-3 short sentences in bullet point form expressing to the employer what my role was at the company and the technologies I used along with the skills and expertise I used in the position. It should have max 485 characters.`;

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

    // Create an object with the enhanced summary
    const requestBody = {
      resumeId,
      city,
      country,
      employer,
      endDate: endDate ? endDate.format('MMMM, YYYY') : null,
      enhancedSummary: finalSummary,
      jobTitle,
      startDate: startDate ? startDate.format('MMMM, YYYY') : null,
    };

    try {
      // Make an API request to save work exp
      const response = await fetch('/api/professionalExpInsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: requestBody }),
      });

      if (response.ok) {
        fetchResumeData(resumeId);
        // Handle success, e.g., show a success message to the user
        console.log('Work experience saved successfully');
      } else {
        // Handle error cases here
        console.error('Failed to save work experience');
      }
    } catch (error) {
      // Handle network errors
      console.error('Error occurred while saving work experience:', error);
    }
  };

  const handleCancel = () => {
    setIsAccordionOpen(false);
  };

  return (
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
        <Typography variant='h8'>{experienceNum}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box component='form' sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id='jobTitle'
                name='jobTitle'
                label='Job Title'
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                fullWidth
                autoComplete='jobTitle'
                variant='filled'
                inputProps={{ style: { backgroundColor: 'white' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id='employer'
                name='employer'
                label='Employer'
                value={employer}
                onChange={(e) => setEmployer(e.target.value)}
                fullWidth
                autoComplete='employer'
                variant='filled'
                inputProps={{ style: { backgroundColor: 'white' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='city'
                name='city'
                label='City'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                fullWidth
                variant='filled'
                inputProps={{ style: { backgroundColor: 'white' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='country'
                name='country'
                label='Country'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                fullWidth
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
                    value={startDate}
                    onChange={(date) => setStartDate(dayjs(date))}
                  />
                </LocalizationProvider>
                {/* <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Don't Show" />
                  <FormControlLabel control={<Checkbox />} label='Only Year' />
                </FormGroup> */}
              </Grid>
              <Grid justifyContent='flex-start' item xs={5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label={'End Date'}
                    views={['month', 'year']}
                    value={endDate}
                    onChange={(date) => setEndDate(dayjs(date))}
                  />
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
                id='experienceSummary'
                name='experienceSummary'
                label='Summary'
                placeholder='Describe your work experience including what your role was and the technologies and skills you used.'
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
              type='submit' // Change type to "submit"
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
  );
}
