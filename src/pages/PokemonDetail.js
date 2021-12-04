import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { css } from '@emotion/css';
import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoAccordion from '../components/InfoAccordion';

const PokemonDetail = () => {
  const navigate = useNavigate();
  const params = useParams();

  const GET_POKEMON_DETAIL = gql`
    query pokemon($name: String!) {
      pokemon(name: $name) {
        id
        name
        sprites {
          front_default
        }
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
      }
    }
  `;

  const gqlVariables = { name: params.name };

  const {
    loading,
    error,
    data: {
      pokemon: {
        name,
        sprites,
        abilities,
        moves,
        types,
      } = {},
    } = {},
  } = useQuery(GET_POKEMON_DETAIL, { variables: gqlVariables });
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className={css`padding: 8px; font-size: 14px; text-align: center; text-transform: capitalize`}>
      <div className={css`text-align: left;`}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon fontSize="small" />
          <span className={css`margin-left: 4px; font-size: 14px`}>Back</span>
        </IconButton>
      </div>
      <div className={css`font-size: 24px; font-weight: 600`}>Pokemon Detail</div>
      <div>{name}</div>
      <div>
        <img src={sprites?.front_default} alt={name} />
      </div>
      <div className={css`display: flex; justify-content: space-evenly; text-transform: uppercase`}>
        {types.map((elm) => (
          <div>{elm.type.name}</div>
        ))}
      </div>
      <div className={css`text-align: left`}>
        <InfoAccordion title="Abilities" keyName="ability" info={abilities} />
        <InfoAccordion title="Moves" keyName="move" info={moves} />
      </div>
      <div className={css`margin-top: 8px`}>
        <Button variant="contained">Catch</Button>
      </div>
    </div>
  )
}

export default PokemonDetail;