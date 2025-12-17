import StockTicker from "@/components/api-stream/StockTicker";

export default function Streaming() {
  return (
    <>
      <h1>Streaming Stocks</h1>
      <StockTicker symbols={["AAPL", "MSFT", "GOOGL", "NVDA", "AMZN","INOD",'TSLA']} />
    </>
  );
}
