import React, { useContext, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { css } from '@emotion/css';
import { Button, CircularProgress, Dialog, DialogTitle, Grid, TextField, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import Header from '../components/Header';
import InfoAccordion from '../components/InfoAccordion';
import { PokemonContext } from '../providers/ContextProvider';
import Loading from '../components/Loading';
import TYPE_COLORS from '../constants/typeColors';

const PokemonDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const params = useParams();
  const { addNewPokemon, myPokemonList } = useContext(PokemonContext);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"), { noSsr: true });

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
      <Dialog open={isOpenCatchDialog} onClose={() => setOpenCatchDialog(false)} fullWidth>
        <DialogTitle>
          <div className={css`text-transform: capitalize; text-align: center; font-size: 32px; font-weight: 600`}>Catch {name}</div>
        </DialogTitle>
        <div className={css`text-align: center; font-size: 24px; font-weight: 500; padding: 16px`}>
          <div>
            {icon}
          </div>
          <div>
            {message}
          </div>
          <Grid container sx={{ marginTop: '12px' }}>
            <Grid item sx={{ padding: '8px' }} xs={12} lg={6}>
              <Button variant="contained" onClick={handleCatchPokemon} fullWidth>Catch Again</Button>
            </Grid>
            <Grid item sx={{ padding: '8px' }} xs={12} lg={6}>
              <Button variant="contained" color="secondary" fullWidth onClick={() => navigate('/my-list')}>Go To My List</Button>
            </Grid>
          </Grid>
        </div>
      </Dialog>
    )
  }

  const generateNicknameDialog = () => {
    return (
      <Dialog open={isOpenNicknameDialog}>
        <DialogTitle>Give Nickname</DialogTitle>
        <div className={css`text-align: center; font-size: 16px; font-weight: 600; padding: 16px`}>
          <div>
            <TextField
              variant="outlined"
              label="Nickname"
              value={nickname}
              error={isError && (!nickname || !isUniqueNickname())}
              helperText={isError && generateErrorText()}
              onChange={(e) => setNickname(e.target.value)}
              fullWidth
              autoFocus
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
        setIcon(<DoneIcon color="success" fontSize="large" sx={{ width: '60px', height: '60px' }} />);
        setMessage('Catch Success');
        setOpenNicknameDialog(true);
      } else {
        setIcon(<CloseIcon color="error" fontSize="large" sx={{ width: '60px', height: '60px' }} />);
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
    <div>
      <Header title="Pokemon Detail" />
      {generateCatchDialog()}
      {generateNicknameDialog()}
      <div className={css`padding: 16px; font-size: 14px; text-align: center; text-transform: capitalize`}>
        <Grid container>
          <Grid sx={{ p: '0px 8px' }} xs={12} md={4}>
            <div className={css`font-size: 36px; font-weight: 600`}>{name}</div>
            <div>
              <img src={state?.artwork || sprites?.front_default} alt={name} width={matches ? '450px' : '196px'} height={matches ? '450px' : '196px'} />
            </div>
            <div className={css`display: flex; justify-content: space-evenly; text-transform: uppercase; font-size: 20px`}>
              {types.map((elm) => (
                <div
                  key={elm.type.name}
                  className={css`
                    color: white;
                    background-color: ${TYPE_COLORS[elm.type.name.toUpperCase()]};
                    padding: 8px;
                    border-radius: 20px;
                    font-weight: 600;
                  `}
                >
                  {elm.type.name}
                </div>
              ))}
            </div>
            <div className={css`margin: 24px 0px`} onClick={handleCatchPokemon}>
              <Button variant="contained" size="large">Catch</Button>
            </div>
          </Grid>
          <Grid sx={{ p: '4px 8px' }} xs={12} md={4}>
            <InfoAccordion title="Abilities" keyName="ability" info={abilities} threeColumn={abilities.length === 3} />
          </Grid>
          <Grid sx={{ p: '4px 8px' }} xs={12} md={4}>
            <InfoAccordion title="Moves" keyName="move" info={moves} threeColumn />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default PokemonDetail;