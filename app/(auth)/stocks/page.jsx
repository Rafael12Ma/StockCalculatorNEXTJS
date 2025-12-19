import StockTicker from "@/components/api-stream/StockTicker";
import StocksClient from "@/components/stocks/StockClient";
import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "My stocks",
  description: "View my personall stocks",
};

export default async function StocksPage() {
  const result = await verifyAuth();
  if (!result.user) {
    return redirect("/");
  }

  return (
    <main className="m-40 p-5 flex flex-col gap-20">
      <StocksClient />
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
    </main>
  );
}
