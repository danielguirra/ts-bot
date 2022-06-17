import axios from 'axios';

import { PokemonTypesWeakeness } from '../interfaces/Pokemon';
import { mergeObjc } from './mergeObjc';

export async function getPokemonWeakeanes(types: {
  type1: string;
  type2?: string;
}) {
  let weakness1 = await axios.get(types.type1);
  let weakness2;
  if (types.type2) weakness2 = await axios.get(types.type2);
  else weakness2 = weakness1;

  const pokeWeak1: PokemonTypesWeakeness = {
    damageDoubleFrom: weakness1.data.damage_relations.double_damage_from,
    damageDoubleTo: weakness1.data.damage_relations.double_damage_to,
    halfDamageFrom: weakness1.data.damage_relations.half_damage_from,
    halfDamageTo: weakness1.data.damage_relations.half_damage_to,
    noDamageFrom: weakness1.data.damage_relations.no_damage_from,
    noDamegeTo: weakness1.data.damage_relations.no_damage_to,
  };

  const pokeWeak2: PokemonTypesWeakeness = {
    damageDoubleFrom: weakness2.data.damage_relations.double_damage_from,
    damageDoubleTo: weakness2.data.damage_relations.double_damage_to,
    halfDamageFrom: weakness2.data.damage_relations.half_damage_from,
    halfDamageTo: weakness2.data.damage_relations.half_damage_to,
    noDamageFrom: weakness2.data.damage_relations.no_damage_from,
    noDamegeTo: weakness2.data.damage_relations.no_damage_to,
  };

  const finalWeak: PokemonTypesWeakeness = {
    damageDoubleFrom: mergeObjc(
      pokeWeak1.damageDoubleFrom,
      pokeWeak2.damageDoubleFrom,
    ),
    damageDoubleTo: mergeObjc(
      pokeWeak1.damageDoubleTo,
      pokeWeak2.damageDoubleTo,
    ),
    halfDamageFrom: mergeObjc(
      pokeWeak1.halfDamageFrom,
      pokeWeak2.halfDamageFrom,
    ),
    halfDamageTo: mergeObjc(pokeWeak1.halfDamageTo, pokeWeak2.halfDamageTo),
    noDamageFrom: mergeObjc(pokeWeak1.noDamageFrom, pokeWeak2.noDamageFrom),
    noDamegeTo: mergeObjc(pokeWeak1.noDamegeTo, pokeWeak2.noDamegeTo),
  };

  return console.log(finalWeak);
}
