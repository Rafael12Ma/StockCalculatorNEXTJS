import StockForm from "@/components/stocks/StockForm";
import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AddStock() {
  const result = await verifyAuth();
  if (!result.user) {
    return redirect("/");
  }
  return (
    <>
      <h1>Add a new stock!</h1>
      <StockForm />
    </>
  );
}
