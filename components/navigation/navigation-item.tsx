"use client"

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import ActionToolTip from "@/components/ui/action-tooltip";


interface NavigationItemProps {
    id: string;
    imageUrl: string;
    name: string;
}

export const NavigationItem = ({
    id,
    imageUrl,
    name
}: NavigationItemProps) => {
    const params = useParams();
    const routes = useRouter();

    const onClick = () => {
        routes.push(`/servers/${id}`)
    }

    return ( 
        <ActionToolTip
            label={name}
            align="center"
            side="right"
        >
            <button 
                onClick={onClick} 
                className="flex items-center group relative"
            >
                <div className={cn(
                    "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
                    params?.serverId !== id && "group-hover:h-[20px]",
                    params?.serverId === id ? "h-[38px]" : "h-[8px]"
                )} />
                <div className={cn(
                    "relative group flex-1 mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
                    params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]"
                )}>
                    <Image 
                        fill
                        src={imageUrl}
                        alt="channel"
                    />
                </div>
                
            </button>
        </ActionToolTip>
     );
}
 
