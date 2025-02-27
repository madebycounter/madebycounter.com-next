import { NextRequest, NextResponse } from "next/server";

import { submitForm } from "@/lib/contact";

export async function POST(request: NextRequest) {
    const data = await request.json();
    const resp = await submitForm(
        data.fname || "",
        data.lname || "",
        data.email || "",
        "Newsletter Sign Up",
    );

    return NextResponse.json(
        {
            status: "ok",
        },
        {
            status: 200,
        },
    );
}
