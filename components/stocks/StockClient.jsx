"use client";

import NewStockLink from "@/components/stocks/AddStock";
import DisplayStocks from "@/components/stocks/DisplayStocks";
import { useEffect, useState } from "react";

export default function StocksClient() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <p>
        Version: {date.toLocaleDateString()} {date.getHours()}:
        {date.getMinutes()}:{date.getSeconds()}
      </p>
      <h1>My Stocks</h1>
      <NewStockLink />
      <DisplayStocks />
    </main>
  );
}
