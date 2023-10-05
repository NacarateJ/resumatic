import { Container, Paper } from '@mui/material';

export default function SectionContainer(props) {
  return (
    <Container maxWidth='sm' sx={{ mb: 3 }}>
      <Paper
        sx={{
          my: 1,
          p: 1,
          backgroundColor: 'WhiteSmoke',
        }}
      >
        {props.children}
      </Paper>
    </Container>
  );
}
