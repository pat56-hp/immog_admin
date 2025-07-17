import { useEffect } from "react";
import { toast } from "sonner";
import { Badge } from "../../components/ui/badge";
import { getFormattedDate } from "../../helper/helper";

export function useFacture(success) {
    const breadcrumb = [
        {
            title: "Tableau de bord",
            link: route("dashboard"),
        },
        {
            title: "Facturations",
        },
    ];

    useEffect(() => {
        if (success) {
            toast.success(success);
            window.history.replaceState({}, "", window.location.pathname);
        }
    }, [success]);

    const columns = [
        {
            key: "ref",
            label: "#Ref",
            sortable: true,
            render: (facture) => (
                <div className="space-y-1">
                    {facture.ref}
                    <br />
                    <Badge variant="success">{facture.type}</Badge>
                </div>
            ),
        },
        {
            key: "user_name",
            label: "Client / Type",
            sortable: true,
            render: (facture) => (
                <div className="space-y-1">
                    <Badge variant="warning">{facture.user_name}</Badge>
                    <br />
                    <Badge variant="success">{facture.user_type}</Badge>
                </div>
            ),
        },
        {
            key: "montant_formatted",
            label: "Montant",
            sortable: true,
        },
        {
            key: "date_emission",
            label: "Date émission",
            sortable: true,
            render: (facture) => getFormattedDate(facture.date_emission),
        },
        {
            key: "date_echeance",
            label: "Date échéance",
            sortable: true,
            render: (facture) => getFormattedDate(facture.date_echeance),
        },
        {
            label: "Statut / Etat",
            key: "statut",
            render: (facture) => (
                <div className="space-y-1 space-x-0.5">
                    <Badge
                        variant={
                            facture.statut === "payée" ? "success" : "warning"
                        }
                    >
                        {facture.statut}
                    </Badge>

                    <Badge
                        variant={
                            facture.etat === "validée" ? "success" : "warning"
                        }
                    >
                        {facture.etat}
                    </Badge>
                </div>
            ),
        },
        {
            label: "Actions",
            key: "action",
        },
    ];

    return {
        breadcrumb,
        columns,
    };
}
