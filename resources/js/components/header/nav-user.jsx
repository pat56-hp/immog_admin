import { Link, usePage } from "@inertiajs/react";
import { Avatar, AvatarFallback } from "../ui/avatar";
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
    const user = usePage().props.auth.user;
    const avatar = user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex gap-2 items-center hover:cursor-pointer">
                    <Avatar className=" text-center h-8 w-8 rounded-lg bg-gray-100">
                        <AvatarFallback className="rounded-lg ">
                            {avatar}
                        </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                            {user.name}
                        </span>
                        <span className="truncate text-xs">{user.email}</span>
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
                    <Link href={route("profile.edit")}>
                        <DropdownMenuItem>
                            <BadgeCheck />
                            Mon profil
                        </DropdownMenuItem>
                    </Link>
                    <Link href={route("profile.password")}>
                        <DropdownMenuItem>
                            <LockKeyhole />
                            Mot de passe
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <Link href={route("logout")} method="post" className="w-full">
                    <DropdownMenuItem>
                        <LogOut />
                        Se déconnecter
                    </DropdownMenuItem>
                </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
