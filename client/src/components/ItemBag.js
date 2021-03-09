import React, { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { IconContext } from "react-icons";
import { RiShoppingBasket2Line } from "react-icons/ri";

import api from "../apis/api";

const ItemBag = ({ pokemonID, onGiveItem }) => {
  const { user, isAuthenticated } = useAuth0();
  const [items, setItems] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      api
        .post("/viewItems", {
          email: user.email,
        })
        .then((response) => {
          let itemList = [];
          response.data.map((item, index) => {
            return itemList.push({
              item: item._id,
              name: item.item,
              character: item.character,
              value: item.value,
            });
          });
          setItems(itemList);
        });
    }
  }, [isAuthenticated]);

  const giveItem = (item) => {
    api
      .post("/giveItem", {
        email: user.email,
        pokemonID,
        itemID: item.item,
      })
      .then((response) => {
        onGiveItem(item.value);
        const newItemsArray = items.filter((instance) => {
          return instance.item !== item.item;
        });
        setItems(newItemsArray);
      });
  };

  const generateItems = () => {
    return items.map((item) => {
      return (
        <div
          onClick={pokemonID && giveItem ? () => giveItem(item) : null}
          className="itemBagItemContainer"
        >
          <div className="itemBagItemChar">{item.character}</div>
          <div className="itemBagItemName">{item.name}</div>
          <div className="itemBagItemValue">{item.value}</div>
        </div>
      );
    });
  };

  return (
    <div className="itemBagContainer">
      <IconContext.Provider value={{ size: "2em", color: "black" }}>
        <div className="itemContainerTitle">
          {!items.length ? "NO " : null}ITEMS IN BAG
        </div>
        {pokemonID && giveItem && items.length ? (
          <div className="itemContainerSubTitle">
            TAP ITEM TO GIVE TO POKEMON
          </div>
        ) : null}
        <div className="itemBagItemsContainer">{generateItems()}</div>
        <div
          onClick={() => history.push("/market")}
          className="itemBagMarketButton"
        >
          <RiShoppingBasket2Line />
          <div className="itemBagMarketButtonText">VISIT MARKET</div>
        </div>
      </IconContext.Provider>
    </div>
  );
};

export default ItemBag;
