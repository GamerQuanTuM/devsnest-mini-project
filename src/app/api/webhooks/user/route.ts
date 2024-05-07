import prismadb from "@/lib/prismadb";
import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";

const webhookSecret = process.env.WEBHOOK_SECRET || "";


async function handler(request: Request) {
    const payload = await request.json();
    const headersList = headers();
    const heads = {
        "svix-id": headersList.get("svix-id"),
        "svix-timestamp": headersList.get("svix-timestamp"),
        "svix-signature": headersList.get("svix-signature"),
    };
    const wh = new Webhook(webhookSecret);
    let evt: Event | null = null;

    try {
        evt = wh.verify(
            JSON.stringify(payload),
            heads as IncomingHttpHeaders & WebhookRequiredHeaders
        ) as Event;


        const eventType: EventType = evt.type;
        if (eventType === "user.created" || eventType === "user.updated") {
            const { id, email_addresses, first_name, last_name } = evt.data;
            let email = email_addresses[0].email_address

            console.log(evt.data)

            await prismadb.user.upsert({
                where: { externalId: id as string },
                create: {
                    externalId: id,
                    email,
                    name: first_name + " " + last_name,
                },
                update: {
                    email,
                    name: first_name + " " + last_name,
                },
            });
        }
        return NextResponse.json({ message: "Success" }, { status: 200 })
    } catch (err) {
        console.error((err as Error).message);
        return NextResponse.json({ message: err }, { status: 400 });
    }

}

type EventType = "user.created" | "user.updated" | "*";

type Event = {
    data: any;
    object: "event";
    type: EventType;
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;