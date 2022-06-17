import axios from 'axios';

import { Pokemon, PokemonStatus } from '../interfaces/Pokemon';
import { getPokemonUrlImages } from './getPokemonUrlImages';
import { getPokemonWeakeanes } from './getPokemonWeakeanes';

export const bana = getPokemon('charizard').then(f => {
  console.log('opa' + f);
});
async function getPokemon(pokemonName: string) {
  const pokeGet = await axios.get(
    'https://pokeapi.co/api/v2/pokemon/' + pokemonName,
  );
  const data = pokeGet.data;
  const pokemonTypes = {
    types: data.types,
  };
  let weak;
  if (pokemonTypes.types.length > 1)
    weak = await getPokemonWeakeanes({
      type1: pokemonTypes.types[0].type.url,
      type2: pokemonTypes.types[1].type.url,
    });
  else {
    weak = await getPokemonWeakeanes({ type1: pokemonTypes.types[0].type.url });
  }

  const pokemonStatus: PokemonStatus = {
    hp: '',
    attack: '',
    defense: '',
    specialAttack: '',
    specialDefense: '',
    speed: '',
    types: pokemonTypes,
  };
  const pokemonImages = getPokemonUrlImages(data);
  const pokemon: Pokemon = {
    idPokedex: '',
    name: '',
    sexMalePorcentage: '',
    sexFemalePorcentage: '',
    stats: pokemonStatus,
    image: pokemonImages,
  };
}
