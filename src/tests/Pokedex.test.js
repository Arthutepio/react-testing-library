import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

it('Verifica se a página contém um heading h2 com o texto Encountered pokémons', () => {
  renderWithRouter(<App />);

  const text = screen.getByRole('heading', { name: /encountered pokémons/i, level: 2 });
  expect(text).toBeInTheDocument();
});

// eslint-disable-next-line max-len
it('Verifica se é exibido o próximo pokémon da lista quando o botão Próximo pokémon é clicado', () => {
  renderWithRouter(<App />);

  const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
  userEvent.click(buttonNext);

  const nextPokemon = screen.getByText(/charmander/i);
  expect(nextPokemon).toBeInTheDocument();
  userEvent.click(buttonNext);

  const nextPokemon2 = screen.getByText(/caterpie/i);
  expect(nextPokemon2).toBeInTheDocument();
  userEvent.click(buttonNext);

  const nextPokemon3 = screen.getByText(/ekans/i);
  expect(nextPokemon3).toBeInTheDocument();
  userEvent.click(buttonNext);

  const nextPokemon4 = screen.getByText(/alakazam/i);
  expect(nextPokemon4).toBeInTheDocument();
  userEvent.click(buttonNext);

  const nextPokemon5 = screen.getByText(/mew/i);
  expect(nextPokemon5).toBeInTheDocument();
  userEvent.click(buttonNext);

  const nextPokemon6 = screen.getByText(/rapidash/i);
  expect(nextPokemon6).toBeInTheDocument();
  userEvent.click(buttonNext);

  const nextPokemon7 = screen.getByText(/snorlax/i);
  expect(nextPokemon7).toBeInTheDocument();
  userEvent.click(buttonNext);

  const nextPokemon8 = screen.getByText(/dragonair/i);
  expect(nextPokemon8).toBeInTheDocument();
  userEvent.click(buttonNext);

  const nextPokemon0 = screen.getByText(/pikachu/i);
  expect(nextPokemon0).toBeInTheDocument();
});

it('Verifica se é mostrado apenas um pokémon por vez', () => {
  renderWithRouter(<App />);

  const buttons = screen.getAllByTestId('pokemon-type-button');
  const buttonAll = screen.getByRole('button', { name: /all/i });
  const pokemonTypes = ['Electric', 'Fire', 'Bug',
    'Poison', 'Psychic', 'Normal', 'Dragon'];

  pokemonTypes.forEach((tipos) => {
    const btn = screen.getByRole('button', { name: tipos });
    expect(btn).toBeDefined();
    const filter = pokemons.filter(({ type }) => type === tipos);
    filter.forEach(({ type }) => {
      userEvent.click(btn);
      const pokemonType = screen.getByTestId('pokemon-type');
      expect(pokemonType).toBeInTheDocument(type);
    });

    const idType = screen.getByTestId('pokemon-type');
    expect(idType).toBeInTheDocument(tipos);
    expect(buttonAll).toBeDefined();
  });
  const numBtn = 7;
  expect(buttons).toHaveLength(numBtn);
});

it('Verifica se a Pokédex tem os botões de filtro', () => {
  renderWithRouter(<App />);

  const buttonAll = screen.getByRole('button', { name: /all/i });
  userEvent.click(buttonAll);
  pokemons.forEach(({ name }) => {
    expect(screen.getByText(name)).toBeDefined();
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextButton);
  });
});

it('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
  renderWithRouter(<App />);

  const btnAll = screen.getByRole('button', { name: /all/i });
  expect(btnAll).toBeInTheDocument();
  expect(btnAll.innerHTML).toBe('All');
  // A Pokedéx deverá mostrar os pokémons normalmente (sem filtros) quando o botão All for clicado;
  // Ao carregar a página, o filtro selecionado deverá ser All.
});
