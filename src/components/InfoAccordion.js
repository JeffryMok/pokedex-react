import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const InfoAccordion = ({ title, info, keyName }) => {
  const normalizeName = (word) => {
    return word.replace(/-/g, " ");
  }

  return(
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <div>{title}</div>
      </AccordionSummary>
      <AccordionDetails>
        <ul>
          {info.map((elm) => (
            <li key={elm[keyName]['name']}>{normalizeName(elm[keyName]['name'])}</li>
          ))}
        </ul>
      </AccordionDetails>
    </Accordion>
  )
}

export default InfoAccordion;