import React from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/css';

const PokemonList = () => {
  const navigate = useNavigate();
  const color = 'red';
  return (
    <div
      className={css`
        padding: 32px;
        font-size: 16px;
        font-weight: 600;
        &:hover {
          color: ${color};
        }
      `}
    >
      <div>Pokemon List</div>
      <button onClick={() => navigate('/detail/1')}>
        Ke Detail
      </button>
    </div>
  )
}

export default PokemonList;