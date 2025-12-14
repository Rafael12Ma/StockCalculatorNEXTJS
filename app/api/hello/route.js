import { NextResponse } from "next/server";
import { use } from "react";


export const users = [{
    id: 1,
    name: "rafael",
    email: "rafael@e.com",
    age: 23
},
{
    id: 2,
    name: 'aspa',
    email: "aspa@e.com",
    age: 19
},
{
    id: 3,
    name: 'john',
    email: "john@e.com",
    age: 15
}]


export async function GET(request) {
    try {

        const searchParams = request.nextUrl.searchParams
        const name = searchParams.get("name")
        const age = searchParams.get("age")

        let filteredUsers = users

        if (age) {
            filteredUsers = filteredUsers.filter((user) => user.age === Number(age))
        }

        if (name) {
            filteredUsers = filteredUsers.filter((user) => user.name.toLowerCase() === name.toLowerCase())

        }

        return NextResponse.json({
            success: true,
            data: filteredUsers,
            total: filteredUsers.length
        })
    } catch (error) {
        return NextResponse.json({
            success: false, error: "Falied to get users"
        }), { status: 500 }
    }
}