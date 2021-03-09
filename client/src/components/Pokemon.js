import React from "react";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";

import { GET_POKEMON_DETAILS } from "../gql/queries";

const Pokemon = ({ name }) => {
  const { data, loading, error } = useQuery(GET_POKEMON_DETAILS, {
    variables: {
      pokemon: name,
    },
  });
  const history = useHistory();

  const onPokemonClick = (name) => {
    history.push(`/pokemon/${name}`);
  };

  const getColor = (type) => {
    switch (type) {
      case "Normal":
        return "#b4956d60";
        break;
      case "Fire":
        return "#fa795760";
        break;
      case "Fighting":
        return "#fe606160";
        break;
      case "Water":
        return "#4fc8d960";
        break;
      case "Flying":
        return "#828bc860";
        break;
      case "Grass":
        return "#7ac85b60";
        break;
      case "Poison":
        return "#b363a060";
        break;
      case "Electric":
        return "#fac40a60";
        break;
      case "Ground":
        return "#ecb16060";
        break;
      case "Psychic":
        return "#fc639760";
        break;
      case "Rock":
        return "#aaa06360";
        break;
      case "Ice":
        return "#99d7d860";
        break;
      case "Bug":
        return "#A8B82060";
        break;
      case "Dragon":
        return "#5a64aa60";
        break;
      case "Ghost":
        return "#836d9760";
        break;
      case "Dark":
        return "#5a504f60";
        break;
      case "Steel":
        return "#8cb4be60";
        break;
      case "Fairy":
        return "#fe77ac60";
        break;
      default:
        return "#dbdbdb60";
    }
  };

  if (!data) return null;
  return (
    <div
      onClick={() => onPokemonClick(data.getPokemonDetailsByName.species)}
      className="item"
      style={{
        backgroundColor: getColor(data.getPokemonDetailsByName.types[0]),
      }}
    >
      <img
        alt={data.getPokemonDetailsByName.species}
        src={data.getPokemonDetailsByName.sprite}
      />
    </div>
  );
};

export default Pokemon;
