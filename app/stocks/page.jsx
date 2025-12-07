import NewStockLink from "@/components/stocks/AddStock";
import DisplayStocks from "@/components/stocks/DisplayStocks";

export default function StocksPage() {
  return (
    <>
      <main>
        <h1>My Stocks</h1>
        <NewStockLink />
        <DisplayStocks />
      </main>
    </>
  );
}
