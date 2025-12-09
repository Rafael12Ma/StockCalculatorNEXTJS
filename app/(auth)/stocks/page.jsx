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
    <>
      <StocksClient />
    </>
  );
}
