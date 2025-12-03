import {Webhook} from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@/db';
import { users } from '@/db/schema';


export async function POST(req: Request) {
  const signingSecret = process.env.CLERK_SIGNING_SECRET;

  if (!signingSecret) {
    throw new Error('CLERK_SIGNING_SECRET is not defined in environment variables');
  }

  const wh = new Webhook(signingSecret);

  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id') || '';
    const svix_timestamp = headerPayload.get('svix-timestamp') || '';
    const svix_signature = headerPayload.get('svix-signature') || '';

    if(!svix_id || !svix_timestamp || !svix_signature) {
      return NextResponse.json({ message: 'Missing Svix headers' }, { status: 400 });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    let event: WebhookEvent;

    try{
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        event = wh.verify(body,{'svix-id': svix_id, 'svix-timestamp': svix_timestamp, 'svix-signature': svix_signature}) as WebhookEvent;
    }catch(err){
        return NextResponse.json({ message: `Invalid signature : ${err}` }, { status: 400 });
    }


    const eventType = event.type;
    console.log(`Received event type: ${eventType}`);

    // if(eventType === 'user.deleted'){
    //      const { data } = event;
    //      const d: any = data;
    //      const name = d?.firstName ? `${d.firstName} ${d.lastName ?? ''}` : d?.emailAddresses?.[0]?.emailAddress ?? d?.email ?? 'Unknown';
    //   // Handle user deletion logic here
    //   await db.insert(users).values({
    //     clerkId: d.id,
    //     name: name,
    //     imageUrl: d.imageUrl,
    //   })
    // }
    return NextResponse.json({ message: 'Webhook received successfully' }, { status: 200 });
}