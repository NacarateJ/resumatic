import { Typography, Link, Box } from '@mui/material';
import CopyrightIcon from '@mui/icons-material/Copyright';

export default function Footer() {
  return (
    <Typography variant='body2' align='center' sx={{ fontFamily: 'inherit' }}>
      <Box
        sx={{
          padding: 4,
          m: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <CopyrightIcon />{' '}
        <Link sx={{ color: '#FF5400' }} href='/' underline='none'>
          RESUMATIC
        </Link>{' '}
        {new Date().getFullYear()}
      </Box>
    </Typography>
  );
}
