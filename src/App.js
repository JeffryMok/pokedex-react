import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const PokemonList = React.lazy(() => import('./pages/PokemonList'));
const PokemonDetail = React.lazy(() => import('./pages/PokemonDetail'));
const MyPokemonList = React.lazy(() => import('./pages/MyPokemonList'));

function App() {
  const client = new ApolloClient({
    uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
    cache: new InMemoryCache()
  })

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <ApolloProvider client={client}>
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/detail/:name" element={<PokemonDetail />} />
            <Route path="/my-list" element={<MyPokemonList />} />
          </Routes>
        </ApolloProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
