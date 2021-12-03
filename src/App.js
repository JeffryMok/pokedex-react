import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const PokemonList = React.lazy(() => import('./pages/PokemonList'));
const PokemonDetail = React.lazy(() => import('./pages/PokemonDetail'));
const MyPokemonList = React.lazy(() => import('./pages/MyPokemonList'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/detail/:id" element={<PokemonDetail />} />
          <Route path="/my-list" element={<MyPokemonList />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
