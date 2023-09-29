import SectionContainer from './SectionContainer';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function EditProfileSection() {
  return (
    <SectionContainer>
      <Accordion sx={{ backgroundColor: 'WhiteSmoke', boxShadow: 'none' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography variant='h5'>Profile</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <h1>Test</h1>
        </AccordionDetails>
      </Accordion>
    </SectionContainer>
  );
}