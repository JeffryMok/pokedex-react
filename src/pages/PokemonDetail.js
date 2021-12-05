import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { css } from '@emotion/css';
import { Button, CircularProgress, Dialog, DialogTitle, IconButton, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import InfoAccordion from '../components/InfoAccordion';
import { PokemonContext } from '../providers/ContextProvider';
import Loading from '../components/Loading';

const PokemonDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { addNewPokemon, myPokemonList } = useContext(PokemonContext);

  const [icon, setIcon] = useState(<></>);
  const [message, setMessage] = useState('');
  const [nickname, setNickname] = useState('');
  
  const [isError, setError] = useState(false);
  const [isOpenCatchDialog, setOpenCatchDialog] = useState(false);
  const [isOpenNicknameDialog, setOpenNicknameDialog] = useState(false);

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
        id,
        name,
        sprites,
        abilities,
        moves,
        types,
      } = {},
    } = {},
  } = useQuery(GET_POKEMON_DETAIL, { variables: gqlVariables });
  if (loading) return <Loading />
  if (error) return <div>Error: {error.message}</div>

  const generateErrorText = () => {
    if (!nickname) return 'Please fill this field!';
    else if (!isUniqueNickname()) return 'Nickname must be unique!';
    return '';
  }

  const generateCatchDialog = () => {
    return (
      <Dialog open={isOpenCatchDialog} onClose={() => setOpenCatchDialog(false)}>
        <DialogTitle>
          <div className={css`text-transform: capitalize`}>Catch {name}</div>
        </DialogTitle>
        <div className={css`text-align: center; text-size: 16px; font-weight: 600`}>
          <div>
            {icon}
          </div>
          <div>
            {message}
          </div>
          <div className={css`padding: 8px`}>
            <Button variant="contained" onClick={handleCatchPokemon}>Catch Again</Button>
          </div>
          <div className={css`padding: 8px`}>
            <Button variant="contained" color="secondary" onClick={() => navigate('/my-list')}>Go To My List</Button>
          </div>
        </div>
      </Dialog>
    )
  }

  const generateNicknameDialog = () => {
    return (
      <Dialog open={isOpenNicknameDialog}>
        <DialogTitle>Give Nickname</DialogTitle>
        <div className={css`text-align: center; text-size: 16px; font-weight: 600`}>
          <div>
            <TextField
              variant="outlined"
              label="Nickname"
              value={nickname}
              error={isError && (!nickname || !isUniqueNickname())}
              helperText={isError && generateErrorText()}
              onChange={(e) => setNickname(e.target.value)}
              fullWidth
            />
          </div>
          <div className={css`padding: 8px`}>
            <Button variant="contained" onClick={handleSubmitNickname}>Submit</Button>
          </div>
        </div>
      </Dialog>
    )
  }

  const isUniqueNickname = () => !myPokemonList.find((obj) => obj.nickname === nickname);

  const handleCatchPokemon = () => {
    setOpenCatchDialog(true);
    setIcon(<CircularProgress color="inherit" />)
    setMessage("Loading...");
    setTimeout(() => {
      const catchSuccess = Math.random() > 0.5;
      if (catchSuccess) {
        setIcon(<DoneIcon color="success" fontSize="large" />);
        setMessage('Catch Success');
        setOpenNicknameDialog(true);
      } else {
        setIcon(<CloseIcon color="error" fontSize="large" />);
        setMessage('Catch Failed');
      }
    }, 2000);
  }

  const handleSubmitNickname = () => {
    if (!nickname || !isUniqueNickname()) {
      setError(true);
    } else {
      setError(false);
      addNewPokemon({
        pokeId: id,
        name,
        nickname,
      })
      setOpenNicknameDialog(false);
      setNickname('');
    }
  }

  return (
    <div className={css`padding: 8px; font-size: 14px; text-align: center; text-transform: capitalize`}>
      {generateCatchDialog()}
      {generateNicknameDialog()}
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
          <div key={elm.type.name}>{elm.type.name}</div>
        ))}
      </div>
      <div className={css`text-align: left`}>
        <InfoAccordion title="Abilities" keyName="ability" info={abilities} />
        <InfoAccordion title="Moves" keyName="move" info={moves} />
      </div>
      <div className={css`margin-top: 8px`} onClick={handleCatchPokemon}>
        <Button variant="contained">Catch</Button>
      </div>
    </div>
  )
}

export default PokemonDetail;