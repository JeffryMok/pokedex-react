import React from 'react';
import { useNavigate } from 'react-router-dom';

const PokemonList = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>Pokemon List</div>
      <button onClick={() => navigate('/detail/1')}>
        Ke Detail
      </button>
    </div>
  )
}

export default PokemonList;