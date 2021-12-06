import { render, screen, fireEvent } from '@testing-library/react';
import PokemonCard from './PokemonCard';

test('renders pokemon card with custom props', () => {
  const {rerender} = render(<PokemonCard id={1} name="pokemon name" />);
  
  expect(screen.getByTestId('test-name')).toHaveTextContent(/1. pokemon name/i);
  expect(screen.queryByText(/Nickname/g)).toBeNull();
  expect(screen.queryByText(/Release/g)).toBeNull();

  rerender(<PokemonCard id={1} name="pokemon name" nickname="Poke" />);
  expect(screen.queryByText(/Nickname: Poke/g)).toBeInTheDocument();
});

test('click event in pokemon card component', () => {
  const handleChange = jest.fn();
  const handleRelease = jest.fn();
  render(<PokemonCard id={1} name="name" onClick={handleChange} onRelease={handleRelease} />)
  const releaseButtonElm = screen.queryByText(/Release/g);
  expect(releaseButtonElm).not.toBeNull();
  
  fireEvent.click(releaseButtonElm);
  fireEvent.click(screen.getByTestId('test-name'));

  expect(handleChange).toBeCalledTimes(2);
  expect(handleRelease).toBeCalledTimes(1);
})