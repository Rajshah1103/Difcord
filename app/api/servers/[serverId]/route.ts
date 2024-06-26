import { NextResponse } from "next/server"

import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";

export async function PATCH(req: Request, {params}: {params: {serverId: string}}) {
    try {
        
        const profile = await currentProfile();
        const { name, imageUrl } = await req.json();

        if(!profile) {
            return new NextResponse('Unauthorized', {status: 401});
        }

        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: profile.id
            },
            data: {
                name,
                imageUrl,
            }
        })

        return NextResponse.json(server);

    } catch (error) {
        console.error('Server Id Patch', error)
        return new NextResponse('Internal server error', {status: 500});
    }
}