import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const data = await request.json();

    return NextResponse.json(
        {
            message: "Email sent",
            status: "ok",
            data,
        },
        {
            status: 200,
        },
    );
}
