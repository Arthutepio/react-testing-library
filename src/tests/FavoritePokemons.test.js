import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../pages';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('Verifica se é exibida na tela a mensagem No favorite pokemon found', () => {
  renderWithRouter(<FavoritePokemons />);

  const mensage = screen.getByText(/no favorite pokemon found/i);
  expect(mensage).toBeInTheDocument();
});

it('Verifica se são exibidos todos os cards de pokémons favoritados.', () => {
  renderWithRouter(<App />);

  const linkDetails = screen.getByRole('link', { name: /more details/i });
  userEvent.click(linkDetails);

  const favorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
  userEvent.click(favorite);

  const linkFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
  userEvent.click(linkFavorite);

  const pokemonFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
  expect(pokemonFavorite).toBeInTheDocument();
});
