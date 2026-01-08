'use client'

import StockTicker from "@/components/api-stream/StockTicker";
import SearchStock from "@/components/api-stream/searchStock/SearchStock";
import NoSession from "@/components/home/noSession/NoSession";
import { authClient } from "@/lib/auth-client";

export default  function Header() {
  const { data: session } = authClient.useSession();
  if (!session) {
    return <NoSession />;
  }
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
