import SectionContainer from './SectionContainer';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export default function EditProfileSection() {
  return (
    <>
      <SectionContainer title='Edit Profile Section'>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id='fullName'
              name='fullName'
              label='Full name'
              fullWidth
              autoComplete='name'
              variant='standard'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id='jobTitle'
              name='jobTitle'
              label='Job Title'
              fullWidth
              variant='standard'
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
              variant='standard'
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
              variant='standard'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='address'
              name='address'
              label='Address'
              fullWidth
              variant='standard'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='website'
              name='website'
              label='Website'
              fullWidth
              variant='standard'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='linkedin'
              name='linkedin'
              label='LinkedIn'
              fullWidth
              variant='standard'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='github'
              name='github'
              label='GitHub'
              fullWidth
              variant='standard'
            />
          </Grid>
        </Grid>
      </SectionContainer>
    </>
  );
}
