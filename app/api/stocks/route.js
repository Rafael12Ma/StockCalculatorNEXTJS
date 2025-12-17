import dbConnect from "@/lib/mongodb";
import Stock from "@/models/StockSchema";


import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect()
        const stocks = await Stock.find({})

        return NextResponse.json({ success: true, data: stocks })
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }
}



export async function POST(request) {
    try {
        await dbConnect()
        const body = await request.json()
        const stock = await Stock.create(body)

        return NextResponse.json({ success: true, data: stock }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }
}



