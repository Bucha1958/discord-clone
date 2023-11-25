"use client"

import axios from "axios";
import qs from "query-string"
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";


import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/file-upload";
import { useModal } from "@/hooks/use-modal-store";


const formSchema = z.object({
    fileUrl: z.string().min(1, {
        message: "file attachment must be required.",
    })
})

const MessageFileModal = () => {

    const { isOpen, data, onClose, type } = useModal();

    const isModalOpen =isOpen && type === "messaageFile";

    const router = useRouter();

    const { apiUrl, query } = data;


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileUrl: "",
        }
    });

    const handleClose = () => {
        form.reset();
        onClose()
    }

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query,
            });
            await axios.post(url, { 
                ...values, 
                content: values.fileUrl, 
            });
            form.reset();
            router.refresh();
            handleClose();
        } catch(error) {
            console.error(error);
        }
    }


    return ( 
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white p-0 text-black overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center text-2xl text-bold">
                        Add an attachement
                    </DialogTitle>
                    <DialogDescription className="text-zinc-500 text-center">
                        Send a file as a message
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField 
                                    control={form.control}
                                    name="fileUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint="messageFile"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter className="bg-gray-100 py-4 px-6">
                            <Button variant="primary" disabled={isLoading}>Send</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>        
     );
}
 
export default MessageFileModal;