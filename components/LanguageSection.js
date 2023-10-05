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

export default function LanguageSection({ resumeData, fetchResumeData, resumeId }) {
  return (
    <>
      <SectionContainer>
        <Accordion
          sx={{ backgroundColor: 'WhiteSmoke', boxShadow: 'none' }}
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
          />
          <LanguageSectionItem
            languageName={resumeData.languages?.[1]?.language_name}
            languageLevel={resumeData.languages?.[1]?.language_level}
            resumeId={resumeId}
            fetchResumeData={fetchResumeData}
          />
          <LanguageSectionItem
            languageName={resumeData.languages?.[2]?.language_name}
            languageLevel={resumeData.languages?.[2]?.language_level}
            resumeId={resumeId}
            fetchResumeData={fetchResumeData}
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