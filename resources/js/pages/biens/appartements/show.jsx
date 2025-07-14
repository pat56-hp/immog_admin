import React from "react";
import ContentLayout from "../../../layouts/content-layout";
import { Button } from "../../../components/ui/button";
import { Pencil } from "lucide-react";
import { Link } from "@inertiajs/react";
import AppartementImages from "./components/images";
import AppartementInfo from "./components/info";
import AppartementResume from "./components/resume";

export default function SHowAppartement({ appartement, title, module }) {
    const breadcrumb = [
        {
            title: "Tableau de bord",
            link: route("dashboard"),
        },
        {
            title: "Appartements",
            link: route("appartements.index"),
        },
        {
            title: "Détails",
        },
    ];
    return (
        <ContentLayout
            title={title}
            module={module}
            breadcrumb={breadcrumb}
            backButton={true}
            otherButton={[
                <Link href={route("appartements.edit", appartement.id)}>
                    <Button className="bg-blue-500 hover:bg-blue-600 hover:cursor-pointer">
                        <Pencil className="h-4 w-4" /> Modifier
                    </Button>
                </Link>,
            ]}
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <AppartementImages appartement={appartement} />
                    <AppartementInfo appartement={appartement} />
                </div>
                <div className="space-y-6">
                    <AppartementResume appartement={appartement} />
                </div>
            </div>
        </ContentLayout>
    );
}
