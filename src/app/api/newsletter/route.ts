import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const data = await request.json();

    // const resp = await sendInquiryEmail(property.recipient, template_data);

    // if (resp.status !== 202) {
    //     return NextResponse.json(
    //         { message: "Failed to send email", status: "error" },
    //         { status: 500 },
    //     );
    // } else {
    //     return NextResponse.json(
    //         { message: "Email sent", status: "ok", data: template_data },
    //         { status: 200 },
    //     );
    // }

    return NextResponse.json(
        {
            message: "Email sent",
            status: "ok",
        },
        {
            status: 200,
        },
    );
}
