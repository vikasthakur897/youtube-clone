import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { VideoAssetCreatedWebhookEvent,
    VideoAssetErroredWebhookEvent,
    VideoAssetReadyWebhookEvent,
    VideoAssetTrackReadyWebhookEvent
} from "@mux/mux-node/resources/webhooks";
import { mux } from "@/lib/mux";
import { videos } from "@/db/schema";
import { db } from "@/db";

const SIGNING_SECRET = process.env.MUX_WEBHOOK_SECRET! || '';

type WebhookEvent = 
     | VideoAssetCreatedWebhookEvent
     | VideoAssetReadyWebhookEvent
     | VideoAssetTrackReadyWebhookEvent
     | VideoAssetErroredWebhookEvent;

export const POST = async(request : Request) => {
    if(!SIGNING_SECRET) {
        throw new Error('Mux webhook signing secret is not configured');
    }
 
    const headersPayload = await headers();
    const muxSignature = headersPayload.get('mux-signature') || '';

    if(!muxSignature) {
        return new Response('Missing Mux signature', { status: 400 });
    }

    const payload = await request.json();

    const body = JSON.stringify(payload);

    mux.webhooks.verifySignature(
        body,{
            "mux-signature": muxSignature
        },
        SIGNING_SECRET
    );

    switch(payload.type as WebhookEvent['type']) {
        case 'video.asset.created':{
            const data = payload.data as VideoAssetCreatedWebhookEvent['data'];

            if(!data.upload_id){
                return new Response('No upload ID found', { status: 400 });
            }

            await db.update(videos)
            .set({
                maxAssetId: data.id,
                muxStatus: data.status,
            })
            .where(eq(videos.maxUploadId, data.upload_id));
            break;
        }
    }

    return new Response('Webhook received', { status: 200 });
};