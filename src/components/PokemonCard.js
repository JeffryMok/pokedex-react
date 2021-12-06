import React from 'react';
import { css } from '@emotion/css';
import { Grid } from '@mui/material';

const PokemonCard = ({ id, name, nickname, onClick = null, onRelease = null }) => {
  return (
    <div 
      className={css`
        padding: 16px;
        font-size: 16px;
        font-weight: 500;
        background-color: #fbf7f8;
        border: 2px solid #e83131;
        border-radius: 10px;
        cursor: ${onClick ? 'pointer' : 'auto'};
      `}
      onClick={onClick}
    >
      <Grid container alignItems="center">
        <Grid item xs={onRelease ? 9 : 12}>
          <div className={css`text-transform: capitalize`} data-testid="test-name">{`${id}. ${name}`}</div>
          {nickname && (
            <div>Nickname: {nickname}</div>
          )}
        </Grid>
        {onRelease && (
          <Grid item xs={3} onClick={onRelease} sx={{ cursor: 'pointer' }}>
            <div className={css`color: #e83131`}>Release</div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default PokemonCard;