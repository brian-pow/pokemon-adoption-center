import PokemonNames from "../assets/pokemonNames.json";
import seedrandom from "seedrandom";
import Pokemon from "../components/Pokemon";

const getPokemonForDate = () => {
  let today = new Date();
  let currentDay = today.getDate();
  let currentMonth = today.getMonth();

  let pokemonNameArray = [];

  for (let i = 0; i < 6; i++) {
    let rng = seedrandom(currentDay * currentMonth * (i + 1 / 4));
    let name = PokemonNames[Math.floor(rng() * PokemonNames.length)];
    let lowerCaseName = name.toLowerCase().replace(/\s+/g, " ").trim();
    pokemonNameArray.push(lowerCaseName);
  }

  return pokemonNameArray;
};

export default getPokemonForDate;
