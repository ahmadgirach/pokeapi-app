import PokemonCard from "../components/pokemon-card";
import Search from "../components/search";

function Home() {
  return (
    <div className="space-y-10">
      <Search />
      <PokemonCard />
    </div>
  );
}

export default Home;
