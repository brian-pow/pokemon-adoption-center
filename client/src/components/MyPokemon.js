import React, { useEffect, useState } from "react";
import api from "../apis/api";

import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

import PokeScene from "../components/PokeScene";
import { Redirect } from "react-router-dom";
import LoadingDiv from "./LoadingDiv";

const MyPokemon = () => {
  const history = useHistory();
  const [pokemon, setPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [toggleScene, setToggleScene] = useState(false);
  const [toggleError, setToggleError] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      api
        .post("/viewPokemon", {
          email: user.email,
        })
        .then((response) => {
          let pokemonList = [];
          response.data.map((pokemon, index) => {
            return pokemonList.push({
              name: pokemon.name,
              nickname: pokemon.nickname,
              checked: false,
              index,
              id: pokemon._id,
            });
          });
          setPokemon(pokemonList);
          if (pokemonList.length <= 3) {
            console.log(pokemonList.length);
            setSelectedPokemon(pokemonList);
            setToggleScene(true);
          }
        });
    }
  }, [isAuthenticated]);

  const onClick = (selected) => {
    if (
      selectedPokemon.filter((poke) => poke.index === selected.index).length > 0
    ) {
      setSelectedPokemon(
        selectedPokemon.filter((poke) => poke.index !== selected.index)
      );
      setPokemon(
        pokemon.map((poke) => {
          if (poke.index === selected.index) {
            return {
              ...poke,
              checked: false,
            };
          } else {
            return poke;
          }
        })
      );
    } else {
      if (selectedPokemon.length === 3) {
        setToggleError(true);
      } else {
        setSelectedPokemon([...selectedPokemon, selected]);
        setPokemon(
          pokemon.map((poke) => {
            if (poke.index === selected.index) {
              return {
                ...poke,
                checked: true,
              };
            } else {
              return poke;
            }
          })
        );
      }
    }
  };

  const onChoice = (e) => {
    e.preventDefault();
    setToggleScene(true);
  };

  const generateForm = () => {
    return (
      <form onSubmit={(e) => onChoice(e)}>
        {formItems()}
        <input
          className="myPokemonInput"
          type="submit"
          value="Choose Selected Pokemon"
        />
      </form>
    );
  };

  const formItems = () => {
    return pokemon.map((pokemon) => {
      return (
        <div
          onClick={() => onClick(pokemon)}
          className={`pokemonOption ${
            pokemon.checked ? "checkedOption" : null
          }`}
        >
          {pokemon.nickname}
        </div>
      );
    });
  };

  if (isLoading) return <LoadingDiv />;
  if (!isLoading && !isAuthenticated)
    return <Redirect to="/profile"></Redirect>;

  if (!pokemon.length) return <Redirect to="/profile"></Redirect>;

  if (!toggleScene)
    return (
      <div className="myPokemonSelectorContainer">
        <div className="overheadMessage">
          <div>Choose up to 3 pokemon to visit</div>
        </div>
        {generateForm()}
        {toggleError ? (
          <div className="errorMessage">Maximum selection is 3</div>
        ) : null}
      </div>
    );

  if (toggleScene) return <PokeScene pokemon={selectedPokemon} />;
};

export default MyPokemon;
