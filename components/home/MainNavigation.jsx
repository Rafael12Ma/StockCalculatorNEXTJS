"use client";

import Link from "next/link";
import classes from "./MainNavigation.module.css";
import { usePathname } from "next/navigation";
import { useTheme } from "@/zustand/theme";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import toast from "react-hot-toast";
import { MdAccountBox } from "react-icons/md";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function MainNavigationBar() {
  const { theme, toggleThemes } = useTheme();
  const path = usePathname();

  const { data: session } = authClient.useSession({
    refetchInterval: 10 * 1000, // every 1 minute
  });
  const router = useRouter();

  function handleStatus() {
    toast.success("Log out successfullyy!");
  }

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
        {!session ? (
          <Link
            className={path === "/login" ? "text-[#EEEEEE]" : undefined}
            href="/login"
          >
            Login
          </Link>
        ) : (
          <div className="flex gap-5">
            <button
              className="cursor-pointer hover:scale-110 transition duration-700 hover:text-red-500"
              onClick={() =>
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      toast.success("Logged out successfully");
                      router.push("/login");
                    },
                    onError: () => {
                      toast.error("Logout failed!");
                    },
                  },
                })
              }
            >
              Logout
            </button>
            <div className="flex flexcol justify-center  max-[596]:text-[0.6rem] items-center gap-1 text-white ">
              <MdAccountBox />
              <p className="text-green-500">{session?.user?.email}</p>
            </div>
          </div>
        )}
        <div className={classes.theme} onClick={toggleThemes}>
          {theme === "light" ? <CiLight /> : <MdDarkMode />}
        </div>{" "}
      </nav>
    </>
  );
}
