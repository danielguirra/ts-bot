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
