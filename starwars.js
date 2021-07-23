// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.dev/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução

import { play } from './music.js';
import { numero2romano } from './roman.js';
import { restartAnimation } from './restart-animation.js';

const API_ENDPOINT = 'https://swapi.dev/api'

play({
  audioUrl: 'audio/tema-sw.mp3',
  coverImageUrl: 'imgs/logo.svg',
  title: 'Intro',
  artist: 'John Williams'
}, document.body);

const resposta = await fetch(`${API_ENDPOINT}/films`);
const { results } = await resposta.json();
const filmes = results;
console.log(filmes);


const listaFilmesEl = document.querySelector('#filmes ul');
const preIntroEl = document.querySelector('pre.introducao');

listaFilmesEl.innerHTML = '';
let numeroFilme = 1;
filmes.forEach(filme => {
  let novoFilmeEl = document.createElement('li');
  novoFilmeEl.innerHTML = `<li>Episode ${numero2romano(numeroFilme)} - ${filme.title}</li>`;
  listaFilmesEl.appendChild(novoFilmeEl);
  numeroFilme++;

  novoFilmeEl.addEventListener('click', () => {
    preIntroEl.innerHTML = `
      Episode ${numero2romano(numeroFilme)}
      ${filme.title}

      ${filme.opening_crawl}
    `;

    restartAnimation(preIntroEl)
  })
});
