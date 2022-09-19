import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('Verifica se os links possuem o texto "Home", "About", "Favorite Pokémons" ', () => {
  renderWithRouter(<App />);

  const linkHome = screen.getByRole('link', { name: /home/i });
  expect(linkHome).toBeInTheDocument();
  const linkAbout = screen.getByRole('link', { name: /about/i });
  expect(linkAbout).toBeInTheDocument();
  const linkFavorite = screen.getByRole('link', { name: /favorite pokémons/i });
  expect(linkFavorite).toBeInTheDocument();
});

it('Verifica se ao clicar no link Home é redirecionada para "/"', () => {
  const { history } = renderWithRouter(<App />);

  const linkHome = screen.getByRole('link', { name: /home/i });
  userEvent.click(linkHome);

  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

it('Verifica se ao clicar no link About é redirecionada p/ /about', () => {
  const { history } = renderWithRouter(<App />);

  const linkAbout = screen.getByRole('link', { name: /about/i });
  userEvent.click(linkAbout);

  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

it('Verifica se ao clicar no link Favorite Pokémons é redirecionada p /favorites', () => {
  const { history } = renderWithRouter(<App />);

  const linkFavorite = screen.getByRole('link', { name: /favorite pokémons/i });
  userEvent.click(linkFavorite);

  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

it('Verifica Not Found ao entrar em uma URL desconhecida', () => {
  const { history } = renderWithRouter(<App />);

  act(() => {
    history.push('/pagina/que-nao-existe/');
  });

  const notFoundTitle = screen
    .getByRole('heading', { name: /page requested not found/i });
  expect(notFoundTitle).toBeInTheDocument();
});
