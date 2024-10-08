
import { FC } from 'react'
import { redirect } from 'next/navigation';
import { redirectToSignIn } from '@clerk/nextjs';

import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';

import { ChatHeader } from '@/components/chat/chat-header';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessages } from '@/components/chat/chat-messages';
import { ChannelType } from '@prisma/client';
import { MediaRoom } from '@/components/media-room';

interface ChannelIdPageProps {
    params: {
        server: string;
        channelId: string;
    }
}

const ChannelIdPage:FC<ChannelIdPageProps> = async({
   params
})=> {
    const profile = await currentProfile();

    if(!profile) {
        return redirectToSignIn();
    }

    const channel = await db.channel.findUnique({
        where: {
            id:params.channelId
        }
    });

    const member = await db.member.findFirst({
        where: {
            serverId: params.server,
            profileId:  profile?.id,
        }
    });

    if (!member || !channel) {
        return redirect("/");
    }
    return (
        <div
            className='bg-white dark:bg-[#313338] flex flex-col h-full'
        >
            <ChatHeader
                name={channel.name}
                serverId={channel.serverId}
                type='channel'
             />
             {channel.type === ChannelType.TEXT && (
                <>
                    <ChatMessages
                        name={channel.name}
                        member={member}
                        chatId={channel.id}
                        type="channel"
                        apiUrl="/api/messages"
                        socketUrl="/api/socket/messages"
                        socketQuery={{ channelId: channel.id, serverId: channel.serverId }}
                        paramKey="channelId"
                        paramValue={channel.id}
                    />
                    <ChatInput
                        name={channel.name}
                        type='channel'
                        apiUrl='/api/socket/messages'
                        query={{
                            channelId: channel.id,
                            serverId: channel.serverId
                        }}
                    />
                </>
             )}
             {channel.type === ChannelType.AUDIO && (
                <MediaRoom chatId={channel.id} video={false} audio={true} />
             )}

            {channel.type === ChannelType.VIDEO && (
                <MediaRoom chatId={channel.id} video={true} audio={true} />
            )}
            
        </div>
    )
}

export default ChannelIdPage;