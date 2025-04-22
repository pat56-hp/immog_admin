import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Loader } from "lucide-react";

export default function ActionAlertDialog({
    trigger,
    title,
    description,
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
        await onConfirm();
        onOpenChange(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={processing}>
                        Annuler
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirm}
                        disabled={disabled || processing}
                        className="hover:cursor-pointer"
                    >
                        Continuer{" "}
                        {processing && (
                            <Loader className="ml-2 h-4 w-4 animate-spin" />
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
