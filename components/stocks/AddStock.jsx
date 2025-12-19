import Link from "next/link";
import classes from "./AddStock.module.css";

export default function NewStockLink() {
  return (
    <main className={classes.main}>
      <Link className={classes.link} href="/stocks/new">
        <button className="bg-black w-20 rounded-2xl h-10 text-4xl cursor-pointer flex justify-center items-center text-center hover:bg-gray-500 hover:text-5xl ">
          +
        </button>
      </Link>
    </main>
  );
}
