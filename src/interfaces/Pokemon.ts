export interface PokemonStatus {
  hp: string;
  attack: string;
  defense: string;
  specialAttack: string;
  specialDefense: string;
  speed: string;
  types: PokemonTypeArray;
}

export interface PokemonImage {
  UrlMaleOrUndefined: string;
  UrlShiny: string;

  UrlFemale?: string;
  UrlShinyFemale?: string;
}

export interface PokemonTypeArray {
  types: Array<PokemonType>;
}

export interface PokemonType {
  name: string;
  weakness: Array<PokemonTypesWeakeness>;
}

export interface Pokemon {
  idPokedex: string;
  name: string;

  sexMalePorcentage: string;
  sexFemalePorcentage: string;

  stats: PokemonStatus;
  image: PokemonImage;
}

export interface PokemonTypesWeakeness {
  damageDoubleFrom: string | Array<string>;
  damageDoubleTo: string | Array<string>;

  halfDamageFrom: string | Array<string>;
  halfDamageTo: string | Array<string>;

  noDamageFrom: string | Array<string>;
  noDamegeTo: string | Array<string>;
}
