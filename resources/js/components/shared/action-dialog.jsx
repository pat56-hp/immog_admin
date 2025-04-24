import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { toast } from "sonner";

export default function ActionDialog({
    trigger,
    title,
    description = null,
    content,
    onConfirm,
    disabled = false,
    processing = false,
    open: openProp,
    onOpenChange: onOpenChangeProp,
}) {
    const [internalOpen, setInternalOpen] = useState(false);

    const open = openProp ?? internalOpen;
    const onOpenChange = onOpenChangeProp ?? setInternalOpen;

    const handleConfirm = async (e) => {
        e.preventDefault();

        try {
            await onConfirm();
            onOpenChange(false);
        } catch (err) {
            console.log(err);
            toast.error("Une erreur est survenue. Veuillez réessayer svp.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}
                </DialogHeader>
                <div className="grid gap-4 py-4 mt-2 overflow-y-auto">
                    {content}
                </div>
                <DialogFooter className="flex gap-3">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="secondary"
                            disabled={disabled || processing}
                        >
                            Annuler
                        </Button>
                    </DialogClose>
                    <Button
                        type="submit"
                        disabled={disabled || processing}
                        onClick={handleConfirm}
                        className="bg-red-400 hover:bg-red-500 hover:cursor-pointer"
                    >
                        Enregistrer {processing && <Loader />}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
