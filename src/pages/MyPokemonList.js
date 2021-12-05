import React, { useContext, useState } from 'react';
import { css } from '@emotion/css';
import PokemonCard from '../components/PokemonCard';
import { PokemonContext } from '../providers/ContextProvider';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const MyPokemonList = () => {
  const { myPokemonList, removePokemon } = useContext(PokemonContext);
  
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
    <div className={css`padding: 8px`}>
      {generateReleaseConfirmationDialog()}
      <div className={css`font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 16px`}>My Pokemon List</div>
      {myPokemonList.map((poke, idx) => (
        <div className={css`margin-bottom: 4px`} key={poke.nickname}>
          <PokemonCard id={idx+1} name={poke.name} nickname={poke.nickname} onRelease={() => handleOpenReleaseDialog(poke.nickname)} />
        </div>
      ))}
    </div>
  )
}

export default MyPokemonList;