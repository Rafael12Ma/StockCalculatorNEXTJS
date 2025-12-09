import NewStockLink from "@/components/stocks/AddStock";
import DisplayStocks from "@/components/stocks/DisplayStocks";
import { updateTime } from "@/components/time/UpdateTime";
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

  const date = updateTime();

  return (
    <>
      <main>
        <p>
          Version : {date.localTime}___{date.hours}:{date.minutes}'':
          {date.seconds}''{" "}
        </p>
        <h1>My Stocks</h1>
        <NewStockLink />
        <DisplayStocks />
      </main>
    </>
  );
}
