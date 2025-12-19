"use client";

import { useParams } from "next/navigation";

export default function LoadingStockDetails() {
  const params = useParams();
  const symbol = params.stock;

  return (
    <>
      <p className="text-white text-center m-10">Loading {symbol}...</p>
    </>
  );
}
