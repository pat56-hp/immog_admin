import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Bell } from "lucide-react";
import React from "react";

export default function NavNotification() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="rounded-lg">
                <div className="relative">
                    <Bell className="w-5 text-gray-700" />
                    <span className="absolute bg-red-400 p-2 flex items-center justify-center w-3 h-3  rounded-full top-[-4px] right-[-4px] text-white text-[10px]">
                        0
                    </span>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] max-w-60 rounded-lg"
                side={"bottom"}
                align=""
                sideOffset={4}
            >
                <DropdownMenuGroup>
                    <DropdownMenuItem className="grid gap-2 text-xs">
                        <span className="truncate">
                            Ceci est une notification délévré par monsieur
                            Patrick dans l'optique de venir
                        </span>
                        <span className="text-gray-500 ">
                            10/01/1997 à 07:30
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="grid gap-2 text-xs">
                        <span className="truncate">
                            Ceci est une notification délévré par monsieur
                            Patrick dans l'optique de venir
                        </span>
                        <span className="text-gray-500 ">
                            10/01/1997 à 07:30
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="grid gap-2 text-xs">
                        <span className="truncate">
                            Ceci est une notification délévré par monsieur
                            Patrick dans l'optique de venir
                        </span>
                        <span className="text-gray-500 ">
                            10/01/1997 à 07:30
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
