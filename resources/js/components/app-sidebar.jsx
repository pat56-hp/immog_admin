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
} from "./ui/sidebar";
import NavUser from "./nav-user";
import NavMain from "./nav-main";
import NavHeader from "./nav-header";

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    dashboard: [
        {
            title: "Tableau de bord",
            url: "#",
            icon: Home,
            isActive: true,
        },
    ],
    users: [
        {
            title: "Propriétaires",
            url: "#",
            icon: UsersIcon,
            isActive: false,
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
            isActive: false,
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
            isActive: false,
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
            isActive: false,
            icon: File,
        },
    ],
    comptabilite: [
        {
            title: "Factures",
            url: "#",
            icon: File,
            isActive: false,
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
            isActive: false,
        },
    ],
    notifications: [
        {
            title: "Rappels",
            url: "#",
            icon: ClockFading,
            isActive: false,
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
        },
    ],
};

export function AppSidebar() {
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
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
