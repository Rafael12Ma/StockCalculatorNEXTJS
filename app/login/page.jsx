import Login from "@/components/login/LoginPage";
import LogOut from "@/components/login/Logout";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return <>{session ? <LogOut /> : <Login />}</>;
}
