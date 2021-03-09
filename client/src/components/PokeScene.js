import React from "react";
import MiniSprite from "./MiniSprite";

import scenery from "../assets/scenery.jpg";

const PokeScene = ({ pokemon }) => {
  const renderSprites = () => {
    return pokemon.map((sprite, index) => {
      return <MiniSprite name={sprite.name} id={sprite.id} index={index} />;
    });
  };
  return (
    <div className="pokeSceneContainer">
      <div className="imageDiv">
        <img src={scenery} />
      </div>
      {renderSprites()}
    </div>
  );
};

export default PokeScene;
