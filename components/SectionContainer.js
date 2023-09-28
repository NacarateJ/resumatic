import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function SectionContainer(props) {
  return (
    <>
      <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
        <Paper
          sx={{
            my: { xs: 3, md: 6 },
            p: { xs: 2, md: 3 },
            backgroundColor: 'WhiteSmoke',
          }}
        >
          <Typography component='h1' variant='h6' align='left'>
            {props.icon}
            {props.title}
          </Typography>
          {props.children}
          <Button sx={{ mt: 3, ml: 1 }}>Cancel</Button>
          <Button variant='contained' sx={{ mt: 3, ml: 1 }}>
            Save
          </Button>
        </Paper>
      </Container>
    </>
  );
}
