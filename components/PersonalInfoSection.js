import SectionContainer from './SectionContainer';
import { useState } from 'react';
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
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function PersonalInfoSection({ fetchResumeData, resumeId }) {
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fullName = formData.get('fullName');
    const jobTitle = formData.get('jobTitle');
    const phoneNumber = formData.get('phoneNumber');
    const email = formData.get('email');
    const address = formData.get('address');
    const website = formData.get('website');
    const linkedin = formData.get('linkedin');
    const github = formData.get('github');

    const userData = {
      fullName,
      jobTitle,
      phoneNumber,
      email,
      address,
      website,
      linkedin,
      github,
      resumeId, // Include resumeId if needed
    };

    try {
      const response = await fetch('/api/personalInfoInsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dataType: 'resume',
          data: userData,
        }),
      });

      if (response.ok) {
        console.log('User data inserted successfully');
        fetchResumeData(resumeId);
        // Handle success if needed
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to insert user data');
      }
    } catch (error) {
      console.error('Error inserting user data:', error);
      setError('Failed to insert user data');
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
              <InfoIcon style={{ fontSize: '2.25em' }} sx={{ pr: 1 }} />
              <Typography variant='h5'>Personal Info</Typography>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id='fullName'
                    name='fullName'
                    label='Full name'
                    fullWidth
                    autoComplete='name'
                    variant='filled'
                    inputProps={{ style: { backgroundColor: 'white' } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id='jobTitle'
                    name='jobTitle'
                    label='Job Title'
                    fullWidth
                    variant='filled'
                    inputProps={{ style: { backgroundColor: 'white' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id='phoneNumber'
                    name='phoneNumber'
                    label='Phone Number'
                    fullWidth
                    autoComplete='tel'
                    variant='filled'
                    inputProps={{ style: { backgroundColor: 'white' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id='email'
                    name='email'
                    label='Email'
                    fullWidth
                    autoComplete='email'
                    variant='filled'
                    inputProps={{ style: { backgroundColor: 'white' } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id='address'
                    name='address'
                    label='Address'
                    fullWidth
                    variant='filled'
                    inputProps={{ style: { backgroundColor: 'white' } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id='website'
                    name='website'
                    label='Website'
                    fullWidth
                    variant='filled'
                    inputProps={{ style: { backgroundColor: 'white' } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id='linkedin'
                    name='linkedin'
                    label='LinkedIn'
                    fullWidth
                    variant='filled'
                    inputProps={{ style: { backgroundColor: 'white' } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id='github'
                    name='github'
                    label='GitHub'
                    fullWidth
                    variant='filled'
                    inputProps={{ style: { backgroundColor: 'white' } }}
                  />
                </Grid>
              </Grid>
              <Grid display='flex' justifyContent='right' alignItems='center'>
                <Button
                  sx={{ mt: 3, ml: 1 }}
                  style={{
                    color: '#00B4D8',
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  variant='contained'
                  sx={{ mt: 3, ml: 1 }}
                  style={{
                    backgroundColor: '#00B4D8',
                  }}
                >
                  Save
                </Button>
              </Grid>
            </Box>
          </AccordionDetails>
        </Accordion>
      </SectionContainer>
    </>
  );
}
