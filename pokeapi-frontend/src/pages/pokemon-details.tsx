import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { PokemonRecordFromAPI } from "../lib/types";

type CurrentTab = "abilities" | "moves" | "stats";

type CommonRecord = {
  name: string;
};

type CommonRecords = {
  data: CommonRecord[];
};

const ShowRecord = ({ name }: { name: string }) => {
  return (
    <span className="text-sm rounded-full px-4 py-2 bg-gray-200 transition-colors hover:bg-gray-300">
      {name}
    </span>
  );
};

const ShowRecords = ({ data }: CommonRecords) => {
  return (
    <>
      {data.map((record, index) => (
        <ShowRecord name={record.name} key={index} />
      ))}
    </>
  );
};

function PokemonDetailsPage() {
  const { pokemonId } = useParams();

  const [pokemon, setPokemon] = useState<PokemonRecordFromAPI>();
  const [currentTab, setCurrentTab] = useState<CurrentTab>("abilities");

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
    <section className="p-10">
      <h2 className="font-semibold text-xl text-center my-5">
        {pokemon?.name}
      </h2>
      <div className="flex items-baseline gap-10">
        <div>
          <div
            className={`border border-gray-300 bg-gray-100 px-3 py-2 hover:bg-gray-200 transition-colors cursor-pointer ${
              currentTab === "abilities" ? "bg-gray-200" : ""
            }`}
            onClick={() => setCurrentTab("abilities")}
          >
            <h2>Abilities</h2>
          </div>
          <div
            className={`border border-gray-300 bg-gray-100 px-3 py-2 hover:bg-gray-200 transition-colors cursor-pointer ${
              currentTab === "stats" ? "bg-gray-200" : ""
            }`}
            onClick={() => setCurrentTab("stats")}
          >
            <h2>Stats</h2>
          </div>
          <div
            className={`border border-gray-300 bg-gray-100 px-3 py-2 hover:bg-gray-200 transition-colors cursor-pointer ${
              currentTab === "moves" ? "bg-gray-200" : ""
            }`}
            onClick={() => setCurrentTab("moves")}
          >
            <h2>Moves</h2>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {currentTab === "abilities" && (
            <ShowRecords data={pokemon?.abilities ?? []} />
          )}
          {currentTab === "moves" && (
            <ShowRecords data={pokemon?.moves ?? []} />
          )}
          {currentTab === "stats" && (
            <ShowRecords data={pokemon?.stats ?? []} />
          )}
        </div>
      </div>
    </section>
  );
}

export default PokemonDetailsPage;
