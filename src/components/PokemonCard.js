import React from 'react';
import { css } from '@emotion/css';

const PokemonCard = ({ id, name, nickname, onClick = null }) => {
  return (
    <div 
      className={css`
        padding: 16px;
        font-size: 16px;
        font-weight: 500;
        background-color: #fbf7f8;
        border: 2px solid #e83131;
        border-radius: 10px;
        cursor: pointer;
      `}
      onClick={onClick}
    >
      <div className={css`text-transform: capitalize`}>{`${id}. ${name}`}</div>
      {nickname && (
        <div>{nickname}</div>
      )}
    </div>
  );
};

export default PokemonCard;