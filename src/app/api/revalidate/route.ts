import { parseBody } from "next-sanity/webhook";
import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
    try {
        const { isValidSignature, body } = await parseBody<
            BodyInit & { _type: string }
        >(req, process.env.SANITY_WEBHOOK_SECRET);

        if (!isValidSignature) {
            const message = "Invalid signature";
            return new Response(
                JSON.stringify({ message, isValidSignature, body }),
                { status: 401 },
            );
        }

        if (!body?._type) {
            return new Response(body, { status: 400 });
        }

        revalidateTag(body._type);
        console.log(`Revalidated ${body._type}`);

        return NextResponse.json({
            status: 200,
            revalidated: true,
            now: Date.now(),
            body,
        });
    } catch (err: unknown) {
        console.error(err);
        if (err instanceof Error) {
            return new Response(err.message, { status: 500 });
        }
        return new Response("Error", { status: 500 });
    }
}
