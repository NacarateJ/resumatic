import SectionContainer from './SectionContainer';
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Typography,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EducationSectionItem from './EducationSectionItem';

export default function EducationSection() {
  return (
    <SectionContainer>
      <Accordion sx={{ backgroundColor: 'WhiteSmoke', boxShadow: 'none' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Grid display='flex' alignItems='center'>
            <SchoolIcon style={{ fontSize: '2.25em' }} sx={{ pr: 1 }} />
            <Typography variant='h5'>Education</Typography>
          </Grid>
        </AccordionSummary>

        <Accordion sx={{ backgroundColor: 'WhiteSmoke', boxShadow: 'none' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography variant='h8'>Education #1</Typography>
          </AccordionSummary>
          <EducationSectionItem />
        </Accordion>
        <Accordion sx={{ backgroundColor: 'WhiteSmoke', boxShadow: 'none' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography variant='h8'>Education #2</Typography>
          </AccordionSummary>
          <EducationSectionItem />
        </Accordion>
        <Accordion sx={{ backgroundColor: 'WhiteSmoke', boxShadow: 'none' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography variant='h8'>Education #3</Typography>
          </AccordionSummary>
          <EducationSectionItem />
        </Accordion>
        <AccordionDetails>
          <Grid display='flex' justifyContent='center' alignItems='center'>
            <Button
              type='submit'
              variant='contained'
              sx={{ mt: 3, ml: 1 }}
              style={{
                backgroundColor: '#00B4D8',
              }}
            >
              Add
            </Button>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </SectionContainer>
  );
}
