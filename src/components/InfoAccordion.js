import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const InfoAccordion = ({ title, info, keyName, threeColumn }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true });

  const normalizeName = (word) => {
    return word.replace(/-/g, " ");
  }

  console.log(matches);

  return(
    <Accordion defaultExpanded={matches} sx={{ textAlign: 'left' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <div>{title}</div>
      </AccordionSummary>
      <AccordionDetails>
        <ul>
          <Grid container>
            {info.map((elm) => (
              <Grid item xs={6} lg={threeColumn ? 4 : 6}>
                <li key={elm[keyName]['name']}>{normalizeName(elm[keyName]['name'])}</li>
              </Grid>
            ))}
          </Grid>
        </ul>
      </AccordionDetails>
    </Accordion>
  )
}

export default InfoAccordion;