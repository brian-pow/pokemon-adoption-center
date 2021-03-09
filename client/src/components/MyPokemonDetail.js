import React, { useState, useEffect } from "react";

import { useQuery } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import api from "../apis/api";

import { GET_POKEMON_DETAILS } from "../gql/queries";
import ItemBag from "./ItemBag";
import poke_landscape from "../assets/poke_landscape.png";
import calculateHealthColor from "../utils/calculateHealthColor";

import LoadingDiv from "./LoadingDiv";

const MyPokemonDetail = () => {
  const { species } = useParams("species");
  const { id } = useParams("id");
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [singlePokemon, setSinglePokemon] = useState(null);

  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      api
        .post("/viewSinglePokemon", {
          email: user.email,
          id,
        })
        .then((response) => {
          setSinglePokemon(response.data[0]);
        });
    }
  }, [isAuthenticated]);

  const { data, loading, error } = useQuery(GET_POKEMON_DETAILS, {
    variables: {
      pokemon: species,
    },
  });

  const onGiveItem = (value) => {
    setSinglePokemon({
      ...singlePokemon,
      health: singlePokemon.health + value,
    });
  };

  if (!data) return <LoadingDiv />;
  if (!singlePokemon) return <LoadingDiv />;

  return (
    <div>
      <div className="pokeLandscapeContainer">
        <img className="pokeLandscapeImg" src={poke_landscape} />
        <img
          className="pokeLandscapeSprite"
          src={data.getPokemonDetailsByName.sprite}
          width="100"
        />
      </div>
      <div className="myPokemonDetailDetail">
        <div className="myPokemonDetailNameHealthContainer">
          <div className="myPokemonDetailName">{singlePokemon.nickname}</div>
          <div className="myPokemonDetailHealth">
            <div className="myPokemonDetailHealthLabel">HEALTH</div>
            <div
              style={{
                backgroundColor: calculateHealthColor(singlePokemon.health),
              }}
              className="myPokemonDetailHealthData"
            >
              {singlePokemon.health}
            </div>
          </div>
        </div>
        <div className="myPokemonDetailFlavor">
          {data.getPokemonDetailsByName.flavorTexts[0].flavor}
        </div>
      </div>
      <ItemBag pokemonID={id} onGiveItem={onGiveItem} />
    </div>
  );
};

export default MyPokemonDetail;
