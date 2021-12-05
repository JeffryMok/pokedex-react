import React, { createContext, useState } from 'react';

export const PokemonContext = createContext({});

export const ContextProvider = ({ children }) => {
  const [myPokemonList, setMyPokemonList] = useState([]);
  const [totalOwned, setTotalOwned] = useState(0);

  const addNewPokemon = (pokemon) => {
    const tempList = [...myPokemonList];
    tempList.push(pokemon);
    setTotalOwned(myPokemonList+1);
    setMyPokemonList(tempList);
  }

  return (
    <PokemonContext.Provider
      value={{
        myPokemonList,
        totalOwned,
        addNewPokemon,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};