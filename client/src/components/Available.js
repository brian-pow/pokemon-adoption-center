import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Pokemon from "./Pokemon";
import CartWidget from "./CartWidget";
import LoadingDiv from "./LoadingDiv";
import getPokemonForDate from "../utils/getPokemonForDate";

const Available = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingDiv />;
  }

  let pokemonNameArray = getPokemonForDate();

  return (
    <div id="divContainer">
      <div className="overheadMessage">
        <div>Today's selection</div>
        <div className="date">March 2, 2021</div>
      </div>
      <div className="container">
        <Pokemon name={pokemonNameArray[0]} />
        <Pokemon name={pokemonNameArray[1]} />
        <Pokemon name={pokemonNameArray[2]} />
        <Pokemon name={pokemonNameArray[3]} />
        <Pokemon name={pokemonNameArray[4]} />
        <Pokemon name={pokemonNameArray[5]} />
      </div>
      <CartWidget />
    </div>
  );
};

export default Available;
