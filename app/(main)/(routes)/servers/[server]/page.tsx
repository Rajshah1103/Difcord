import { FC } from "react";
import { redirectToSignIn } from "@clerk/nextjs";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface ServerIdPageProps {
    params: {
        server: string;
    }
};

const ServerIdPage : FC<ServerIdPageProps> = async({
    params
}) => {

    const profile = await currentProfile();

    if(!profile) { 
        return redirectToSignIn();
    }

    const server = await db.server.findUnique({
        where: {
            id: params.server,
            members: {
                some: {
                    profileId: profile.id,
                }
            }
        },
        include: {
            channels: {
                where: {
                    name: "general"
                },
                orderBy: {
                    createdAt: "asc"
                }
            }
        }
    });

    const initialChannel = server?.channels[0];

    if(initialChannel?.name !== "general") {
        return null;
    }

    return redirect(`/servers/${params.server}/channels/${initialChannel?.id}`);
};

export default ServerIdPage;
