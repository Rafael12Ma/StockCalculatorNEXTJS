import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const headerList = await headers();
  const authheader = headerList.get("Authorization");
  console.log("Auth header", authheader);

  //   return NextResponse.json({ success: true, data: "Hello world from profile" });
  const response = NextResponse.json({ message: "Hello with headers" });
  response.headers.set("X-Powered-By", "NExt.js 15");
  response.headers.set("Cache-Control", "no-store");
  return response;
}

// access request headers
//   const requestHeaders = new Headers(request.headers);

//   const authheader = requestHeaders.get("Authorization");
// console.log("Auth header", authheader);
