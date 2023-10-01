
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import LanguageLevel from './LanguageLevel.js';
import SectionContainer from 'components/SectionContainer.js'
export default function LanguageDetails() {
  return (
    <>
      <SectionContainer title='Edit Languages'>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id='Language'
              name='Language'
              label='Enter Language'
              fullWidth
              autoComplete='language'
              variant='standard'
            />
          </Grid>
          <Grid item xs={12}>
            <LanguageLevel />
        </Grid>
        </Grid>
      </SectionContainer>
    </>
  );
}

