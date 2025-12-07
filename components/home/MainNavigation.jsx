"use client";

import Link from "next/link";
import classes from "./MainNavigation.module.css";
import { usePathname } from "next/navigation";

export default function MainNavigationBar() {
  const path = usePathname();
  return (
    <>
      <nav className={classes.navbar}>
        <Link href="/" className={path === "/" ? classes.active : undefined}>
          Home
        </Link>

        <Link
          href="/stocks"
          className={path === "/stocks" ? classes.active : undefined}
        >
          Portfolio
        </Link>
      </nav>
    </>
  );
}
