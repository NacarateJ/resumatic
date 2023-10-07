import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SectionContainer from './SectionContainer';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import ProjectSectionItem from './ProjectSectionItem';
import { Grid, Accordion, AccordionSummary, Typography } from '@mui/material';
import { useState } from 'react';

export default function ProjectSection({ resumeData, fetchResumeData })
{
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
          <ProjectSectionItem
            projectNum='Project #1'
            projectData={resumeData.project?.[0]}
            fetchResumeData={fetchResumeData}
            resumeId={resumeData.resume_id}
          />
          <ProjectSectionItem
            projectNum='Project #2'
            projectData={resumeData.project?.[1]}
            fetchResumeData={fetchResumeData}
            resumeId={resumeData.resume_id}
          />
          <ProjectSectionItem
            projectNum='Project #3'
            projectData={resumeData.project?.[2]}
            fetchResumeData={fetchResumeData}
            resumeId={resumeData.resume_id}
          />
        </Accordion>
      </SectionContainer>
    </>
  );
}
