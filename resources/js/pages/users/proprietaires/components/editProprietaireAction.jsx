import { Link } from "@inertiajs/react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Pencil } from "lucide-react";

export default function EditProprietaireAction({ proprietaire }) {
    return (
        <>
            <Link href={route("proprietaires.edit", proprietaire.id)}>
                <Button
                    className="bg-blue-500 h-8 w-8 hover:bg-blue-600 hover:cursor-pointer"
                    size="icon"
                >
                    <Pencil className="h-4 w-4" />
                </Button>
            </Link>
        </>
    );
}
