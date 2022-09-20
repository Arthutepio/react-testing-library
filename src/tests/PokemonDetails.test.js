import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const { name, summary, foundAt } = pokemons[0];

it('Verifica se as informações do pokémon selecionado são mostradas na tela', () => {
  renderWithRouter(<App />);

  const linkDetails = screen.getByRole('link', { name: /more details/i });
  userEvent.click(linkDetails);

  expect(screen.getByRole('heading', { name: `${name} Details` })).toBeDefined();
  expect(screen.getByRole('heading', { name: /summary/i })).toBeDefined();
  expect(screen.getByRole('heading', { name: `Game Locations of ${name}` }));
  expect(screen.getByText(summary)).toBeDefined();

  const img = screen.getAllByAltText('Pikachu location');

  expect(img[0]).toHaveAttribute('src', foundAt[0].map);
  expect(img[1]).toHaveAttribute('src', foundAt[1].map);
  expect(screen.getByLabelText(/pokémon favoritado\?/i)).toBeDefined();
});
