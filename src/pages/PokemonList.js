import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/css';
import { gql, useQuery } from '@apollo/client';
import { Pagination } from '@mui/material';
import { PokemonContext } from '../providers/ContextProvider';
import PokemonCard from '../components/PokemonCard';
import Header from '../components/Header';
import Loading from '../components/Loading';

const PokemonList = () => {
  const navigate = useNavigate();
  const { myPokemonList } = useContext(PokemonContext);

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
  if (loading) return <Loading />
  if (error) return <div>Error: {error.message}</div>

  const handleChangePage = (_, val) => {
    fetchMore({ variables: { offset: (val-1)*params.limit } })
  }

  return (
    <div>
      <Header title="Pokemon List" />
      <div className={css`padding: 8px`}>
        <div className={css`text-align: center; font-size: 18px; font-weight: 500`}>Total Owned: {myPokemonList?.length || 0}</div>
        {results.map((poke) => (
          <div className={css`margin-bottom: 4px`} key={poke.id}>
            <PokemonCard id={poke.id} name={poke.name} onClick={() => navigate(`/detail/${poke.name}`)} />
          </div>
        ))}
        <div className={css`margin-top: 12px; display: flex; justify-content: center`}>
          <Pagination count={Math.ceil(count/params.limit)} page={(params.offset + params.limit)/params.limit} onChange={handleChangePage} color="primary" />
        </div>
      </div>
    </div>
  )
}

export default PokemonList;