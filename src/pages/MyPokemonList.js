import React, { useContext, useState } from 'react';
import { css } from '@emotion/css';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
import { PokemonContext } from '../providers/ContextProvider';
import PokemonCard from '../components/PokemonCard';
import Header from '../components/Header';

const MyPokemonList = () => {
  const { myPokemonList = [], removePokemon } = useContext(PokemonContext);
  
  const [isOpenReleaseDialog, setOpenReleaseDialog] = useState(false);
  const [pokemonNickname, setPokemonNickname] = useState('');

  const generateReleaseConfirmationDialog = () => {
    return (
      <Dialog open={isOpenReleaseDialog} onClose={() => setOpenReleaseDialog(false)}>
        <DialogTitle>
          <div>Release Confirmation</div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure want to release {pokemonNickname}?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReleaseDialog(false)}>Cancel</Button>
          <Button onClick={handleReleasePokemon}>Confirm</Button>
        </DialogActions>
      </Dialog>
    )
  }

  const handleOpenReleaseDialog = (nickname) => {
    setPokemonNickname(nickname);
    setOpenReleaseDialog(true);
  }

  const handleReleasePokemon = () => {
    removePokemon(pokemonNickname);
    setOpenReleaseDialog(false);
  }

  return (
    <div>
      <Header title="My Pokemon List" />
      {generateReleaseConfirmationDialog()}
      <div className={css`padding: 8px`}>
        <Grid container>
          {myPokemonList.length === 0 ? 'Empty! Find the Pokemon you want in Pokemon List, and catch it!' : myPokemonList.map((poke, idx) => (
            <Grid item sx={{ mb: '8px', p: '0px 8px' }} xs={12} sm={6} md={4} lg={3} key={poke.nickname}>
              <PokemonCard id={idx+1} name={poke.name} nickname={poke.nickname} onRelease={() => handleOpenReleaseDialog(poke.nickname)} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default MyPokemonList;