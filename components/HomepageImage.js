import React from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function HomepageImage() {
  const localImage = '/homepage-image.png';
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/login');
  };

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${localImage})`,
        'min-height': 'calc(100vh - 175px)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          m: 10,
        }}
      />
      <Grid container>
        <Grid item lg={12}>
          <Box
            id='box-grid'
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6, lg: 12 },
              mt: 40,
            }}
          >
            <Typography
              variant='h2'
              component='div'
              gutterBottom
              style={{
                color: 'white',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              Tailored Resumes. Limitless Opportunities.
            </Typography>
            <Button
              variant='contained'
              style={{
                backgroundColor: '#FF8500',
                color: 'white',
                marginTop: '350px',
              }}
              size='large'
              onClick={handleButtonClick}
            >
              Get Started
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
