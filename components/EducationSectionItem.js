import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Box,
  Button,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  AdapterDayjs,
  LocalizationProvider,
  DatePicker,
} from '@mui/x-date-pickers';
import CancelButton from './CancelButton';
import {
  fromStringToDate,
  fromDateToString,
} from '../utils/dateParser';

export default function EducationSectionItem({
  educationNum,
  educationData,
  fetchResumeData,
  resumeId,
  isOpen,
  onToggleAccordion
}) {
  // State for education data if exists for given resume
  const [educState, setEducState] = useState(educationData || null);

  // State of form data for given resume
  const [formState, setFormState] = useState(
    educationData ? educationData : { resume_id: resumeId }
  );
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  // State managmenent for generates summary
  // const [loading, setLoading] = useState(false);
  // const [summaryError, setSummaryError] = useState('');
  // const [generatedSummary, setGeneratedSummary] = useState('');

  // const generateEnhancedSummary = async (input) => {
  //   // Check if the input summary is empty
  //   if (!input.trim()) {
  //     setSummaryError('Please enter your summary');
  //     return;
  //   }

  //   // Clear any previous error state
  //   setSummaryError('');

  //   // Set loading state while generating summary
  //   setLoading(true);

  //   const educationSummary = `you are a professional resume writer that is editing a clients resume, rewrite this section to be more professional. no longer than 4 sentences: ${summary}`;

  //   try {
  //     // Make an API request to the server with the summary content
  //     const response = await fetch('/api/get-ai-response', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ promptText: educationSummary }), // Sending the summary content to the server
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       // Set the generated summary and clear loading state
  //       setGeneratedSummary(data.completion);
  //       setLoading(false);
  //     } else {
  //       // Handle error cases here
  //       console.error('Failed to generate summary');
  //       setLoading(false); // Clear loading state in case of error
  //     }
  //   } catch (error) {
  //     // Handle network errors
  //     console.error('Error occurred while generating summary:', error);
  //     setLoading(false); // Clear loading state in case of error
  //   }
  // };

  const handleChange = (fieldName, value) => {
    setFormState({ ...formState, [fieldName]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/educationSectionInsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: formState,
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

  const handleCancel = () => {
    setFormState({ ...educState });
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
        <Typography variant='h8'>{educationNum}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          component='form'
          onSubmit={(event) => handleSubmit(event)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id='degree'
                name='degree'
                label='Degree'
                fullWidth
                autoComplete='degree'
                variant='filled'
                value={formState?.degree || ''}
                onChange={(event) => handleChange('degree', event.target.value)}
                inputProps={{ style: { backgroundColor: 'white' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='school'
                name='school'
                label='School'
                fullWidth
                variant='filled'
                autoComplete='School Name'
                value={formState?.school_name || ''}
                onChange={(event) =>
                  handleChange('school_name', event.target.value)
                }
                inputProps={{ style: { backgroundColor: 'white' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='city'
                name='city'
                label='City'
                fullWidth
                variant='filled'
                autoComplete='City'
                value={formState?.city || ''}
                onChange={(event) => handleChange('city', event.target.value)}
                inputProps={{ style: { backgroundColor: 'white' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='country'
                name='country'
                label='Country'
                fullWidth
                variant='filled'
                autoComplete='Country'
                value={formState?.country || ''}
                onChange={(event) =>
                  handleChange('country', event.target.value)
                }
                inputProps={{ style: { backgroundColor: 'white' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='gpa'
                name='gpa'
                label='GPA'
                fullWidth
                variant='filled'
                autoComplete='GPA'
                value={formState?.gpa || 0.0}
                onChange={(event) =>
                  handleChange('gpa', Number.parseFloat(event.target.value))
                }
                inputProps={{ style: { backgroundColor: 'white' } }}
              />
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid
              container
              spacing={1}
              justifyContent='space-evenly'
              columnSpacing={6}
            >
              <Grid justifyContent='flex-start' item xs={5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label={'Start Date'}
                    views={['month', 'year']}
                    value={
                      formState?.start_date
                        ? fromStringToDate(formState.start_date)
                        : null
                    }
                    onChange={(date) =>
                      handleChange('start_date', fromDateToString(date))
                    }
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
                    value={
                      formState?.end_date
                        ? fromStringToDate(formState.end_date)
                        : null
                    }
                    onChange={(date) =>
                      handleChange('end_date', fromDateToString(date))
                    }
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
          <Grid container spacing={3} sx={{ pt: 3 }}>
            <Grid item xs={12}>
              <TextField
                id='educationDescription'
                name='educationDescription'
                label='Education Description'
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
                autoComplete='Describe in few word your education'
                value={formState?.education_description || ''}
                onChange={(event) =>
                  handleChange('education_description', event.target.value)
                }
              />
            </Grid>
          </Grid>
          {/* <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
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
              <Typography variant='h6'>Generated Summary:</Typography>
              <TextEditor generatedSummary={generatedSummary} />
            </div>
          )} */}

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
  );
}
