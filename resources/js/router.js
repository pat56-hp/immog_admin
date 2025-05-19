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
                        url: route("locataires.create"),
                        isActive: url.endsWith("locataires/create"),
                    },
                    {
                        title: "Liste des locataires",
                        url: route("locataires.index"),
                        isActive: url.endsWith("locataires"),
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
                        url: route("appartements.create"),
                        isActive: url.endsWith("appartements/create"),
                    },
                    {
                        title: "Liste des apparts",
                        url: route("appartements.index"),
                        isActive: url.endsWith("appartements"),
                    },
                    {
                        title: "Types des apparts",
                        url: route("appartements.types.index"),
                        isActive: url.endsWith("appartements/types/liste"),
                    },
                ],
            },
            {
                title: "Contrats de bail",
                url: route("contrats.index"),
                icon: File,
                isActive: url.startsWith("/contrats"),
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
