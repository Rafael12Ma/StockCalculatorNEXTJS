import Link from "next/link";
import classes from "./AddStock.module.css";
import { IoMdAdd } from "react-icons/io";

export default function NewStockLink() {
  return (
    <h1>
      <Link className={classes.link} href="/new">
        <button className={classes.add}>
          <IoMdAdd />
        </button>
      </Link>
    </h1>
  );
}
