import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const data = await request.json();

    if (!process.env.COUNTER_SMS_API_KEY || !process.env.COUNTER_SMS_URL)
        return NextResponse.json(
            {
                status: "error",
            },
            {
                status: 500,
            },
        );

    const resp = await fetch(process.env.COUNTER_SMS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.COUNTER_SMS_API_KEY}`,
        },
        body: JSON.stringify({
            phone: data.phone,
        }),
    });

    const respData = await resp.json();

    if (respData.status == "ok") {
        return NextResponse.json(
            {
                status: "ok",
            },
            {
                status: 200,
            },
        );
    } else {
        return NextResponse.json(
            {
                status: "error",
                message: respData.message,
            },
            {
                status: 400,
            },
        );
    }
}
