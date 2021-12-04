import React from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/css';
import { gql, useQuery } from '@apollo/client';
import { Grid, Pagination } from '@mui/material';
import PokemonCard from '../components/PokemonCard';

const PokemonList = () => {
  const navigate = useNavigate();

  const GET_POKEMONS = gql`
    query pokemons($limit: Int, $offset: Int) {
      pokemons(limit: $limit, offset: $offset) {
        count
        params
        results {
          id
          name
        }
      }
    }
  `;

  const gqlVariables = { limit: 10, offset: 0 };

  const {
    loading,
    error,
    data: {
      pokemons: {
        count,
        params,
        results,
      } = {}
    } = {},
    fetchMore,
  } = useQuery(GET_POKEMONS, { variables: gqlVariables });
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  const handleChangePage = (_, val) => {
    fetchMore({ variables: { offset: (val-1)*params.limit }})
  }

  return (
    <div className={css`padding: 8px`}>
      <Grid container justifyContent="space-between" spacing={2} className={css`font-size: 24px; font-weight: 600`}>
        <Grid item>
          <div>Pokemon List</div>
        </Grid>
        <Grid item>
          <div>Total Owned: -</div>
        </Grid>
      </Grid>
      {results.map((poke) => (
        <div className={css`margin-bottom: 4px`} key={poke.id}>
          <PokemonCard id={poke.id} name={poke.name} onClick={() => navigate(`/detail/${poke.name}`)} />
        </div>
      ))}
      <div className={css`margin-top: 12px; display: flex; justify-content: center`}>
        <Pagination count={Math.ceil(count/params.limit)} page={(params.offset + params.limit)/params.limit} onChange={handleChangePage} color="primary" />
      </div>
    </div>
  )
}

export default PokemonList;