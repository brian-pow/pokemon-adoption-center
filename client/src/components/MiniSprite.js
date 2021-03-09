import React from "react";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";

import { GET_POKEMON_DETAILS } from "../gql/queries";

const MiniSprite = ({ name, id, index }) => {
  const { data, loading, error } = useQuery(GET_POKEMON_DETAILS, {
    variables: {
      pokemon: name,
    },
  });
  const history = useHistory();

  const onPokemonClick = (name) => {
    history.push(`/pokemonProfile/${id}/${name}`);
  };

  if (!data) return null;
  return (
    <div
      onClick={() => onPokemonClick(data.getPokemonDetailsByName.species)}
      className={`miniSprite spriteIndex${index}`}
    >
      <img
        alt={data.getPokemonDetailsByName.species}
        src={data.getPokemonDetailsByName.sprite}
        height="40"
      />
    </div>
  );
};

export default MiniSprite;
