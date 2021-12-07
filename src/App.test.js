import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GET_POKEMONS, GET_POKEMON_DETAIL } from './constants/graphqlQueries';
import { createMemoryHistory } from "history";
import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';
import MyPokemonList from './pages/MyPokemonList';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

test('redirect and load pages', async () => {
  const mocks = [
    {
      request: {
        query: GET_POKEMONS,
        variables: {
          limit: 8,
          offset: 0,
        },
      },
      result: {
        data: {
          pokemons: { count: 1, params: { limit: 8, offset: 0 }, results: [{ id: 25, name: 'pikachu', artwork: 'artwork' }] },
        },
      },
    },
    {
      request: {
        query: GET_POKEMON_DETAIL,
        variables: {
          name: "pikachu"
        },
      },
      result: {
        data: {
          pokemon: {
            id: 25,
            name: 'pikachu',
            sprites: { front_default: 'front' },
            abilities: [{ ability: { name: 'static' } }],
            moves: [{ move: { name: 'thunder-shock'}}],
            types: [{ type: { name: 'electric' } }],
          },
        },
      },
    }
  ]

  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/detail/:name" element={<PokemonDetail />} />
          <Route path="/my-list" element={<MyPokemonList />} />
        </Routes>
      </MockedProvider>
    </Router>
  )

  await new Promise(resolve => setTimeout(resolve, 0));

  const cardElm = screen.getByTestId('test-name');
  // Page Pokemon List loaded successfully
  expect(cardElm).toBeInTheDocument();

  act(() => {
    fireEvent.click(cardElm);
  });
  // Page redirect to Pokemon Detail page
  expect(window.location.pathname).toContain('/detail');

  await new Promise(resolve => setTimeout(resolve, 0));

  const titleElm = screen.getByText(/pikachu/i);
  // Page Pokemon Detail loaded successfully
  expect(titleElm).toBeInTheDocument();

  const menuElm = screen.getByText(/my pokemon list/i);
  act(() => {
    fireEvent.click(menuElm);
  })
  // Page redirect to My Pokemon List page
  expect(window.location.pathname).toContain('/my-list');

  await new Promise(resolve => setTimeout(resolve, 0));

  const titleElm2 = screen.queryByText(/empty/i);
  // Page My Pokemon List loaded successfully
  expect(titleElm2).toBeInTheDocument();
})