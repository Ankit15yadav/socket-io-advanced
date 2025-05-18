import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const { username, password } = await req.json()
    // console.log("Body of the data", req.body)

    console.log(username, password)

    return Response.json({
        status: 200,
    })
}