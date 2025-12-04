import {Webhook} from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';


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

    let evt: WebhookEvent;

    try{
       
        evt = wh.verify(body,{'svix-id': svix_id, 'svix-timestamp': svix_timestamp, 'svix-signature': svix_signature}) as WebhookEvent;
    }catch(err){
        return NextResponse.json({ message: `Invalid signature : ${err}` }, { status: 400 });
    }


    const eventType = evt.type;
    console.log(`Received event type: ${eventType}`);

    if(eventType === 'user.created'){
         const { data } = evt;

         // Handle user deletion logic here
      await db.insert(users).values({
        clerkId: data.id,
        name: `${data.first_name} ${data.last_name}`,
        imageUrl: data.image_url,
      })
    }

    if(eventType === 'user.deleted'){
      const { data } = evt;

      if(!data.id){
        return NextResponse.json({ message: 'User ID is missing in the payload' }, { status: 400 });
      }
      // Handle user deletion logic here
      await db.delete(users).where(eq(users.clerkId, data.id));
    }

    if(eventType === 'user.updated'){
      const { data } = evt;
      if(!data.id){
        return NextResponse.json({ message: 'User ID is missing in the payload' }, { status: 400 });
      }

      await db.update(users).set({
        name: `${data.first_name} ${data.last_name}`,
        imageUrl: data.image_url,
      }).where(eq(users.clerkId, data.id));
    }
    return NextResponse.json({ message: 'Webhook received successfully' }, { status: 200 });
}