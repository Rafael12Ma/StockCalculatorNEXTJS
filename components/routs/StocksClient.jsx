"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function StocksClient({ initialStocks }) {
  const [stocks, setStocks] = useState(initialStocks);

  const [stockName, setStockName] = useState("");
  const [currValue, setCurrValue] = useState(0);
  const [boughtValue, setBoughtValue] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);

  const createStock = async (e) => {
    e.preventDefault();
    if (currValue < 0 || !stockName.trim() || boughtValue < 0 || quantity < 0) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/stocks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stockName,
          currValue,
          boughtValue,
          quantity,
        }),
      });
      const result = await response.json();
      // console.log("result :", result);
      if (!response.ok) {
        console.error("API Error:", result);
        toast.error(result.error || "Failed to create stock");
        setLoading(false);
        return;
      }
      if (result.success) {
        setStocks([result.data, ...stocks]);
        toast.success("Stocks created successfully!");
        setStockName("");
        setBoughtValue(0);
        setCurrValue(0);
        setQuantity(0);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error creating stock:", error);
      toast.error("Something went wrong.");
    }
  };
  // console.log("notes: ", notes);
  return (
    <>
      <h1>NotesClient</h1>
      <div className="space-y-6">
        <form
          onSubmit={createStock}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl text-gray-800 font-semibold mb-4">
            Create new Stock
          </h2>
          <div className="space-y-4">
            <label className="bg-red-500 ">Stock's Name</label>
            <input
              type="text"
              placeholder="Stock Name"
              value={stockName}
              required
              onChange={(e) => setStockName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
            <label className="bg-red-500 ">Stock's Currvalue</label>

            <input
              type="number"
              placeholder="Stock Name"
              value={currValue}
              required
              onChange={(e) => setCurrValue(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
            <label className="bg-red-500 ">Stock's BoughtValue</label>

            <input
              type="number"
              placeholder="Stock boughtvalue"
              value={boughtValue}
              required
              onChange={(e) => setBoughtValue(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
            <label className="bg-red-500 ">Stock's Quanity</label>

            <input
              type="number"
              placeholder="Stock quantity"
              value={quantity}
              required
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />

            <button
              type="Submit"
              disabled={loading}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create stock"}
            </button>
          </div>
        </form>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            Your Stocks ({stocks.length})
          </h3>
          {stocks.length === 0 && (
            <p className="text-gray-500">
              No Stocks yet. Create your first stock above
            </p>
          )}
          {stocks.length > 0 &&
            stocks.map((stock) => (
              <div
                key={stock._id}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex justify-between items-start mb-2">
                  <h1 className="text-lg font-semibold">{stock.stockName}</h1>
                  <h2 className="text-lg bg-red-500 font-semibold">
                    {stock.currValue}
                  </h2>
                  <h3 className="text-lg font-semibold">{stock.boughtValue}</h3>
                  <h4 className="text-lg font-semibold">{stock.quantity}</h4>
                  <div className="flex gap-2">
                    <button className="text-blue-500 hover:text-blue-700 text-sm">
                      Edit
                    </button>
                    <button className="text-red-500 hover:text-red-700 text-sm">
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{stock.stockName}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
