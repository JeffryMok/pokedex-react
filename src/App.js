import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ApolloClientProvider from './providers/ApolloClientProvider';
import { ContextProvider } from './providers/ContextProvider';
import Header from './components/Header';
import Loading from './components/Loading';

const PokemonList = React.lazy(() => import('./pages/PokemonList'));
const PokemonDetail = React.lazy(() => import('./pages/PokemonDetail'));
const MyPokemonList = React.lazy(() => import('./pages/MyPokemonList'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <ApolloClientProvider>
          <ContextProvider>
            <Header />
            <Routes>
              <Route path="/" element={<PokemonList />} />
              <Route path="/detail/:name" element={<PokemonDetail />} />
              <Route path="/my-list" element={<MyPokemonList />} />
            </Routes>
          </ContextProvider>
        </ApolloClientProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
