import SectionContainer from './SectionContainer';
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

export default function PesronalInfoSection() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      data,
    });
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
