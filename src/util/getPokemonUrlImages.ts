import { PokemonImage } from '../interfaces/Pokemon';

export function getPokemonUrlImages(pokemon: any): PokemonImage {
  let image: PokemonImage;

  const defaultFront = pokemon.sprites.front_default;
  const defaultShinyFront = pokemon.sprites.front_shiny;

  if (pokemon.sprites.front_female != null) {
    const femaleFront = pokemon.sprites.front_female;
    const femaleShinyFront = pokemon.sprites.front_shiny_female;
    image = {
      UrlMaleOrUndefined: defaultFront,
      UrlShiny: defaultShinyFront,
      UrlFemale: femaleFront,
      UrlShinyFemale: femaleShinyFront,
    };

    return image;
  }

  image = {
    UrlMaleOrUndefined: defaultFront,
    UrlShiny: defaultShinyFront,
  };

  return image;
}
