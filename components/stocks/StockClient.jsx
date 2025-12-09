import NewStockLink from "@/components/stocks/AddStock";
import DisplayStocks from "@/components/stocks/DisplayStocks";
import { updateTime } from "../time/UpdateTime";

export default function StocksClient() {
  const date = updateTime();

  return (
    <main>
      <p>
        Version : {date.localTime}___{date.hours}:{date.minutes}'':
        {date.seconds}''{" "}
      </p>
      <h1>My Stocks</h1>
      <NewStockLink />
      <DisplayStocks />
    </main>
  );
}
