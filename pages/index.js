import React from 'react';
import { useRouter } from 'next/router';
import HomepageImage from '../components/HomepageImage';
import { Button, Container, Typography } from '@mui/material';

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/logout');
  };

  const pantoneOrange = '#FF8C00';

  return (
    <div>
      <HomepageImage />
      <div
        style={{
          position: 'absolute',
          top: '52%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <Container>
          <Typography variant="h2" component="div" gutterBottom style={{ color: 'white' }}>
            Tailored Resumes. Limitless Opportunities.
          </Typography>
          <div style={{ marginTop: '100px' }}>
            <Button
              variant="contained"
              style={{
                backgroundColor: pantoneOrange,
                color: 'white'
              }}
              size="large"
              onClick={handleButtonClick}
            >
              Get Started
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
}
