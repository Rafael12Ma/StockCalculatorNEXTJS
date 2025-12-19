"use client";

import { absolute } from "@/components/api-stream/calculations";
import { percent } from "../../../components/api-stream/calculations";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";

export default function DetailsStockPage() {
  const params = useParams();
  const symbol = params.stock;
  //
  const [prices, setPrices] = useState({});

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
  const progress = absolute(stock.open, stock.current);
  const profit = progress > 0 ? true : false;
  //
  return (
    <>
      <div className="w-95 mt-20  border h-120 flex flex-col justify-center  text-center gap-4 p-3 m-auto rounded-xl bg-white text-black dark:bg-white">
        <Link
          href="./"
          className="w-35 rounded-2xl  bg-blue-400 mt-6  hover:bg-blue-600 hover:animate-pulse active:animate-bounce"
        >
          <h2 className="font-medium text-white  justify-center items-center  gap-3 flex w-full text-left  cursor-pointer ">
            <IoArrowBackSharp />
            Back to home
          </h2>
        </Link>
        <div className="flex flex-col justify-center items-center  m-2 p-10">
          <hr className="w-85 opacity-20" />
          <div className="items-center flex flex-col">
            <div className="text-left my-2">
              <p className="text-center text-2xl font-semibold text-black mb-2">
                {params.stock}
              </p>
              <hr className="w-85 opacity-20" />
              <div className="flex flex-col gap-4 my-4">
                <div className="flex justify-between">
                  <p className="">Current Value</p>
                  <p>{stock.current?.toFixed(2)} $</p>
                </div>
                <div className="flex justify-between">
                  <p>Hightest Price today</p>
                  <p>{stock.hightPrice?.toFixed(2)} $</p>
                </div>
                <div className="flex justify-between">
                  <p>Lowest Price today</p>
                  <p>{stock.lowPrice?.toFixed(2)} $</p>
                </div>
                <div className="flex justify-between">
                  <p>Open Price</p>
                  <p>{stock.open?.toFixed(2)} $</p>
                </div>
                <hr className="w-85 opacity-20" />
                <div className="flex justify-between">
                  <p>Difference %</p>
                  <p
                    className={`text-right ${
                      profit ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {percent(stock.open, stock.current)}%
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>Difference</p>
                  <p
                    className={`text-right ${
                      profit ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {progress} $
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
