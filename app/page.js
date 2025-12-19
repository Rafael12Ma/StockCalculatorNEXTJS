import Login from "@/components/login/Login";



export default async function HomePage({ searchParams }) {
  const params = await searchParams
  const formMode = params?.mode || "login"

  return (
    <div>
      <Login mode={formMode} />
    </div>
  );
}
