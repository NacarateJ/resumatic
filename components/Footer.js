import { Typography, Link, Box } from '@mui/material';
import CopyrightIcon from '@mui/icons-material/Copyright';

export default function Footer() {
  return (
    <Box
      sx={{
        padding: 4,
        m: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant='body2' align='center' sx={{ fontFamily: 'inherit' }}>
        <CopyrightIcon sx={{ marginRight: '5px' }} />
        <Link sx={{ color: '#FF5400' }} href='/' underline='none'>
          RESUMATIC
        </Link>
        <span style={{ margin: '0 5px' }} />
        {new Date().getFullYear()}
      </Typography>
    </Box>
  );
}
