import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Checkbox,
  Box,
  Button,
  Typography,
} from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import { useState } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ScrollableInput } from '@mui/material/TextareaAutosize';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function EducationSectionItem() {

  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [generatedSummary, setGeneratedSummary] = useState('');

  const generateEnhancedSummary = async () => {
    // Set loading state while generating summary
    setLoading(true);

    const educationSummary = `you are a professional resume writer that is editing a clients resume, rewrite this section to be more professional. no longer than 4 sentences: ${summary}`;

    try {
      // Make an API request to the server with the summary content
      const response = await fetch('/api/get-ai-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ promptText: educationSummary }), // Sending the summary content to the server
      });

      if (response.ok) {
        const data = await response.json();
        // Set the generated summary and clear loading state
        setGeneratedSummary(data.completion);
        setLoading(false);
      } else {
        // Handle error cases here
        console.error('Failed to generate summary');
        setLoading(false); // Clear loading state in case of error
      }
    } catch (error) {
      // Handle network errors
      console.error('Error occurred while generating summary:', error);
      setLoading(false); // Clear loading state in case of error
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call generateEnhancedSummary to generate the enhanced summary
    await generateEnhancedSummary();

    // Rest of your form submission logic goes here, if any
    // For example, you can handle form data and make another API call if needed.
    const data = new FormData(event.currentTarget);
    console.log({
      summary,
      data,
      generatedSummary, // You can access the generated summary here if needed
    });

    // Add additional logic to handle form submission, if necessary
  };

  return (
    <>

      <AccordionDetails>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                inputProps={{ style: { backgroundColor: 'white' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='gpa'
                name='gpa'
                label='Gpa'
                fullWidth
                variant='filled'
                inputProps={{ style: { backgroundColor: 'white' } }}
              />
            </Grid>
            <Grid item xs={12}>
            </Grid>
            <Grid container spacing={1} justifyContent="space-evenly" columnSpacing={6}>
              <Grid justifyContent="flex-start" item xs={5} >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label={'mm/yyyy'} views={['month', 'year']} />
                </LocalizationProvider>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Don't Show" />
                  <FormControlLabel control={<Checkbox />} label="Only Year" />
                </FormGroup>
              </Grid>
              <Grid justifyContent="flex-start" item xs={5} >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label={'mm/yyyy'} views={['month', 'year']} />
                </LocalizationProvider>
                <FormControlLabel control={<Checkbox />} label="Don't Show" />
                <FormControlLabel control={<Checkbox />} label="Only Year" />
                <FormControlLabel control={<Checkbox />} label="Present (Current)" />
              </Grid>
            </Grid>

          </Grid>


        </Box>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id='profileSummary'
                name='profileSummary'
                label='Summary'
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
                  },
                }}
                multiline
                onChange={(e) => setSummary(e.target.value)} // Update the summary state when the user types in the TextField
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
              <Typography variant='body1'>{generatedSummary}</Typography>
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

    </>
  );
};


