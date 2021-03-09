import { useEffect, useState } from "react";

import emojiFood from "../apis/emojiFood";

const useFetchEmojiFood = () => {
  const [food, setFood] = useState(null);

  useEffect(() => {
    const getFood = async () => {
      const response = await emojiFood.get(
        "/categories/food-drink?access_key=3eae0fd92a8740c86c1f6e309fc42b1f417c5f73"
      );
      const trimmedArray = response.data.filter((item) => {
        return !item.unicodeName.includes("E");
      });

      let today = new Date();
      let currentMonthDay = today.getDate();

      let arrayOfDates = [];

      for (let i = 0; i < 4; i++) {
        if (currentMonthDay >= trimmedArray.length) {
          arrayOfDates.push(arrayOfDates[0] + 10);
        } else {
          arrayOfDates.push(currentMonthDay);
        }
        currentMonthDay += 30;
      }

      console.log(arrayOfDates);

      const chosenItems = arrayOfDates.map((item) => {
        return trimmedArray[item];
      });

      const withValueAppended = chosenItems.map((item) => {
        item.value = 3 + Math.floor(Math.random() * 10);
        return item;
      });

      //Return 4 random emojis
      setFood(withValueAppended);
    };

    getFood();
    //
  }, []);

  return { food };
};

export default useFetchEmojiFood;
