import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

// eslint-disable-next-line max-len
it('Verifica se a página contém um heading h2 com o texto Page requested not found', () => {
  renderWithRouter(<NotFound />);

  const text = screen.getByRole('heading', { name: /page requested not found/i });
  const levelText = screen.getByRole('heading', { level: 2 });
  expect(text).toBeInTheDocument();
  expect(levelText).toBeInTheDocument();
});

it('Verifica se a página mostra uma imagem', () => {
  renderWithRouter(<NotFound />);

  const image = screen
    // eslint-disable-next-line max-len
    .getByRole('img', { name: /pikachu crying because the page requested was not found/i });
  expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
