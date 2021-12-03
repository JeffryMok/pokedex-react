import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const PokemonDetail = () => {
  const navigate = useNavigate();
  const params = useParams();

  const GET_POKEMON_DETAIL = gql`
    query pokemon($name: String!) {
      pokemon(name: $name) {
        id
        name
        abilities {
          ability {
            name
          }
        }
        moves {
          move {
            name
          }
        }
        types {
          type {
            name
          }
        }
        message
        status
      }
    }
  `;

  const gqlVariables = { name: params.name };

  const { loading, error, data } = useQuery(GET_POKEMON_DETAIL, { variables: gqlVariables });
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  console.log(data);

  return (
    <div>
      <div>Pokemon Detail</div>
      <div>{data.pokemon.name}</div>
      <div>{data.pokemon.abilities.map((elm) => (
        <p>{elm.ability.name}</p>
      ))}</div>
      <button onClick={() => navigate('/')}>Balik ke list</button>
      <button onClick={() => navigate('/my-list')}>Ke MyList</button>
    </div>
  )
}

export default PokemonDetail;