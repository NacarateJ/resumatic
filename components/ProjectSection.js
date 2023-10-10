import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SectionContainer from './SectionContainer';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import ProjectSectionItem from './ProjectSectionItem';
import { Grid, Accordion, AccordionSummary, Typography } from '@mui/material';
import { useState } from 'react';

export default function ProjectSection({ resumeData, fetchResumeData, isOpen, onToggleAccordion }) {
  const [openAccordion, setOpenAccordion] = useState('null');
  const handleAccordionToggle = (panel) => (event, isExpanded) => {
    console.log(`Panel: ${panel}, isExpanded: ${isExpanded}`);
    setOpenAccordion(isExpanded ? panel : null);
  };

  console.log("isOpen prop:", isOpen);
  console.log("openAccordion state:", openAccordion);
  return (
    <>
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
              <FolderSpecialIcon
                style={{ fontSize: '2.25em' }}
                sx={{ pr: 1 }}
              />
              <Typography variant='h5'>Projects</Typography>
            </Grid>
          </AccordionSummary>
          <ProjectSectionItem
            projectNum='Project #1'
            projectData={resumeData.projects?.[0]}
            fetchResumeData={fetchResumeData}
            resumeId={resumeData.resume_id}
            isOpen={openAccordion === 'project1'}
            onToggleAccordion={handleAccordionToggle('project1')}
          />
          <ProjectSectionItem
            projectNum='Project #2'
            projectData={resumeData.projects?.[1]}
            fetchResumeData={fetchResumeData}
            resumeId={resumeData.resume_id}
            isOpen={openAccordion === 'project2'}
            onToggleAccordion={handleAccordionToggle('project2')}
          />
          <ProjectSectionItem
            projectNum='Project #3'
            projectData={resumeData.projects?.[2]}
            fetchResumeData={fetchResumeData}
            resumeId={resumeData.resume_id}
            isOpen={openAccordion === 'project3'}
            onToggleAccordion={handleAccordionToggle('project3')}
          />
        </Accordion>
      </SectionContainer>
    </>
  );
}
