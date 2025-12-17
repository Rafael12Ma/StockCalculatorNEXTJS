import StocksClient from "@/components/routs/StocksClient";
import dbConnect from "@/lib/mongodb";
import StockSchema from "@/models/StockSchema";

async function getStocks(params) {
  await dbConnect();
  const stocks = await StockSchema.find({});

  return stocks.map((stock) => ({
    ...stock,
    _id: stock._id.toString(),
  }));
}

export default async function AddStock() {
  const stocks = await getStocks();

  console.log("stocks : ", stocks);
  return (
    <>
      <h1>Add stocks</h1>
      <StocksClient initialStocks={stocks} />
    </>
  );
}
