import { verifyAuth } from "@/lib/auth";
import HeaderHelper from "@/components/home/second/headerHelper";
import { redirect } from "next/navigation";
import StockTicker from "@/components/api-stream/StockTicker";
import FormPage from "@/components/api-stream/form/Form";
import SearchStock from "@/components/api-stream/searchStock/SearchStock";

export default async function Header() {
  const result = await verifyAuth();
  if (!result.user) {
    return redirect("/");
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
      {/* <HeaderHelper /> */}
      {/* <FormPage /> */}
    </>
  );
}
