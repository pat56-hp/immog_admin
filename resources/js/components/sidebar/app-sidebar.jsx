import {
    BellRing,
    ClockFading,
    CreditCard,
    File,
    Home,
    HousePlus,
    UsersIcon,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "../ui/sidebar";
import NavMain from "./nav-main";
import NavHeader from "./nav-header";
import NavSetting from "./nav-setting";
import { usePage } from "@inertiajs/react";

export function AppSidebar() {
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
                url: "$route('dashboard')",
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
                        url: "#",
                    },
                    {
                        title: "Liste des propriétaires",
                        url: "#",
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

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <NavHeader />
            </SidebarHeader>
            <SidebarContent className="mt-4">
                <NavMain items={data.dashboard} />
                <NavMain items={data.users} groupLabel={"Utilisateurs"} />
                <NavMain items={data.biens} groupLabel={"Biens & contrats"} />
                <NavMain
                    items={data.comptabilite}
                    groupLabel={"Comptabilité"}
                />
                <NavMain
                    items={data.notifications}
                    groupLabel={"Notifications & rappels"}
                />
            </SidebarContent>

            <SidebarFooter className="bg-gray-80 border-t border-gray-200">
                <NavSetting user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
