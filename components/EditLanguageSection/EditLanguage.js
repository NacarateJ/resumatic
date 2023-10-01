import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
//import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LanguageDetails from './LanguageDetails';

export default function EditLanguage() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          //expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Language #1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <LanguageDetails />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          //expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Language #2</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <LanguageDetails />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          //expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Language #3</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <LanguageDetails />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
