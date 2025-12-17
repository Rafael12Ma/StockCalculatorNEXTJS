"use client";

import { useEffect, useState } from "react";
import classes from "../../components/stocks/DisplayStocks.module.css";

export default function StockTicker({ symbols }) {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    // setTimeout(async () => {
    //   if (!prices["INOD"]) {
    //     const res = await fetch("/api/quote?symbol=INOD");
    //     const data = await res.json();
    //     setPrices((prev) => ({ ...prev, INOD: data.c }));
    //   }
    // }, 5000);
    const query = symbols.join(",");
    const eventSource = new EventSource(`/api/stock-stream?symbols=${query}`);

    eventSource.onmessage = (event) => {
      const payload = JSON.parse(event.data);

      if (payload.type === "trade" && payload.data?.length) {
        const updates = {};

        payload.data.forEach((trade) => {
          updates[trade.s] = trade.p;
        });

        setPrices((prev) => ({ ...prev, ...updates }));
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => eventSource.close();
  }, [symbols]);
  console.log("Symbols:", symbols);
  symbols.map((symbol) => <li key={symbol}>{console.log(prices[symbol])}</li>);
  return (
    <div>
      <h2 className="text-center font-mono font-extrabold m-5">
        Live Stock Prices
      </h2>
      <ul className={classes.stocksGrid}>
        {symbols.map((symbol) => (
          <li key={symbol} className={classes.stockCard}>
            <div className={classes.stockInfo}>
              <h3 className={classes.name}>{symbol}</h3>
              <p className="text-red-500">{prices[symbol] ?? "Loading..."}$</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
