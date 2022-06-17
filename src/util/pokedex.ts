<<<<<<< HEAD
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
=======
interface PokemonStatus {
  hp: string;
  attack: string;
  defense: string;
  specialAttack: string;
  specialDefense: string;
  speed: string;
  type1: PokemonType;
  type2?: PokemonType;
}

interface PokemonImage {
  UrlMaleOrUndefined: string;
  UrlShiny: string;

  UrlFemale?: string;
  UrlShinyFemale?: string;
}

interface PokemonType {
  name: string;
  weakness: Array<PokemonTypesWeakeness>;
}

interface Pokemon {
  name: string;

  sexMalePorcentage: string;
  sexFemalePorcentage: string;

  stats: PokemonStatus;
  image: PokemonImage;
}

interface PokemonTypesWeakeness {}

// export async function getPokemon(pokemonName: string): Promise<Pokemon> {}
>>>>>>> 9b6347b8a5ca97e5fabcaac3a922ae3fffccc330
