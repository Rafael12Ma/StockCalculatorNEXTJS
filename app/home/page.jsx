"use client";

import { useRef, useState } from "react";
import imagelogo from "./image.png";
import Stocks from "../../components/home/Stocks";
import NewTask from "../../components/home/NewTask";
import classes from "./page.module.css";
import Image from "next/image";

export default function Header() {
  const refStock = useRef();
  const refPrice = useRef();

  const [vals, setVals] = useState({
    stocks: [],
  });

  function handleAdd(stockName, stockPrice) {
    if (!stockName.trim() || !stockPrice.trim()) return;

    const newStock = {
      name: stockName,
      price: parseFloat(stockPrice),
      id: Math.random(),
    };

    setVals((prev) => ({
      ...prev,
      stocks: [...prev.stocks, newStock],
    }));

    // clear inputs
    refStock.current.value = "";
    refPrice.current.value = "";
  }
  function handleDeleteStock(id) {
    setVals((prev) => ({
      ...prev,
      stocks: prev.stocks.filter((stock) => stock.id !== id),
    }));
  }

  return (
    <header className={classes.header}>
      <h1 className={classes.h1}>Stock Analyticsss</h1>
      <Image
        width="60"
        height="60"
        className={classes.image1}
        src={imagelogo}
        alt="Stock market"
      />
      <NewTask
        refStock={refStock}
        refPrice={refPrice}
        handleAdd={handleAdd}
        label="Stock's Name"
      />
      <hr />
      <Stocks onDelete={handleDeleteStock} stocks={vals.stocks} />
    </header>
  );
}
