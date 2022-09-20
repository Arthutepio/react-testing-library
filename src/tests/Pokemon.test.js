import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const pokemonName = [];
const pokemonImage = [];

pokemons.forEach(({ name, image }) => {
  if (!pokemonName.includes(name)) pokemonName.push(name);
  if (!pokemonImage.includes(image)) pokemonImage.push(image);
});

it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
  renderWithRouter(<App />);

  const linkDetails = screen.getByRole('link', { name: /more details/i });
  expect(linkDetails).toHaveAttribute('href', '/pokemons/25');
  const pokemonType = screen.getByTestId('pokemon-type');
  expect(pokemonType.innerHTML).toBe('Electric');
});

it('Verifica se imagem do pokemon possui o src e o alt corretos', () => {
  renderWithRouter(<App />);

  const nextButton = screen.getByTestId('next-pokemon');
  pokemonName.forEach((pokemon, i) => {
    const pokemonImg = screen.getAllByRole('img');
    expect(pokemonImg[0]).toHaveAttribute('src', pokemonImage[i]);
    expect(pokemonImg[0]).toHaveAttribute('alt', `${pokemon} sprite`);
    userEvent.click(nextButton);
  });
});

it('Verifica se existe um ícone de estrela nos pokémons favoritados', () => {
  const { history } = renderWithRouter(<App />);
  const linkDetails = screen.getByRole('link', { name: /more details/i });
  userEvent.click(linkDetails);

  const favoriteCheck = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
  userEvent.click(favoriteCheck);

  act(() => {
    history.push('/favorites');
  });

  const img = screen.getAllByRole('img');
  expect(img[1]).toHaveAttribute('src', '/star-icon.svg');
  expect(img[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
});
