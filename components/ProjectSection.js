import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SectionContainer from './SectionContainer';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import ProjectSectionItem from './ProjectSectionItem';
import {
  Grid,
  Accordion,
  AccordionSummary,
  Typography,
} from '@mui/material';

export default function ProjectSection() {
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
              <FolderSpecialIcon style={{ fontSize: '2.25em' }} sx={{ pr: 1 }} />
              <Typography variant='h5'>Projects</Typography>
            </Grid>
          </AccordionSummary>

          <Accordion sx={{ backgroundColor: 'WhiteSmoke', boxShadow: 'none' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography variant='h8'>Project #1</Typography>
            </AccordionSummary>
            <ProjectSectionItem />
          </Accordion >
          <Accordion sx={{ backgroundColor: 'WhiteSmoke', boxShadow: 'none' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography variant='h8'>Project #2</Typography>
            </AccordionSummary>
            <ProjectSectionItem />
          </Accordion >
          <Accordion sx={{ backgroundColor: 'WhiteSmoke', boxShadow: 'none' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography variant='h8'>Project #3</Typography>
            </AccordionSummary>
            <ProjectSectionItem />
          </Accordion >
        </Accordion>
      </SectionContainer>
    </>
  );
}