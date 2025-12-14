import Link from "next/link";
import classes from "./AddStock.module.css";
import { IoMdAdd } from "react-icons/io";

export default function NewStockLink() {
  return (
    <main className={classes.main}>
      <Link className={classes.link} href="/stocks/new">
        <button className={classes.add}>
          <IoMdAdd />
        </button>
      </Link>
    </main>
  );
}
