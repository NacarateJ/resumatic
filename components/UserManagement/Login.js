import Link from 'next/link';
import SectionContainer from '../SectionContainer';
import { Box, Grid, TextField, Button, Typography } from '@mui/material';

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Access the form input fields using the event object
    const formData = new FormData(event.target);

    // Extract specific form field values
    const email = formData.get('email');
    const password = formData.get('password');

    // Now you can use the `email` and `password` values as needed
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <SectionContainer>
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          mt: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id='email'
              name='email'
              label='Email'
              fullWidth
              autoComplete='email'
              variant='filled'
              inputProps={{ style: { backgroundColor: 'white' } }}
              sx={{ mt: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id='password'
              name='password'
              label='Password'
              type='password'
              autoComplete='current-password'
              variant='filled'
              fullWidth
              inputProps={{ style: { backgroundColor: 'white' } }}
            />
          </Grid>
        </Grid>
        <Grid container display='flex' direction='column' alignItems='center'>
          <Button
            type='submit'
            variant='contained'
            sx={{ mt: 3, ml: 1 }}
            style={{
              backgroundColor: '#00B4D8',
            }}
          >
            Login
          </Button>
          <Link key='create-account' href={`/new-account`} passHref>
            <Button
              sx={{ mt: 1, ml: 1 }}
              style={{
                color: '#00B4D8',
              }}
            >
              Create Account
            </Button>
          </Link>
        </Grid>
      </Box>
    </SectionContainer>
  );
}
