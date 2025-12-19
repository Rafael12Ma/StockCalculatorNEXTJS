"use client";

import { useEffect, useState } from "react";
import Base from "./Base";
import Status from "./statusForm";

export default function SearchStock() {
  const [prices, setPrices] = useState({});
  const [symbol, setSymbol] = useState("NVDA");
  const [errors, setErrors] = useState([]);

  function includesNumber(value) {
    return /\d/.test(value);
  }

  function search(formData) {
    const value = formData.get("search").trim();
    if (!value) return;
    setErrors([]);

    const a = includesNumber(value);
    if (a) {
      setErrors((prevErrors) => [
        ...prevErrors,
        "Stock slug should not contain a number.",
      ]);
      return;
    }

    if (value) {
      setSymbol(value.toUpperCase());
    }
  }

  // 1. Fetch open prices ONCE
  useEffect(() => {
    async function fetchOpens() {
      const res = await fetch(`/api/quote?symbol=${symbol}`);
      const data = await res.json();

      setPrices((prev) => ({
        ...prev,
        [symbol]: {
          open: data.open,
          current: data.current,
          hightPrice: data.hightPrice,
          lowPrice: data.lowPrice,
        },
      }));
    }

    fetchOpens();
  }, [symbol]);

  // 2. Real-time updates (current price only)
  useEffect(() => {
    const query = symbol;
    const eventSource = new EventSource(`/api/stock-stream?symbols=${query}`);

    eventSource.onmessage = (event) => {
      const payload = JSON.parse(event.data);

      if (payload.type === "trade" && payload.data?.length) {
        setPrices((prev) => {
          const updated = { ...prev };

          payload.data.forEach((trade) => {
            if (!updated[trade.s]) updated[trade.s] = {};
            updated[trade.s].current = trade.p;
          });

          return updated;
        });
      }
    };

    return () => eventSource.close();
  }, [symbol]);

  const stock = prices[symbol] || {};

  useEffect(() => {
    const stock = prices[symbol];

    if (!stock) return;

    if (stock.open === 0) {
      setErrors(["There is no stock named " + symbol]);
    } else {
      setErrors([]);
    }
  }, [prices, symbol]);

  //   if (stock.open === 0) {
  //     setErrors((prevErrors) => [...prevErrors, "test"]);
  //   }
  //   if (true) {
  //     // setErrors((prev) => [""]);
  //   }
  console.log("errros length =", errors.length);
  console.log("errors:", errors);

  return (
    <>
      <div className="items-center mb-30 flex flex-col">
        <form
          action={search}
          className="flex justify-center w-xl items-center border p-5 gap-5 mt-10"
        >
          <label htmlFor="">Search stock :</label>
          <input
            name="search"
            type="text"
            placeholder="e.g NVDA"
            // autoFocus
            required
            maxLength={4}
          />
          <Status />
        </form>
        {errors.length > 0 ? (
          <ul>
            {" "}
            {errors.map((error) => (
              <li className="text-red-500 m-2" key={error}>
                {error}
              </li>
            ))}{" "}
          </ul>
        ) : (
          <Base stock={stock} symbol={symbol} />
        )}
      </div>
    </>
  );
}
