import type { PokemonRecordFromAPI } from "./types";

export function getPokemonCardExpirationDate() {
  // Setting 1 day as of now.
  return Math.floor(new Date().getTime() / 1000) + 86_400;
}

export function savePokemonToStorage(pokemon: PokemonRecordFromAPI) {
  try {
    const KEY = "currentPokemon";
    const exists = localStorage.getItem(KEY);

    if (!exists) {
      localStorage.setItem(KEY, JSON.stringify(pokemon));
    } else {
      const pokemon = JSON.parse(exists);
      const currentTime = Math.floor(new Date().getTime() / 1000);
      if (currentTime >= pokemon.expiresOn) {
        localStorage.removeItem(KEY);
      }
    }
  } catch (e) {
    console.log(`Something went wrong while saving pokemon: ${e}`);
  }
}

export function getPokemonFromStorage() {
  try {
    const exists = localStorage.getItem("currentPokemon");
    return JSON.parse(exists!);
  } catch (e) {
    console.log(`Something went wrong while fetching pokemon: ${e}`);
  }
}
