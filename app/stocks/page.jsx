import NewStockLink from "@/components/stocks/AddStock";
import DisplayStocks from "@/components/stocks/DisplayStocks";

// export const dynamic = "force-dynamic";

export default function StocksPage() {
  return (
    <>
      <main>
        <p>Version 7/12/2025 22:32</p>
        <h1>My Stocks</h1>
        <NewStockLink />
        <DisplayStocks />
      </main>
    </>
  );
}
