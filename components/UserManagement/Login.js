import Link from 'next/link';
import SectionContainer from '../SectionContainer';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Container,
} from '@mui/material';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Access the form input fields using the event object
    const formData = new FormData(event.currentTarget);

    // Extract specific form field values
    const email = formData.get('email');
    const password = formData.get('password');

    // Now you can use the `email` and `password` values as needed
    console.log('Email:', email);
    console.log('Password:', password);
    router.push(`/dashboard`);
  };

  return (
    <Container id='container-login' sx={{ mt: '5%' }}>
      <SectionContainer>
        <Box
          id='login-box'
          component='form'
          onSubmit={handleSubmit}
          sx={{
            mt: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component='h1' variant='h4' sx={{ mb: 3 }}>
            Login
          </Typography>
          <Grid
            container
            spacing={3}
            id='grid-text-boxes'
            style={{ justifyContent: 'center' }}
          >
            <Grid item xs={10}>
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
            <Grid item xs={10}>
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
    </Container>
  );
}
