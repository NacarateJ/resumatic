import { Container, Paper } from '@mui/material';

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
          {props.children}
        </Paper>
      </Container>
    </>
  );
}
