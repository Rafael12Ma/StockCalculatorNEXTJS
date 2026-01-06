import StockTicker from "@/components/api-stream/StockTicker";
import SearchStock from "@/components/api-stream/searchStock/SearchStock";

export default async function Header() {
  // const result = await verifyAuth();
  // if (!result.user) {
  //   return redirect("/");
  // }

  return (
    <>
      <h2 className="text-center font-mono font-extrabold m-10 text-xl">
        Most favourite stocks
      </h2>{" "}
      <StockTicker
        symbols={[
          "AAPL",
          "MSFT",
          "GOOGL",
          "NVDA",
          "AMZN",
          "INOD",
          "TSLA",
          "CLS",
        ]}
      />
      <SearchStock />
    </>
  );
}
