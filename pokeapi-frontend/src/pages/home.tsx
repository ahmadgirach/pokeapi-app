import PokemonCard from "../components/pokemon-card";
import Search from "../components/search";

function Home() {
  return (
    <div className="space-y-10 max-w-dvw mx-auto">
      <Search />
      <PokemonCard />
    </div>
  );
}

export default Home;
