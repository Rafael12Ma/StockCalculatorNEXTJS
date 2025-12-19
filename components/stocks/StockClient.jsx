import NewStockLink from "@/components/stocks/AddStock";
import DisplayStocks from "@/components/stocks/DisplayStocks";
import { updateTime } from "../time/UpdateTime";
import classes from "./StockClient.module.css";
import Loading from "../loadingIndicator/Loading";
import { Suspense } from "react";

export default function StocksClient() {
  const date = updateTime();

  return (
    <main className="flex flex-col">
      <p style={{ textAlign: "right" }}>
        Version : {date.localTime}___{date.hours}:{date.minutes}'':
        {date.seconds}''{" "}
      </p>
      <h1>My Stocks!</h1>
      <NewStockLink />
      <Suspense fallback={<Loading />}>
        <DisplayStocks />
      </Suspense>
    </main>
  );
}
