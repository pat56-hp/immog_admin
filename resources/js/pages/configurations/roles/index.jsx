import React from "react";
import ContentLayout from "../../../layouts/content-layout";
import { Search } from "lucide-react";
import { Input } from "../../../components/ui/input";
import TableSection from "../../../components/table-section";
import { TableBody, TableCell, TableRow } from "../../../components/ui/table";
import { getDate } from "../../../helper/helper";

export default function Role({ title, roles }) {
    const breadcrumbs = [
        {
            title: "Tableau de bord",
            link: route("dashboard"),
        },
        {
            title: "Roles",
        },
    ];

    const columns = [
        { header: "Libéllé", accessor: "libelle" },
        { header: "Statut", accessor: "status" },
        { header: "Créé le", accessor: "created_by" },
    ];
    return (
        <ContentLayout
            title={title}
            subtitle="Consulter la liste des rôles d'utilisateur"
            breadcrumb={breadcrumbs}
        >
            <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Rechercher"
                        className="pl-8 w-full text-sm focus:border-transparent active:border-transparent"
                    />
                </div>
            </div>
            <TableSection columns={columns}>
                <TableBody>
                    {roles.length > 0 ? (
                        roles.map((row, key) => (
                            <TableRow key={key}>
                                <TableCell>{row.libelle}</TableCell>
                                <TableCell>
                                    <span
                                        className={
                                            row.status == 1
                                                ? "bade-success"
                                                : "badge-danger"
                                        }
                                    >
                                        {row.status == 1 ? "Actif" : "Inactif"}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    {getDate(row.created_at)} par{" "}
                                    {row.created_by}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length}>
                                {noDataMessage}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </TableSection>
        </ContentLayout>
    );
}
