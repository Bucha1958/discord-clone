"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";



const InviteModal = () => {

    const { type, isOpen, onOpen, onClose, data } = useModal();

    const isModalOpen = isOpen && type === "invite";

    const origin = useOrigin();

    const { server } = data;

    const [copied, setIsCopied] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };

    const onNew = async () => {
        try {
            setIsLoading(true);
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);
            onOpen('invite', { server: response.data });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };


    return ( 
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white p-0 text-black overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center text-2xl text-bold">
                        Invite Members
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    <Label
                        className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                    >
                        Server invite link
                    </Label>
                    <div className="mt-2 flex items-center gap-x-1">
                        <Input 
                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                            value={inviteUrl}
                            disabled={isLoading}
                        />
                        <Button disabled={isLoading} onClick={onCopy} size="icon">
                            {copied ? <Check /> : <Copy />}
                        </Button>
                    </div>
                    <Button
                        onClick={onNew}
                        disabled={isLoading}
                        variant="link"
                        size="sm"
                        className="text-xs mt-4 text-zinc-500"
                    >
                        Generate a new link
                        <RefreshCcw className="ml-2 w-4 h-4"/>
                    </Button>
                    
                </div>
            </DialogContent>
        </Dialog>        
     );
}
 
export default InviteModal;