import SectionContainer from './SectionContainer';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';

export default function EditProfileSection() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      data,
    });
  };

  return (
    <>
      <SectionContainer title='Edit Profile Section' icon={<InfoIcon />}>
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='address'
                name='address'
                label='Address'
                fullWidth
                variant='filled'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='website'
                name='website'
                label='Website'
                fullWidth
                variant='filled'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='linkedin'
                name='linkedin'
                label='LinkedIn'
                fullWidth
                variant='filled'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='github'
                name='github'
                label='GitHub'
                fullWidth
                variant='filled'
              />
            </Grid>
          </Grid>
          <Button sx={{ mt: 3, ml: 1 }}>Cancel</Button>
          <Button type='submit' variant='contained' sx={{ mt: 3, ml: 1 }}>
            Save
          </Button>
        </Box>
      </SectionContainer>
    </>
  );
}
