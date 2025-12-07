import Image from "next/image";
import classes from "./DisplayStocks.module.css";
// import { getStocks } from "@/lib/stocks";
import { notFound } from "next/navigation";
import Link from "next/link";
import dummyStocks from "@/dummyStocks";

export default async function DisplayStocks() {
  // const stocks = await getStocks();
  const stocks = dummyStocks;
  if (!stocks) {
    notFound();
  }
  return (
    <>
      <ul className={classes.stocksGrid}>
        {stocks.map((stock) => (
          <li key={stock.stockName} className={classes.stockCard}>
            <Link href={`/stocks/${stock.slug}`}>
              <Image
                className={classes.stockImage}
                width={100}
                height={100}
                src={stock.image}
                alt={stock.stockName}
              />
              <div className={classes.stockInfo}>
                <h3 className={classes.name}>{stock.stockName}</h3>
                <p
                  className={`stockPrice ${
                    stock.currValue >= stock.boughtValue
                      ? "positive"
                      : "negative"
                  }`}
                >
                  {Number(stock.currValue).toFixed(2)} $
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
