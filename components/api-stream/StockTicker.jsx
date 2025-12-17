"use client";

import { useEffect, useState } from "react";
import classes from "../../components/stocks/DisplayStocks.module.css";
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";

export default function StockTicker({ symbols }) {
  const [prices, setPrices] = useState({});

  // 1. Fetch open prices ONCE
  useEffect(() => {
    async function fetchOpens() {
      for (const symbol of symbols) {
        const res = await fetch(`/api/quote?symbol=${symbol}`);
        const data = await res.json();

        setPrices((prev) => ({
          ...prev,
          [symbol]: {
            open: data.open,
            current: data.current,
          },
        }));
      }
    }

    fetchOpens();
  }, [symbols]);

  // 2. Real-time updates (current price only)
  useEffect(() => {
    const query = symbols.join(",");
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
  }, [symbols]);

  // Helper: percent from open
  const percentFromOpen = (open, current) => {
    if (!open || !current) return null;
    return ((current - open) / open) * 100;
  };

  const absolute = (open, current) => {
    return current - open;
  };

  return (
    <ul className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-8 bg-linear-to-br from-zinc-900 to-black rounded-3xl shadow-2xl">
      {symbols.map((symbol) => {
        const stock = prices[symbol] || {};
        const pct = percentFromOpen(stock.open, stock.current);
        let abs = absolute(stock.open, stock.current);
        abs = abs?.toFixed(2);

        const isUp = pct > 0;

        return (
          <li
            key={symbol}
            className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col gap-3">
              {/* Symbol */}
              <h3 className="text-center text-blue-800 text-lg font-bold tracking-wide ">
                {symbol}
              </h3>

              {/* Price */}
              <p className="text-center text-2xl font-semibold text-zinc-900">
                ${stock.current ?? "—"}
              </p>

              {/* Change */}
              <div className="flex justify-center items-center gap-3">
                <span
                  className={`flex items-center gap-1 text-sm font-semibold ${
                    isUp ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isUp ? <FaArrowUp /> : <FaArrowDown />}
                  {pct !== null ? pct.toFixed(2) + "%" : "—"}
                </span>

                <span
                  className={`text-sm font-medium ${
                    isUp ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {abs ? `${abs}$` : "—"}
                </span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
