"use client";

import { authClient } from "@/lib/auth-client";
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

export default function Login() {
  async function handleGithublogin() {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  }
  async function handleGooglelogin() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  }
  return (
    <>
      <div className="flex drop-shadow-black flex-col bg-black p-2 border-2 rounded-t-2xl sm:mx-20 md:mx-45 lg:mx-80 xl:mx-120 2xl:mx-145 3xl:mx-140 my-20 mx-15 justify-center items-center">
        <h1 className="font-bold text-xl">Log in</h1>
        <hr className="bg-amber-500 w-full m-1 opacity-20" />
        <div className="flex gap-10">
          <div className="flex flex-col justify-center items-center">
            <button
              className="bg-black flex flex-col justify-center items-center gap-3 opacity-50 hover:scale-105 transition duration200 hover:text-red-500 cursor-pointer rounded-2xl p-2"
              onClick={handleGooglelogin}
            >
              <p>
                <FaGoogle size={30} />
              </p>
              Login with google
            </button>
          </div>

          <div className="flex flex-col justify-center items-center gap-5">
            <button
              className="bg-black flex flex-col justify-center items-center gap-3 opacity-50 hover:scale-105 transition duration200 hover:text-red-500 cursor-pointer rounded-2xl p-2"
              onClick={handleGithublogin}
            >
              <p>
                <FaGithub size={30} />
              </p>
              Login with github
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
