import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ApolloClientProvider from './providers/ApolloClientProvider';

const PokemonList = React.lazy(() => import('./pages/PokemonList'));
const PokemonDetail = React.lazy(() => import('./pages/PokemonDetail'));
const MyPokemonList = React.lazy(() => import('./pages/MyPokemonList'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <ApolloClientProvider>
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/detail/:name" element={<PokemonDetail />} />
            <Route path="/my-list" element={<MyPokemonList />} />
          </Routes>
        </ApolloClientProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
