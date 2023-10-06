import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SectionContainer from './SectionContainer';
import WorkIcon from '@mui/icons-material/Work';
import ProfessionalExperienceSectionItem from './ProfessionalExperienceSectionItem';
import { Grid, Accordion, AccordionSummary, Typography } from '@mui/material';

export default function ProfessionalExperienceSection({ resumeData, fetchResumeData }) {
  return (
    <SectionContainer>
      <Accordion sx={{ backgroundColor: 'WhiteSmoke', boxShadow: 'none' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Grid display='flex' alignItems='center'>
            <WorkIcon style={{ fontSize: '2.25em' }} sx={{ pr: 1 }} />
            <Typography variant='h5'>Professional Experience</Typography>
          </Grid>
        </AccordionSummary>

        <ProfessionalExperienceSectionItem
          experienceNum='Professional Experience #1'
          resumeData={resumeData}
          fetchResumeData={fetchResumeData}
        />
        <ProfessionalExperienceSectionItem
          experienceNum='Professional Experience #2'
          resumeData={resumeData}
          fetchResumeData={fetchResumeData}
        />
        <ProfessionalExperienceSectionItem
          experienceNum='Professional Experience #3'
          resumeData={resumeData}
          fetchResumeData={fetchResumeData}
        />
      </Accordion>
    </SectionContainer>
  );
}
