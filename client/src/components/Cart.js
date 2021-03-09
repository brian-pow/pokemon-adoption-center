import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect, useHistory } from "react-router-dom";
import api from "../apis/api";

import Pokemon from "./Pokemon";
import Modal from "./Modal";
import LoadingDiv from "./LoadingDiv";
import WalletDisplay from "./WalletDisplay";

const Cart = () => {
  let history = useHistory();
  const { user, isAuthenticated, isLoading } = useAuth0();
  let [cartPokemon, setCartPokemon] = useState([]);
  const [pokemonToAdopt, setPokemonToAdopt] = useState("");
  const [modal, toggleModal] = useState(false);
  const [nickname, toggleNickname] = useState(false);
  const [nicknameValue, setNicknameValue] = useState("");
  const [lowFundsError, toggleLowFundsError] = useState(false);

  useEffect(() => {
    let pokemonInCart = JSON.parse(localStorage.getItem("cart"));
    if (!pokemonInCart) {
      return null;
    }
    setCartPokemon(cartPokemon.concat(pokemonInCart));
  }, []);

  const onAdoptButtonClick = (pokemon) => {
    setPokemonToAdopt(pokemon);
    toggleModal(true);
  };

  const adoptPokemon = (species, nickname) => {
    console.log(nickname);
    api
      .post("/adoptPokemon", {
        email: user.email,
        species,
        nickname,
      })
      .then((response) => {
        let updatedCart = cartPokemon.filter((pokemon) => pokemon !== species);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartPokemon(updatedCart);
        history.push("/available");
      })
      .catch((err) => {
        if (err.response.data.message === "Not enough funds") {
          toggleLowFundsError(true);
        }
      });
  };

  const removeFromCart = (pokemon) => {
    let currentCart = JSON.parse(localStorage.getItem("cart"));

    let updatedCart = currentCart.filter((item) => item !== pokemon);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setCartPokemon(updatedCart);
  };

  const getPokemonInCart = () => {
    if (!cartPokemon.length) {
      return (
        <div className="profileContainer">
          <div className="profileLabel">CART IS CURRENTLY EMPTY</div>
        </div>
      );
    }
    return cartPokemon.map((pokemon) => {
      return (
        <div className="cartItemContainer">
          <div className="cartItemLeft">
            <Pokemon name={pokemon} />
          </div>
          <div className="cartItemRight">
            <div className="cartItemName">
              {pokemon.charAt(0) + pokemon.slice(1)}
            </div>
            <div
              className="cartItemButton cartItemAdoptButton"
              onClick={() => onAdoptButtonClick(pokemon)}
            >
              Adopt me
            </div>
            <div
              className="cartItemButton cartItemRemoveButton"
              onClick={() => removeFromCart(pokemon)}
            >
              Remove
            </div>
          </div>
        </div>
      );
    });
  };

  if (isLoading) return <LoadingDiv />;
  if (!isLoading && !isAuthenticated)
    return <Redirect to="/profile"></Redirect>;

  if (lowFundsError)
    return (
      <Modal>
        <div className="modalMainMessage">Not enough funds</div>
        <div
          className="modalButton"
          onClick={() => {
            toggleModal(false);
            toggleLowFundsError(false);
          }}
        >
          Ok
        </div>
      </Modal>
    );

  if (modal)
    return (
      <Modal>
        <div className="modalMainMessage">
          Would you like to give your {pokemonToAdopt.toUpperCase()} a nickname?
        </div>
        {nickname ? null : (
          <div className="modalButton" onClick={() => toggleNickname(true)}>
            Yes
          </div>
        )}
        {nickname ? (
          <input
            onChange={(e) => setNicknameValue(e.target.value)}
            name="nickname"
            className="nicknameInput"
            value={nicknameValue}
          />
        ) : null}
        {nickname ? null : (
          <div
            className="modalButton"
            onClick={() =>
              adoptPokemon(
                pokemonToAdopt,
                pokemonToAdopt.charAt(0).toUpperCase() + pokemonToAdopt.slice(1)
              )
            }
          >
            No
          </div>
        )}
        {nickname ? (
          <div
            className="modalButton"
            onClick={() =>
              adoptPokemon(pokemonToAdopt, nicknameValue || pokemonToAdopt)
            }
          >
            Submit
          </div>
        ) : null}
      </Modal>
    );

  return (
    <div className="divContainer">
      <div className="cartWalletContainer">
        <WalletDisplay />
      </div>
      <div id="container">{getPokemonInCart()}</div>
    </div>
  );
};

export default Cart;
