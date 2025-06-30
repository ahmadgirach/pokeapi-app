import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { PokemonRecordFromAPI } from "../lib/types";

type CurrentTab = "abilities" | "moves" | "stats";

function PokemonDetailsPage() {
  const { pokemonId } = useParams();

  const [pokemon, setPokemon] = useState<PokemonRecordFromAPI>();
  const [curentTab, setCurrentTab] = useState<CurrentTab>("abilities");

  const fetchPokemonById = async () => {
    const result = await fetch(
      `http://localhost:8000/api/pokemons/${pokemonId}`
    );
    const ret = await result.json();
    setPokemon(ret);
  };

  useEffect(() => {
    fetchPokemonById();
  }, []);

  return (
    <section className="container">
      <h2 className="font-semibold text-xl text-center my-5">
        {pokemon?.name}
      </h2>
      <div className="flex items-center gap-10">
        <div>
          <div
            className={`border border-gray-300 bg-gray-100 p-3 hover:bg-gray-200 transition-colors cursor-pointer ${
              curentTab === "abilities" ? "bg-gray-200" : ""
            }`}
            onClick={() => setCurrentTab("abilities")}
          >
            <h2>Abilities</h2>
          </div>
          <div
            className={`border border-gray-300 bg-gray-100 p-3 hover:bg-gray-200 transition-colors cursor-pointer ${
              curentTab === "stats" ? "bg-gray-200" : ""
            }`}
            onClick={() => setCurrentTab("stats")}
          >
            <h2>Stats</h2>
          </div>
          <div
            className={`border border-gray-300 bg-gray-100 p-3 hover:bg-gray-200 transition-colors cursor-pointer ${
              curentTab === "moves" ? "bg-gray-200" : ""
            }`}
            onClick={() => setCurrentTab("moves")}
          >
            <h2>Moves</h2>
          </div>
        </div>

        <div className="w-full p-3 rounded-md bg-gray-100">
          {curentTab === "abilities" && (
            <>
              <div className="flex flex-wrap items-center gap-2">
                {pokemon?.abilities.map((ability, index) => (
                  <span
                    key={index}
                    className="text-sm rounded-md px-2 py-1 bg-gray-50"
                  >
                    {ability?.name}
                  </span>
                ))}
              </div>
            </>
          )}

          {curentTab === "moves" && (
            <>
              <div className="flex flex-wrap items-center gap-2">
                {pokemon?.moves.map((move, index) => (
                  <span
                    key={index}
                    className="text-sm rounded-md px-2 py-1 bg-gray-50"
                  >
                    {move?.name}
                  </span>
                ))}
              </div>
            </>
          )}

          {curentTab === "stats" && (
            <>
              <div className="flex flex-wrap items-center gap-2">
                {pokemon?.stats.map((stat, index) => (
                  <span
                    key={index}
                    className="text-sm rounded-md px-2 py-1 bg-gray-50"
                  >
                    {stat?.name}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default PokemonDetailsPage;
