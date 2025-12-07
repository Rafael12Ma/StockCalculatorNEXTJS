import { getStock, getStocks } from "@/lib/stocks";
import classes from "./page.module.css";
import { FaEuroSign, FaArrowDown, FaArrowUp } from "react-icons/fa";
import Link from "next/link";
import { RiDeleteBinFill } from "react-icons/ri";

export default async function StockDetails({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.stockslug;

  // const stock = await getStock(slug);
  const stocks = await getStocks();
  const stock = stocks.find((stock) => stock.slug === slug);

  let a;
  let precent;

  a = Math.abs(stock.boughtValue - stock.currValue);
  precent = (a / stock.boughtValue) * 100;
  precent = precent.toFixed(2);

  let profit;
  let curVal = parseFloat(stock.currValue);
  curVal = curVal.toFixed(2);
  const boughtVal = parseFloat(stock.boughtValue);
  const quant = parseFloat(stock.quantity);

  let bool = curVal > boughtVal;
  let worth = curVal * quant;
  worth = worth.toFixed(2);
  profit = curVal * quant - boughtVal * quant;
  profit = profit.toFixed(2);
  let toEuro = profit * 0.86;
  toEuro = toEuro.toFixed(2);
  let content;

  if (stock) {
    content = (
      <div className={classes.container}>
        <div className={classes.card}>
          <Link href="/stocks">
            <button className={classes.back}>← Back to Stocks</button>
          </Link>{" "}
          <hr className={classes.hr} />
          <div className={classes.header}>
            //{" "}
            <img
              src={stock.image}
              alt={stock.stockName}
              className={classes.image}
            />
            <h1 className={classes.title}>{stock.stockName}</h1>
          </div>
          <div className={classes.details}>
            <div className={classes.row}>
              <span>Value</span>
              <span>{stock.currValue} $</span>
            </div>

            <div className={classes.row}>
              <span>Quantity</span>
              <span>{stock.quantity}</span>
            </div>

            <div className={classes.row}>
              <span>Worth</span>
              <span>{worth} $</span>
            </div>
          </div>
          <div className={classes.details}>
            <div className={classes.row}>
              <span>Bought avg. Value</span>
              <span>{stock.boughtValue} $</span>
            </div>

            <div className={classes.row}>
              <span>Profit</span>
              <span className={bool ? classes.positive : classes.negative}>
                {profit}$ {bool ? <FaArrowUp /> : <FaArrowDown />} {precent} %
              </span>
            </div>

            <div className={classes.row}>
              <span>
                <FaEuroSign />
              </span>
              <span className={bool ? classes.positive : classes.negative}>
                {toEuro}
                <FaEuroSign /> {bool ? <FaArrowUp /> : <FaArrowDown />}{" "}
                {precent} %
              </span>
            </div>
          </div>
          <div className={classes.footer}>
            <Link href="/stocks">
              <button className={classes.button}>✏️ Edit</button>
            </Link>
            <Link href="/stocks">
              <button className={classes.button}>
                <RiDeleteBinFill />
              </button>{" "}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{content}</>;
}
