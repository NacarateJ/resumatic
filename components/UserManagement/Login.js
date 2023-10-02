import SectionContainer from '../SectionContainer';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  InputLabel,
  FilledInput,
} from '@mui/material';

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      data,
    });
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
          Sign In
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
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='password'
              name='password'
              label='Password'
              fullWidth
              inputProps={{ style: { backgroundColor: 'white' } }}
            />
          </Grid>
        </Grid>
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
    </SectionContainer>
  );
}
