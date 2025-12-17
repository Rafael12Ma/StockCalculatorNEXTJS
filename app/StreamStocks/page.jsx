import StockTicker from "@/components/api-stream/StockTicker";

export default function Streaming() {
  return (
    <>
      <h2 className="text-center font-mono font-extrabold m-10 ">
        Live Stock Prices
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
    </>
  );
}
