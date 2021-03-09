import { useEffect, useState } from "react";

import api from "../apis/api";

const useCurrency = (email, rerender) => {
  const [status, setStatus] = useState("idle");
  const [currentValue, setCurrentValue] = useState(null);

  useEffect(() => {
    if (email) {
      const fetchData = async () => {
        setStatus("fetching");
        const response = await api.post("/viewCurrency", { email });
        setCurrentValue(response.data.currency);
        setStatus("complete");
      };

      fetchData();
    }
  }, [email, rerender]);

  return { status, currentValue };
};

export default useCurrency;
