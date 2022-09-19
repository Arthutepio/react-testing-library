import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

it('Verifica se a página contém as informações sobre a Pokédex', () => {
  renderWithRouter(<About />);

  const infoPokedex = screen
    .getByText(/this application simulates a pokédex, a digital encyclopedia/i);
  expect(infoPokedex).toBeInTheDocument();
});

it('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
  renderWithRouter(<About />);
  const levelAbout = screen.getByRole('heading', { level: 2 });
  const titleAbout = screen.getByRole('heading', { name: /about pokédex/i });
  expect(levelAbout).toBeInTheDocument();
  expect(titleAbout).toBeInTheDocument();
});

it('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  renderWithRouter(<About />);

  const paragraph1 = screen
    .getByText(/this application simulates a pokédex, a digital encyclopedia/i);
  const paragraph2 = screen
    .getByText(/one can filter pokémons by type, and see more details for each/i);
  expect(paragraph1).toBeInTheDocument();
  expect(paragraph2).toBeInTheDocument();
});

it('Verifica se a página contém uma imagem de uma Pokédex', () => {
  renderWithRouter(<About />);
  const image = screen.getByRole('img', { name: /pokédex/i });
  expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
