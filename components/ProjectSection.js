import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SectionContainer from './SectionContainer';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import ProjectSectionItem from './ProjectSectionItem';
import { Grid, Accordion, AccordionSummary, Typography } from '@mui/material';

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
              <FolderSpecialIcon
                style={{ fontSize: '2.25em' }}
                sx={{ pr: 1 }}
              />
              <Typography variant='h5'>Projects</Typography>
            </Grid>
          </AccordionSummary>

          <ProjectSectionItem projectNum='Project #1' />
          <ProjectSectionItem projectNum='Project #2' />
          <ProjectSectionItem projectNum='Project #3' />
        </Accordion>
      </SectionContainer>
    </>
  );
}
