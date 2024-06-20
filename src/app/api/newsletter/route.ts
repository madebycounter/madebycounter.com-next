import { NextRequest, NextResponse } from "next/server";

import { submitForm } from "@/lib/hubspot";

export async function POST(request: NextRequest) {
    if (!process.env.HUBSPOT_NEWSLETTER_FORM) {
        return NextResponse.error();
    }

    const data = await request.json();
    const hsResp = await submitForm(
        process.env.HUBSPOT_NEWSLETTER_FORM,
        [
            {
                name: "firstname",
                value: data.fname || "",
            },
            {
                name: "lastname",
                value: data.lname || "",
            },
            {
                name: "email",
                value: data.email || "",
            },
        ],
        request.headers.get("Referer") || "",
    );

    console.log(await hsResp.json());

    return NextResponse.json(
        {
            status: "ok",
        },
        {
            status: 200,
        },
    );
}
