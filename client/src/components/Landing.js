import React from "react";

import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { CgClipboard } from "react-icons/cg";
import { CgPokemon } from "react-icons/cg";
import { useHistory } from "react-router-dom";

const Landing = () => {
  const history = useHistory();
  return (
    <div className="landingContainer">
      <div className="landingViewport">
        <div className="landingHeader">
          Welcome to the Pokémon Adoption Center
        </div>
        <IconContext.Provider value={{ size: "2em", color: "black" }}>
          <div
            onClick={() => {
              history.push("/available");
            }}
            className="landingLink"
            to="/available"
          >
            <div className="landingPageButton landingPageButtonTop">
              <CgClipboard />
              <div className="landingIconTag">View listings</div>
            </div>
          </div>
          <div
            onClick={() => {
              history.push("/myPokemon");
            }}
            className="landingLink"
            to="/myPokemon"
          >
            <div className="landingPageButton landingPageButtonBottom">
              <CgPokemon />
              <div className="landingIconTag">Visit your Pokémon</div>
            </div>
          </div>
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default Landing;
