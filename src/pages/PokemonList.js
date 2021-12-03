import React from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/css';
import { gql, useQuery } from '@apollo/client';

const PokemonList = () => {
  const navigate = useNavigate();
  const color = 'red';

  const GET_POKEMONS = gql`
    query pokemons($limit: Int, $offset: Int) {
      pokemons(limit: $limit, offset: $offset) {
        count
        next
        previous
        status
        message
        results {
          url
          name
          image
        }
      }
    }
  `;

  const gqlVariables = { limit: 2, offset: 1 };

  const { loading, error, data } = useQuery(GET_POKEMONS, { variables: gqlVariables });
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  console.log(data);

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
      <button onClick={() => navigate('/detail/nidoking')}>
        Ke Detail
      </button>
    </div>
  )
}

export default PokemonList;