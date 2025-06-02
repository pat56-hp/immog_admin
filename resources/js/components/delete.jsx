import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import ActionAlertDialog from "./shared/action-alert-dialog";

export default function DeleteComponent({
    title,
    description,
    route,
    message,
}) {
    const { delete: destroy, processing } = useForm();
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                variant="destructive"
                size="icon"
                className="h-8 w-8 hover:cursor-pointer"
                onClick={() => setOpen(true)}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
            <ActionAlertDialog
                open={open}
                onOpenChange={setOpen}
                title={title}
                description={description}
                processing={processing}
                onConfirm={() =>
                    destroy(route, {
                        preserveScroll: true,
                        onSuccess: () => {
                            toast.success(message);
                        },
                    })
                }
            />
        </>
    );
}
