import React, { createContext, useState, useEffect } from 'react';

export const PokemonContext = createContext({});

export const ContextProvider = ({ children }) => {
  const storedData = JSON.parse(localStorage.getItem("my-pokemon-list"));
  const [myPokemonList, setMyPokemonList] = useState(storedData || []);

  useEffect(() => {
    localStorage.setItem("my-pokemon-list", JSON.stringify(myPokemonList));
  }, [myPokemonList]);

  const addNewPokemon = (pokemon) => {
    const tempList = [...myPokemonList];
    tempList.push({ ...pokemon, id: myPokemonList.length + 1 });
    setMyPokemonList(tempList);
  }

  return (
    <PokemonContext.Provider
      value={{
        myPokemonList,
        addNewPokemon,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};