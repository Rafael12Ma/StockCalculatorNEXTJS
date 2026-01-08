import logo from "@/public/images/stockDown.jpg";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col mx-10 gap-5 justify-center my-20 items-center">
        <h1 className="text-red-700 font-mono text-2xl ">Page not found</h1>
        <img
          className="w-100 rounded-3xl"
          src={logo.src}
          alt="Stock going down bad."
        />
        <Link
          className="hover:scale-125 transition duration-200 active:animate-bounce"
          href="/home"
        >
          <span className="text-red-600 ">Go home</span>
        </Link>
      </div>
    </>
  );
}
