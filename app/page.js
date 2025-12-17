import Login from "@/components/login/Login";



export default async function HomePage({ searchParams }) {
  const params = await searchParams
  const formMode = params?.mode || "login"
  const res = await fetch("http://localhost:3000/api/hello")

  const data = await res.json()
  const d = JSON.stringify(data)
  return (
    <div>
      {/* <Suspense fallback={<loading />}> */}
      <Login mode={formMode} />
      {/* </Suspense> */}
      <p>{d}</p>
    </div>
  );
}
