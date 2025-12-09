"use server";

import { storeStock } from "@/lib/stocks";
import { redirect } from "next/navigation";

export async function createStock(prevState, formData) {
  const stockName = formData.get("stockName");
  const slug = stockName.toLowerCase();
  const currValue = formData.get("stockCurValue");
  const boughtValue = formData.get("stockBoughtValue");
  const quantity = formData.get("stockQuantity");
  const image = "/images/innodata.png";

  let errors = [];

  if (!stockName || stockName.trim().length === 0) {
    errors.push("Stock Name is required");
  }
  if (!currValue || currValue.trim().length === 0) {
    errors.push("Stock's CurrValue is required");
  }
  if (!boughtValue || boughtValue.trim().length === 0) {
    errors.push("Stock's bought value is required");
  }
  if (!quantity || quantity.trim().length === 0) {
    errors.push("Property quantity is required");
  }

  if (errors.length > 0) {
    return { errors, values: { stockName, currValue, boughtValue, quantity } };
  }

  try {
    await storeStock({
      stockName,
      currValue,
      boughtValue,
      quantity,
      image,
      slug,
    });
  } catch (err) {
    return { errors: ["Database error: " + err.message] };
  }
  redirect("/stocks");
}
