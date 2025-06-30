export type PokemonRecordFromAPI = {
  id: number;
  name: string;
  expiresOn: number;
  avatar: string;
  weight: number;
  height: number;
  abilities: any[];
  moves: any[];
  stats: any[];
};

export type AbilityFromAPI = {
  is_hidden: boolean;
  slot: number;
  ability: {
    name: string;
    url: string;
  };
};

export type MoveFromAPI = {
  move: {
    name: string;
    url: string;
  };
};

export type StatFromAPI = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};
