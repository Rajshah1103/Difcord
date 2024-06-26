"use client";

import React, { FC } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";


interface NavigationItemProps {
    id: string;
    imageUrl: string;
    name: string;
}

export const NavigationItem : FC<NavigationItemProps> = ({
    id,imageUrl,name

}) => {

    const params = useParams();
    const router = useRouter();

    const onClick = () => {
        router.push(`/servers/${id}`);

    }


    return (
        <ActionTooltip 
            side="right"
            align="center"
            label={name}
        >
            <button
                onClick={onClick}
                className="group relative flex items-center"
            >
                <div className={cn("absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
                    params?.server !== id && "group-hover:h-[20px]",
                    params?.server === id ? "h-[36px]" : "h-[8px]"
                )}/>
                    <div className={cn(
                        "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
                        params?.server === id && "bg-primary/10 text-primary rounded-[16px]"
                    )}> 
                        <Image
                            fill 
                            src={imageUrl}
                            alt="channel"
                        />
                    </div>
            </button>
        </ActionTooltip>

    )
}