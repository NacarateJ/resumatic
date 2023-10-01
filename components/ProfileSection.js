import React, { useState } from 'react';
import SectionContainer from './SectionContainer';
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

export default function ProfileSection() {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState('');

  const generateEnhancedSummary = async (userSummary) => {
    // Set loading state while generating summary
    setLoading(true);

    // Simulate the generation of an enhanced summary
    // Replace with actual API call --> CAN I DO IT HERE? SHOULD I SET IT IN API FOLDER
    setTimeout(() => {
      const enhancedSummary = userSummary;

      // Set the generated summary and clear loading state
      setGeneratedSummary(enhancedSummary);
      setLoading(false);
    }, 3000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      data,
    });
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
                      overflowY: 'auto',
                    },
                  }}
                  multiline
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

            {/* Add logic to display generated summary once BE is set */}

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
      </Accordion>
    </SectionContainer>
  );
}
