import { Menu } from "lucide-react"

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { NavigationSideBar } from "./navigation/navigation-sidebar";
import { ServerSidebar } from "./server/server-sidebar";
import { FC } from "react";

interface MobileToggleProps { 
    serverId: string;
}


export const MobileToggle : FC<MobileToggleProps> = ({
    serverId
}) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                >
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent
                side="left"
                className="p-0 flex gap-0"
            >
                <div className="w-[72px]">
                    <NavigationSideBar />
                </div>
                <ServerSidebar serverId={serverId} />
            </SheetContent>
        </Sheet>
    )
}