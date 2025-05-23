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
import { CircleX, Loader } from "lucide-react";

export default function ActionAlertDialog({
    trigger,
    title,
    description,
    onConfirm = () => {},
    disabled = false,
    processing = false,
    open: openProp,
    onOpenChange: onOpenChangeProp,
    confirmButton = true,
    ...props
}) {
    const [internalOpen, setInternalOpen] = useState(false);

    const open = openProp ?? internalOpen;
    const onOpenChange = onOpenChangeProp ?? setInternalOpen;

    const handleConfirm = async (e) => {
        e.preventDefault();
        onConfirm();
        onOpenChange(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
            <AlertDialogContent {...props}>
                <AlertDialogHeader>
                    <AlertDialogTitle className="mb-4 flex gap-5 justify-between">
                        {title}
                        <AlertDialogCancel
                            disabled={processing}
                            className="rounded-full bg-secondary hover:cursor-pointer border-0 "
                        >
                            <CircleX className="h-4 w-4" />
                        </AlertDialogCancel>
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={processing}>
                        Fermer
                    </AlertDialogCancel>
                    {confirmButton && (
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
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
