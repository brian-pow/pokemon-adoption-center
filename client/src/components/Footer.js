import React from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { CgClipboard } from "react-icons/cg";
import { CgPokemon } from "react-icons/cg";
import { CgUser } from "react-icons/cg";
const Footer = () => {
  return (
    <div className="footerContainer">
      <IconContext.Provider value={{ size: "2em" }}>
        <div className="footerIconContainer">
          <Link to="/available">
            <CgClipboard />
          </Link>
        </div>
        <div className="footerIconContainer">
          <Link to="/myPokemon">
            <CgPokemon />
          </Link>
        </div>
        <div className="footerIconContainer">
          <Link to="/profile">
            <CgUser />
          </Link>
        </div>
      </IconContext.Provider>
    </div>
  );
};

export default Footer;
