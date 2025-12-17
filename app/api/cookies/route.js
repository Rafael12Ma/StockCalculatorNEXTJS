import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request) {

    const cookieStore = await cookies()

    cookieStore.set("score", "100")

    const score = cookieStore.get("score")

    // cookieStore.delete("score")


    console.log("Cookies", score)
    return NextResponse.json({ message: "Cookie set!" })
}