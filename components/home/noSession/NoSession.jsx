import Link from "next/link";

export default function NoSession() {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-center animate-pulse  my-20 font-mono">
        You must log in to access this page.
      </p>
      <Link href="/login">
        <p className="text-blue-500 font-semibold hover:scale-125 transition duration-200">
          Log in
        </p>
      </Link>
    </div>
  );
}
