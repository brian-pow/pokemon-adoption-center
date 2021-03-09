import React from "react";

import { Switch, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import "./App.css";
import { config } from "../constants";
import Landing from "./Landing";
import Available from "./Available";
import PostAuth from "./PostAuth";
import PokemonDetail from "./PokemonDetail";
import Cart from "./Cart";
import MyPokemon from "./MyPokemon";
import MyPokemonDetail from "./MyPokemonDetail";
import Profile from "./Profile";
import FoodMarket from "./FoodMarket";
import ItemBag from "./ItemBag";
import Footer from "./Footer";

const App = () => {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH_O_DOMAIN}
      clientId={process.env.REACT_APP_AUTH_O_CLIENT}
      redirectUri={config.REDIRECT_URL}
    >
      <Switch>
        <Route path="/" exact>
          <Landing />
        </Route>
        <Route path="/available" exact>
          <Available />
          <Footer />
        </Route>
        <Route path="/cart">
          <Cart />
          <Footer />
        </Route>
        <Route path="/myPokemon">
          <MyPokemon />
          <Footer />
        </Route>
        <Route path="/pokemonProfile/:id/:species">
          <MyPokemonDetail />
          <Footer />
        </Route>
        <Route path="/profile">
          <Profile />
          <Footer />
        </Route>
        <Route path="/postAuth">
          <PostAuth />
        </Route>
        <Route path="/pokemon/:species">
          <PokemonDetail />
          <Footer />
        </Route>
        <Route path="/market">
          <FoodMarket />
          <Footer />
        </Route>
        <Route path="/bag">
          <ItemBag />
        </Route>
      </Switch>
    </Auth0Provider>
  );
};

export default App;
