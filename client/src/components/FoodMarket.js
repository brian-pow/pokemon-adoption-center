import React, { useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";

import useFetchEmojiFood from "../hooks/useFetchEmojiFood";
import useCurrency from "../hooks/useCurrency";
import api from "../apis/api";
import Modal from "./Modal";
import WalletDisplay from "./WalletDisplay";
import ItemBag from "./ItemBag";

const FoodMarket = () => {
  const { user } = useAuth0();
  const { food } = useFetchEmojiFood();
  const [modal, toggleModal] = useState();
  const { status, currentValue } = useCurrency(user ? user.email : null, modal);
  const [selectedItem, setSelectedItem] = useState(null);

  //Get random items
  const promptItemPurchase = (item) => {
    let itemPacket = {
      email: user.email,
      item: item.unicodeName,
      character: item.character,
      unicodeValue: item.codePoint,
      value: item.value,
    };
    api.post("/addItem", itemPacket).then((response) => {
      toggleModal(false);
    });
  };

  const foodItems = () => {
    return food.map((item) => {
      return (
        <div
          onClick={() => {
            toggleModal(true);
            setSelectedItem(item);
          }}
          class="marketItemContainer"
        >
          <div className="marketItemChar">{item.character}</div>
          <div className="marketItemName">{item.unicodeName}</div>
          <div className="marketItemValue">{item.value}</div>
        </div>
      );
    });
  };

  if (modal)
    return (
      <Modal>
        <div>Would you like to purchase {selectedItem.unicodeName}?</div>
        <div
          className="modalButton"
          onClick={() => promptItemPurchase(selectedItem)}
        >
          Yes
        </div>
        <div className="modalButton" onClick={() => toggleModal(false)}>
          No
        </div>
      </Modal>
    );

  return (
    <>
      <div className="marketContainer">
        <div>Welcome to the market</div>
        <WalletDisplay />
        {food ? foodItems() : null}
      </div>
      <ItemBag />
    </>
  );
};

export default FoodMarket;
