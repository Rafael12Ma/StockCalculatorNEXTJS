import { verifyAuth } from "@/lib/auth";
import HeaderHelper from "@/components/home/second/headerHelper";
import { redirect } from "next/navigation";

export default async function Header() {
  const result = await verifyAuth();
  if (!result.user) {
    return redirect("/");
  }
  return <HeaderHelper />;
}
