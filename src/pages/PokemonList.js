import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/css';
import { useQuery } from '@apollo/client';
import { Grid, Pagination } from '@mui/material';
import { PokemonContext } from '../providers/ContextProvider';
import PokemonCard from '../components/PokemonCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { GET_POKEMONS } from '../constants/graphqlQueries';

const PokemonList = () => {
  const navigate = useNavigate();
  const { myPokemonList } = useContext(PokemonContext);
  const limit = 12;

  const gqlVariables = { limit, offset: 0 };

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
        <div className={css`text-align: center; font-size: 18px; font-weight: 500; margin-bottom: 16px`}>Total Owned: {myPokemonList?.length || 0}</div>
        <Grid container>
          {results.map((poke) => (
            <Grid item sx={{ mb: '8px', p: '0px 8px' }} key={poke.id} xs={12} sm={6} md={4} lg={3}>
              <PokemonCard id={poke.id} name={poke.name} onClick={() => navigate(`/detail/${poke.name}`, { state: poke })} />
            </Grid>
          ))}
        </Grid>
        <div className={css`margin-top: 12px; display: flex; justify-content: center`}>
          <Pagination count={Math.ceil(count/params.limit)} page={(params.offset + params.limit)/params.limit} onChange={handleChangePage} color="primary" />
        </div>
      </div>
    </div>
  )
}

export default PokemonList;