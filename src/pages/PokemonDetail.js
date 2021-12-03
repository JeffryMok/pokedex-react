import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PokemonDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <div>
      <div>Pokemon Detail</div>
      <div>{params.id}</div>
      <button onClick={() => navigate('/')}>Balik ke list</button>
      <button onClick={() => navigate('/my-list')}>Ke MyList</button>
    </div>
  )
}

export default PokemonDetail;