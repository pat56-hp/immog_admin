import { usePage } from "@inertiajs/react";
import {
    BellRing,
    ClockFading,
    CreditCard,
    File,
    Home,
    HousePlus,
    UsersIcon,
} from "lucide-react";

const routePage = () => {
    const { url } = usePage();
    const data = {
        user: {
            name: "shadcn",
            email: "m@example.com",
            avatar: "/avatars/shadcn.jpg",
        },
        dashboard: [
            {
                title: "Tableau de bord",
                url: route("dashboard"),
                icon: Home,
                isActive: url.startsWith("/dashboard"),
            },
        ],
        users: [
            {
                title: "Propriétaires",
                url: "#",
                icon: UsersIcon,
                isActive: url.startsWith("/proprietaires"),
                items: [
                    {
                        title: "Ajouter un propriétaire",
                        url: route("proprietaires.create"),
                        isActive: url.endsWith("proprietaires/create"),
                    },
                    {
                        isActive: url.endsWith("proprietaires"),
                        title: "Liste des propriétaires",
                        url: route("proprietaires.index"),
                    },
                ],
            },
            {
                title: "Locataires",
                url: "#",
                icon: UsersIcon,
                isActive: url.startsWith("/locataires"),
                items: [
                    {
                        title: "Ajouter un locataire",
                        url: "#",
                    },
                    {
                        title: "Liste des locataires",
                        url: "#",
                    },
                ],
            },
        ],
        biens: [
            {
                title: "Appartements",
                url: "#",
                icon: HousePlus,
                isActive: url.startsWith("/appartements"),
                items: [
                    {
                        title: "Ajouter un appart",
                        url: "#",
                    },
                    {
                        title: "Liste des apparts",
                        url: "#",
                    },
                ],
            },
            {
                title: "Contrats de bail",
                url: "#",
                icon: File,
                isActive: url.startsWith("/contrats-de-bail"),
            },
        ],
        comptabilite: [
            {
                title: "Factures",
                url: "#",
                icon: File,
                isActive: url.startsWith("/factures"),
                items: [
                    {
                        title: "Créer une facture",
                        url: "#",
                    },
                    {
                        title: "Liste des factures",
                        url: "#",
                    },
                ],
            },
            {
                title: "Paiements",
                url: "#",
                icon: CreditCard,
                isActive: url.startsWith("/paiements"),
            },
        ],
        notifications: [
            {
                title: "Rappels",
                url: "#",
                icon: ClockFading,
                isActive: url.startsWith("/rappels"),
                items: [
                    {
                        title: "Créer un rappel",
                        url: "#",
                    },
                    {
                        title: "Liste des rappels",
                        url: "#",
                    },
                ],
            },
            {
                title: "Notifications",
                url: "#",
                icon: BellRing,
                isActive: url.startsWith("/notifications"),
            },
        ],
    };

    return data;
};

export { routePage };
