import sql from "better-sqlite3";
import { revalidatePath } from "next/cache";

const db = sql("stocks.db");

export async function getStocks() {
  await new Promise((resolve) => setTimeout(resolve, 500));

  // throw new Error("Loading meals failed");
  return db.prepare("SELECT * FROM stocks").all();
}

export async function getStock(slug) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return db.prepare("SELECT * FROM stocks WHERE slug = ?").get(slug);
}

export async function storeStock(stock) {
  const stmt = db.prepare(`
    INSERT INTO stocks (stockName, currValue, boughtValue, quantity,slug,image)
    VALUES (?, ?, ?, ?,?,?)`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await stmt.run(
    stock.stockName,
    stock.currValue,
    stock.boughtValue,
    stock.quantity,
    stock.slug,
    stock.image
  );
  revalidatePath("/", "layout");
}
