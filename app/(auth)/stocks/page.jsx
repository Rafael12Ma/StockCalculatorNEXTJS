"use client";

import NoSession from "@/components/home/noSession/NoSession";
import { authClient } from "@/lib/auth-client";

export default function StocksPage() {
  const { data: session } = authClient.useSession();
  if (!session) {
    return <NoSession />;
  }
  return (
    <main className="m-40 p-5 flex flex-col gap-20">
      <h1>Portfolio</h1>
    </main>
  );
}
