import { useEffect, useState } from "react";
import {
  getPokemonCardExpirationDate,
  getPokemonFromStorage,
  savePokemonToStorage,
} from "../lib/utils";
import { Link } from "react-router";
import type {
  AbilityFromAPI,
  MoveFromAPI,
  PokemonRecordFromAPI,
  StatFromAPI,
} from "../lib/types";

const BASE_API_URL = "http://localhost:8000/api/pokemons/";

function PokemonCard() {
  const [pokemon, setPokemon] = useState<PokemonRecordFromAPI>();

  const fetchPokemon = async () => {
    let pokemon = getPokemonFromStorage();

    const MAX_POKEMONS = 1302;
    const randomId = Math.floor(Math.random() * MAX_POKEMONS) + 1;

    if (!pokemon) {
      pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      pokemon = await pokemon.json();
      const payload = {
        id: pokemon.id,
        name: pokemon.name,
        weight: pokemon.weight,
        height: pokemon.height,
        abilities: pokemon.abilities ?? [],
        moves: pokemon.moves ?? [],
        stats: pokemon.stats ?? [],
        expiresOn: getPokemonCardExpirationDate(),
        avatar: pokemon?.sprites?.other?.home?.front_default ?? "",
      };
      savePokemonToStorage(payload);
      const pokemonAbilties = (payload.abilities as AbilityFromAPI[]).map(
        (ability) => {
          return {
            name: ability.ability.name,
            is_hidden: ability.is_hidden,
            slot: ability.slot,
          };
        }
      );

      const pokemonMoves = (payload.moves as MoveFromAPI[]).map((move) => {
        return {
          name: move.move.name,
        };
      });

      const pokemonStats = (payload.stats as StatFromAPI[]).map((stat) => {
        return {
          name: stat.stat.name,
          base_stat: stat.base_stat,
          effort: stat.effort,
        };
      });

      const { id, ...rest } = payload;

      await fetch(BASE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...rest,
          ref: id,
          avatar: pokemon.sprites?.other?.home?.front_default ?? "",
          abilities: pokemonAbilties,
          moves: pokemonMoves,
          stats: pokemonStats,
        }),
      });
    }
    setPokemon(pokemon);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div className="bg-gray-100 p-4 rounded-xl cursor-pointer">
      <Link to={`/view/${pokemon?.id}`}>
        <div className="flex flex-col items-center gap-2">
          <img
            src={pokemon?.avatar}
            alt="Avatar"
            loading="lazy"
            className="object-cover size-44 rounded-md"
          />
          <h2 className="font-semibold text-2xl">{pokemon?.name}</h2>
          <span>Total Abilities: {pokemon?.abilities?.length}</span>
          <span>Total Moves: {pokemon?.moves?.length}</span>
          <span>Total Stats: {pokemon?.stats?.length}</span>
        </div>
      </Link>
    </div>
  );
}

export default PokemonCard;
