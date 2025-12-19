"use client";

import { useFormStatus } from "react-dom";

export default function Status() {
  const { pending } = useFormStatus();
  return (
    <>
      <button
        disabled={pending}
        className="cursor-pointer bg-blue-600 hover:bg-blue-400 active:animate-bounce p-2 rounded-2xl"
      >
        {pending ? "Searching" : "Search"}
      </button>
    </>
  );
}
