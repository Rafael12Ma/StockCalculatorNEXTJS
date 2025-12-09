"use client";

import Link from "next/link";
import classes from "./MainNavigation.module.css";
import { usePathname } from "next/navigation";
import { logout } from "@/actions/auth-actions";

export default function MainNavigationBar() {
  const path = usePathname();
  return (
    <>
      <nav className={classes.navbar}>
        <Link
          href="/home"
          className={path === "/home" ? classes.active : undefined}
        >
          Home
        </Link>

        <Link
          href="/stocks"
          className={path === "/stocks" ? classes.active : undefined}
        >
          Portfolio
        </Link>
        <Link href="/">
          <div id="auth-header">
            <form action={logout}>
              <button>Logout</button>
            </form>
          </div>
        </Link>
      </nav>
    </>
  );
}
