"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LogOut() {
  const { data: session } = authClient.useSession();

  const router = useRouter();
  return (
    <>
      <div className="font-mono flex flex-col justify-center items-center">
        <h1>
          You are already logged in as{" "}
          <span className="text-red-500">{session?.user?.email}</span>
        </h1>
        <div
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
          className="bg-green-500 text-xl justify-center font-sans p-1 rounded-md text-black font-semibold hover:opacity-40 cursor-pointer active:scale-120 transition duration-100"
        >
          Log out
        </div>
      </div>
    </>
  );
}
