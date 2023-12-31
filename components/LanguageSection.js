import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LanguageSectionItem from './LanguageSectionItem';
import SectionContainer from './SectionContainer';
import LanguageIcon from '@mui/icons-material/Language';
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Typography,
} from '@mui/material';
import { useState } from 'react';

export default function LanguageSection({
  resumeData,
  fetchResumeData,
  resumeId, isOpen, onToggleAccordion,
}) {

  const [openAccordion, setOpenAccordion] = useState(null);

  const handleAccordionToggle = (panel) => (event, isExpanded) => {
    setOpenAccordion(isExpanded ? panel : null);
  };

  return (
    <>
      <SectionContainer>
        <Accordion
          sx={{ backgroundColor: 'WhiteSmoke', boxShadow: 'none' }}
          expanded={isOpen}
          onChange={onToggleAccordion}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Grid display='flex' alignItems='center'>
              <LanguageIcon style={{ fontSize: '2.25em' }} sx={{ pr: 1 }} />
              <Typography variant='h5'>Languages</Typography>
            </Grid>
          </AccordionSummary>

          <LanguageSectionItem
            languageName={resumeData.languages?.[0]?.language_name}
            languageLevel={resumeData.languages?.[0]?.language_level}
            resumeId={resumeId}
            fetchResumeData={fetchResumeData}
            isOpen={openAccordion === 'language1'}
            onToggleAccordion={handleAccordionToggle('language1')}
            languageNum={1}
          />
          <LanguageSectionItem
            languageName={resumeData.languages?.[1]?.language_name}
            languageLevel={resumeData.languages?.[1]?.language_level}
            resumeId={resumeId}
            fetchResumeData={fetchResumeData}
            isOpen={openAccordion === 'language2'}
            onToggleAccordion={handleAccordionToggle('language2')}
            languageNum={2}
          />
          <LanguageSectionItem
            languageName={resumeData.languages?.[2]?.language_name}
            languageLevel={resumeData.languages?.[2]?.language_level}
            resumeId={resumeId}
            fetchResumeData={fetchResumeData}
            isOpen={openAccordion === 'language3'}
            onToggleAccordion={handleAccordionToggle('language3')}
            languageNum={3}
          />
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
    </>
  );
}
