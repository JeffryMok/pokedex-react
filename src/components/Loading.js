import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

const Loading = () => (
  <Backdrop open>
    <CircularProgress color="inherit" />
  </Backdrop>
)

export default Loading;