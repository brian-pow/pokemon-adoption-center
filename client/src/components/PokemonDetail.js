import React, { useState } from "react";

import { useQuery } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";
import { IconContext } from "react-icons";
import { CgShoppingCart } from "react-icons/cg";

import Modal from "./Modal";
import Pokemon from "./Pokemon";
import { GET_POKEMON_DETAILS } from "../gql/queries";

const PokemonDetail = () => {
  const { species } = useParams("species");
  const history = useHistory();
  const [modal, toggleModal] = useState(0);

  const { data, loading, error } = useQuery(GET_POKEMON_DETAILS, {
    variables: {
      pokemon: species,
    },
  });

  if (!data || loading) return <div>Loading</div>;

  const addToCart = () => {
    let currentCart;

    //Check if cart exists.
    if (localStorage.getItem("cart")) {
      currentCart = JSON.parse(localStorage.getItem("cart"));
    } else {
      currentCart = [];
    }

    //Check if item already exists in cart.
    if (currentCart.includes(data.getPokemonDetailsByName.species)) {
      toggleModal(2);
    } else {
      let updatedCart = [...currentCart, data.getPokemonDetailsByName.species];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toggleModal(1);
    }
  };

  //Modal
  if (modal === 1)
    return (
      <Modal>
        <div className="modalMainMessage">
          {species.toUpperCase()} was added to your cart.
        </div>
        <div className="modalButton" onClick={() => history.push("/available")}>
          Ok
        </div>
      </Modal>
    );
  if (modal === 2)
    return (
      <Modal>
        <div className="modalMainMessage">
          {species.toUpperCase()} is already in your cart.
        </div>
        <div className="modalButton" onClick={() => history.push("/available")}>
          Ok
        </div>
      </Modal>
    );

  return (
    <IconContext.Provider value={{ size: "2em" }}>
      <div>
        <div className="detailItem">
          <Pokemon name={species} />
          <div className="pokemonDetailName">
            {species.charAt(0).toUpperCase() + species.slice(1)}
          </div>
          <div className="flavorText">
            {data.getPokemonDetailsByName.flavorTexts[0].flavor}
          </div>
        </div>
        <div className="greyButton" onClick={() => addToCart()}>
          <CgShoppingCart />
          <div>Add to Cart</div>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default PokemonDetail;
