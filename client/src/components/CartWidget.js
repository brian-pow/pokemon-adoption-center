import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { CgShoppingCart } from "react-icons/cg";

const CartWidget = () => {
  let [cartPokemon, setCartPokemon] = useState([]);

  useEffect(() => {
    let pokemonInCart = JSON.parse(localStorage.getItem("cart"));
    if (!pokemonInCart) {
      return null;
    }
    setCartPokemon(cartPokemon.concat(pokemonInCart));
  }, []);

  if (!cartPokemon.length) return null;

  console.log(cartPokemon);

  return (
    <Link className="cartLink" to="/cart">
      <div className="cartWidgetContainer">
        <div className="cartWidgetIcon">
          <IconContext.Provider value={{ size: "2em" }}>
            <CgShoppingCart />
          </IconContext.Provider>
        </div>
        <div className="cartWidgetNumItems">{cartPokemon.length}</div>
      </div>
    </Link>
  );
};

export default CartWidget;
