import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SectionContainer from './SectionContainer';
import WorkIcon from '@mui/icons-material/Work';
import ProfessionalExperienceSectionItem from './ProfessionalExperienceSectionItem';
import { Grid, Accordion, AccordionSummary, Typography } from '@mui/material';
import { useState } from 'react';


export default function ProfessionalExperienceSection({
  resumeData,
  fetchResumeData,
  isOpen,
  onToggleAccordion
}) {
  const [openAccordion, setOpenAccordion] = useState(null);

  const handleAccordionToggle = (panel) => (event, isExpanded) => {
    setOpenAccordion(isExpanded ? panel : null);
  };
  return (
    <SectionContainer>
      <Accordion sx={{ backgroundColor: 'WhiteSmoke', boxShadow: 'none' }}
        expanded={isOpen}
        onChange={onToggleAccordion}>
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
          workExp={resumeData.work_experience?.[0]}
          fetchResumeData={fetchResumeData}
          resumeId={resumeData.resume_id}
          isOpen={openAccordion === 'profExp1'}
          onToggleAccordion={handleAccordionToggle('profExp1')}
        />
        <ProfessionalExperienceSectionItem
          experienceNum='Professional Experience #2'
          workExp={resumeData.work_experience?.[1]}
          fetchResumeData={fetchResumeData}
          resumeId={resumeData.resume_id}
          isOpen={openAccordion === 'profExp2'}
          onToggleAccordion={handleAccordionToggle('profExp2')}
        />
        <ProfessionalExperienceSectionItem
          experienceNum='Professional Experience #3'
          workExp={resumeData.work_experience?.[2]}
          fetchResumeData={fetchResumeData}
          resumeId={resumeData.resume_id}
          isOpen={openAccordion === 'profExp3'}
          onToggleAccordion={handleAccordionToggle('profExp3')}
        />
      </Accordion>
    </SectionContainer>
  );
}
