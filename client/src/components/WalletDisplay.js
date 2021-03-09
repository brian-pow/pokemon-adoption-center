import React from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { IconContext } from "react-icons";
import { GiTwoCoins } from "react-icons/gi";

import useCurrency from "../hooks/useCurrency";

const WalletDisplay = () => {
  const { user } = useAuth0();
  const { status, currentValue } = useCurrency(user ? user.email : null);

  return (
    <>
      <div className="currencyContainer">
        <div className="currencyValue">
          {currentValue && status !== "fetching" ? currentValue : null}
        </div>
        <IconContext.Provider value={{ size: "2em", color: "black" }}>
          <div className="currencyIcon">
            <GiTwoCoins />
          </div>
        </IconContext.Provider>
      </div>
      {currentValue && currentValue < 50 ? (
        <div className="currencyContainerLowFunds">
          coins increase by 50 each day
        </div>
      ) : null}
    </>
  );
};

export default WalletDisplay;
