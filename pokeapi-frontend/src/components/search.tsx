import { useState } from "react";
import type { AbilityFromAPI, MoveFromAPI, StatFromAPI } from "../lib/types";

// Icon by Lucide icons (https://lucide.dev/icons/)
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={20}
    height={20}
    className="lucide lucide-search-icon lucide-search"
  >
    <path d="m21 21-4.34-4.34" />
    <circle cx="11" cy="11" r="8" />
  </svg>
);

const BASE_API_URL = "http://localhost:8000/api/pokemons/";

function Search() {
  const [search, setSearch] = useState("");

  const onSearch = async () => {
    const result = await fetch(`${BASE_API_URL}?query=${search}`);
    const response = (await result.json()) as Array<Object>;

    if (!response.length) {
      const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);

      const { id, name, weight, height, abilities, moves, stats, sprites } =
        await result.json();

      const pokemonAbilties = (abilities as AbilityFromAPI[]).map((ability) => {
        return {
          name: ability.ability.name,
          is_hidden: ability.is_hidden,
          slot: ability.slot,
        };
      });

      const pokemonMoves = (moves as MoveFromAPI[]).map((move) => {
        return {
          name: move.move.name,
        };
      });

      const pokemonStats = (stats as StatFromAPI[]).map((stat) => {
        return {
          name: stat.stat.name,
          base_stat: stat.base_stat,
          effort: stat.effort,
        };
      });

      await fetch(`${BASE_API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          weight,
          height,
          avatar: sprites?.other?.home?.front_default ?? "",
          abilities: pokemonAbilties,
          moves: pokemonMoves,
          stats: pokemonStats,
        }),
      });
    }
  };

  return (
    <section>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search pokemon..."
          className="text-sm px-3 py-2 rounded-lg outline-none bg-gray-100 focus:ring-2 focus:ring-gray-500"
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
        />
        <button
          className="px-3 py-2 cursor-pointer outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
          onClick={() => onSearch()}
        >
          <SearchIcon />
        </button>
      </div>
    </section>
  );
}

export default Search;
