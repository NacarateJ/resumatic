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
import {
  fromStringToDate,
  fromDateToString,
  defaultDate,
} from '../utils/dateParser';
import dayjs from 'dayjs';


export default function ProjectSectionItem({
  fetchResumeData,
  projectNum,
  projectData,
  resumeId,
  isOpen, 
  onToggleAccordion }) {

  const [projectTitle, setProjectTitle] = useState(projectData?.project_title || '');
  const [projectLink, setProjectLink] = useState(projectData?.project_link || '');
  const [startDate, setStartDate] = useState(
    projectData?.start_date ? dayjs(projectData.start_date) : null
  );
  const [endDate, setEndDate] = useState(
    projectData?.end_date ? dayjs(projectData.end_date) : null
  );
  const [summary, setSummary] = useState(
    projectData?.project_description || ''
  );
  const [userInput, setUserInput] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState('');
  const [summaryError, setSummaryError] = useState('');
  const [isEnhancedSummaryUsed, setIsEnhancedSummaryUsed] = useState(false);
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

    const userInput = `I'm creating a description for a project that I worked on for my resume, please rewrite it in a professional way. The description should be written from the first-person point of view, it should be 2-3 short sentences in a rounded bullet point form expressing to the employer what my role was in the project and the technologies I used along with what skills were necessary and how I demonstrated my expertise: ${inputSummary}`;

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

    const requestBody = {
      resumeId,
      projectTitle,
      projectLink,
      endDate: endDate ? endDate.format('MMMM, YYYY') : null,
      enhancedSummary: finalSummary,
      startDate: startDate ? startDate.format('MMMM, YYYY') : null,
    };

    try {
      const response = await fetch('/api/projectSectionInsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: requestBody }),
      });

      if (response.ok) {
        fetchResumeData(resumeId);
        console.log('Project saved successfully');
      } else {
        console.error('Failed to save project');
      }
    } catch (error) {
      console.error('Error occurred while saving project:', error);
    }
  };

  const handleCancel = () => {
    setIsAccordionOpen(false);
  };
  return (
    <>
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
          <Typography variant='h8'>{projectNum}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box component='form' sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  id='projectTitle'
                  name='projectTitle'
                  label='Project Name'
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  fullWidth
                  autoComplete='projectTitle'
                  variant='filled'
                  inputProps={{ style: { backgroundColor: 'white' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='projectLink'
                  name='projectLink'
                  label='Project Link'
                  value={projectLink}
                  onChange={(e) => setProjectLink(e.target.value)}
                  fullWidth
                  autoComplete='projectLink'
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
                <Typography variant='h6'>Summary Suggestion:</Typography>
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
                onClick={handleSubmit}
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
