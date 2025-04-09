import { Link } from "@inertiajs/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { BadgeCheck, Bell, LockKeyhole, LogOut } from "lucide-react";
import React from "react";

export default function NavUser() {
    const user = {
        name: "Patrick Aimé",
        email: "patrickkouassi7@gmail.com",
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex gap-2 items-center hover:cursor-pointer">
                    <Avatar className=" text-center h-8 w-8 rounded-lg bg-gray-100">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="rounded-lg ">
                            PA
                        </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                            Patrick Aimé
                        </span>
                        <span className="truncate text-xs">
                            patrickkouassi7@gmail.com
                        </span>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side={"bottom"}
                align="end"
                sideOffset={4}
            >
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <BadgeCheck />
                        Mon profil
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <LockKeyhole />
                        Mot de passe
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Bell />
                        Notifications
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <Link href="/#/auth/login">
                    <DropdownMenuItem className="hover:cursor-pointer">
                        <LogOut />
                        Se déconnecter
                    </DropdownMenuItem>
                </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
