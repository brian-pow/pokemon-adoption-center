import React, { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";

import WalletDisplay from "./WalletDisplay";
import api from "../apis/api";
import ItemBag from "./ItemBag";
import LoadingDiv from "./LoadingDiv";

const Profile = () => {
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    isLoading,
  } = useAuth0();
  const [pokemon, setPokemon] = useState([]);

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
            });
          });
          setPokemon(pokemonList);
        });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <LoadingDiv />;

  const loginButton = () => {
    return <button onClick={() => loginWithRedirect()}>Log In</button>;
  };

  const logoutButton = () => {
    return (
      <button onClick={() => logout({ returnTo: window.location.origin })}>
        Log Out
      </button>
    );
  };

  if (!isAuthenticated || !user)
    return (
      <div className="profileContainer">
        <div className="profileLabel">
          PLEASE LOGIN TO ADOPT AND VISIT POKEMON
        </div>
        <div className="profileAuthButton profileLoginButton">
          {loginButton()}
        </div>
      </div>
    );

  return (
    <div>
      <div className="profileContainer">
        <div className="profileLabel">USER</div>
        <div className="profileInfo">{user.email}</div>
        <div className="profileLabel">WALLET</div>
        <WalletDisplay />
        <div className="profileLabel"># POKEMON</div>
        <div className="profileInfo">{pokemon.length}</div>
        <div className="profileAuthButton profileLogoutButton">
          {logoutButton()}
        </div>
      </div>
      <ItemBag />
    </div>
  );
};

export default Profile;
