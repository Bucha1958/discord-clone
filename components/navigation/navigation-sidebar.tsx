import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import NavigationAction from "./navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "./navigation-item";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";


const NavigationSideBar = async () => {
    const profile = await currentProfile();

    if (!profile) return redirect("/");

    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });
    
    return ( 
        <div className="space-y-4 flex flex-col h-full w-full items-center
            text-primary py-3 dark:bg-[#1E1F22]">
            <NavigationAction />
            <Separator className="h-[3px] bg-zinc-300 dark:bg-zinc-700 
                rounded-md w-14 mx-auto"
            />
            <ScrollArea className="flex-1 w-full">
                {servers.map((server) => (
                    <div key={server.id} className="mb-4">
                        <NavigationItem
                            id={server.id}
                            imageUrl={server.imageUrl}
                            name={server.name}
                        />
                    </div>
                ))}
            </ScrollArea>
            <ModeToggle />
            <UserButton 
                afterSignOutUrl="/"
                appearance={{
                    elements: {
                        avatarBox: "h-[48px] w-[48px]"
                    }
                }}
            />
        </div>
     );
}
 
export default NavigationSideBar;