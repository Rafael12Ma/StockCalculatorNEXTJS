import Login from "@/components/login/Login";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";


export default async function HomePage({ searchParams }) {
  const params = await searchParams
  const formMode = params?.mode || "login"
  console.log('params: ', params)
  console.log('params.mode: ', params.mode)

  return (
    <div id="body">
      <Login mode={formMode} />
    </div>
  );
}
