import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const data = await request.json();

    if (!process.env.RETOOL_WEBHOOK || !process.env.RETOOL_WEBHOOK_SECRET)
        return NextResponse.json(
            {
                status: "error",
            },
            {
                status: 500,
            },
        );

    const resp = await fetch(process.env.RETOOL_WEBHOOK, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Workflow-Api-Key": process.env.RETOOL_WEBHOOK_SECRET,
        },
        body: JSON.stringify({
            phone: data.phone,
            timestamp: new Date().toISOString(),
            source: "madebycounter.com",
        }),
    });

    console.log(await resp.json());

    return NextResponse.json(
        {
            status: "ok",
        },
        {
            status: 200,
        },
    );
}
