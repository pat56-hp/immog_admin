import React from "react";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "../ui/sidebar";
import {
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenu,
} from "../ui/dropdown-menu";
import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogOut,
    Settings,
    Settings2,
    Sparkles,
    SquareActivity,
} from "lucide-react";
import { Link } from "@inertiajs/react";
export default function NavSetting(user) {
    const { isMobile } = useSidebar();
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className=" data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:cursor-pointer"
                        >
                            <Settings className="text-sm" />
                            <div className="text-center text-sm leading-tight">
                                <span className="">Configurations</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <Link href={route("roles.index")}>
                            <DropdownMenuItem>
                                <CreditCard />
                                Roles
                            </DropdownMenuItem>
                        </Link>
                        <Link href="#">
                            <DropdownMenuItem>
                                <Sparkles />
                                Permissions
                            </DropdownMenuItem>
                        </Link>
                        <Link href={route("users.index")}>
                            <DropdownMenuItem>
                                <BadgeCheck />
                                Comptes utilisateur
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <Link href="#">
                            <DropdownMenuItem>
                                <SquareActivity />
                                Historique d'activité
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <Link href="#">
                            <DropdownMenuItem>
                                <Settings2 />
                                Paramètres
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
