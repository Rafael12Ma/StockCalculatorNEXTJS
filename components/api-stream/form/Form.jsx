"use client";

import { createUser } from "@/actions/formsubmit";
import { useActionState } from "react";

export default function FormPage() {
  const [state, formAction] = useActionState(createUser, {});

  return (
    <>
      <h1>Form</h1>
      <form
        className="h-30 flex flex-col items-center border-2 w-sm justify-center mx-auto gap-1"
        action={formAction}
      >
        <div className="">
          <label className="flex" htmlFor="">
            Username
          </label>
          <input name="userName" type="text" placeholder="Set your username" />
        </div>
        <button
          className="bg-amber-500 hover:bg-amber-400 cursor-pointer  flex rounded-md p-2"
          type="submit"
        >
          Create user
        </button>
      </form>
    </>
  );
}
