export type PokedexTheme = "blue" | "red" | "yellow" | "green";
export type PokemonUri = {
  name: string;
  url: string;
};

export type PokemonAbility = {
  ability: {
    name: string;
    url: string;
  };
};

export type PokemonStat = {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
};

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type Pokemon = {
  id: number;
  name: string;
  stats: PokemonStat[];
  types: { type: { name: string } }[];
  weaknesses?: string[];
  weight: number;
  height: number;
  abilities: PokemonAbility[];
  sprites: {
    front_default: string;
  };
};

export type PokemonDetail = {
  types: PokemonType[];
};

export type DamageRelations = {
  double_damage_from: {
    name: string;
    url: string;
  }[];
};

export type UsePokemonOpts = {
  limit?: number;
};
