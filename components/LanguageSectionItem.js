import {
  Grid,
  AccordionDetails,
  TextField,
  Box,
  Button,
} from '@mui/material';
import LanguageLevel from './LanguageLevel';



export default function LanguageSectionItem() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      data,
    });
  };

  return (
    <>
      <AccordionDetails>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id='language'
                name='language'
                label='Enter Language'
                fullWidth
                autoComplete='degree'
                variant='filled'
                inputProps={{ style: { backgroundColor: 'white' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <LanguageLevel />
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
        </AccordionDetails>
    </>
  );
};

