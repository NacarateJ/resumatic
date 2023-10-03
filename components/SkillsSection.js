import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SectionContainer from './SectionContainer';
import PsychologyIcon from '@mui/icons-material/Psychology';
import {
  Grid,
  Accordion,
  AccordionSummary,
  Typography,
} from '@mui/material';
import SkillsSectionItem from './SkillsSectionItem';

export default function LanguageSection() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      data,
    });
  };
  return (
    <>
      <SectionContainer>
        <Accordion sx={{ backgroundColor: 'WhiteSmoke', boxShadow: 'none' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Grid display='flex' alignItems='center'>
              <PsychologyIcon style={{ fontSize: '2.25em' }} sx={{ pr: 1 }} />
              <Typography variant='h5'>Skills</Typography>
            </Grid>
          </AccordionSummary>

          <Accordion sx={{ backgroundColor: 'WhiteSmoke', boxShadow: 'none' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography variant='h8'>Programming Languages</Typography>
            </AccordionSummary>
            <SkillsSectionItem />
          </Accordion >
          <Accordion sx={{ backgroundColor: 'WhiteSmoke', boxShadow: 'none' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography variant='h8'>Frameworks, Libraries & Databases</Typography>
            </AccordionSummary>
            <SkillsSectionItem />
          </Accordion >
          <Accordion sx={{ backgroundColor: 'WhiteSmoke', boxShadow: 'none' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography variant='h8'>Tools & Other Technologies</Typography>
            </AccordionSummary>
            <SkillsSectionItem />
          </Accordion >
        </Accordion>
      </SectionContainer>
    </>
  );
}