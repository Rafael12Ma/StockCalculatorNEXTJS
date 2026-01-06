import Login from "@/components/login/Login";
import Header from "./home/page";



export default async function HomePage({ searchParams }) {
  // const params = await searchParams
  // const formMode = params?.mode || "login"

  return (
    <div>
      {/* <Login mode={formMode} /> */}
      <Header />
    </div>
  );
}
