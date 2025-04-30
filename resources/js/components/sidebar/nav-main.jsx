import React from "react";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "../ui/sidebar";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function NavMain({ items, groupLabel = null }) {
    return (
        <SidebarGroup>
            {groupLabel && <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>}
            <SidebarMenu>
                {items.map((item) => (
                    <Collapsible
                        key={item.title}
                        asChild
                        defaultOpen={item.isActive}
                        className="group/collapsible"
                    >
                        <SidebarMenuItem>
                            {item.items ? (
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton
                                        tooltip={item.title}
                                        className="!py-5 data-[active=true]:bg-red-400 data-[active=true]:text-white data-[active=true]:hover:bg-red-400 data-[active=true]:hover:text-white data-[state=open]:data-[active=true]:hover:bg-red-400 data-[state=open]:data-[active=true]:hover:text-white hover:cursor-pointer"
                                        data-active={item.isActive}
                                    >
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                            ) : (
                                <Link href={item.url}>
                                    <SidebarMenuButton
                                        tooltip={item.title}
                                        className="!py-5 data-[active=true]:bg-red-400 data-[active=true]:text-white data-[active=true]:hover:bg-red-400 data-[active=true]:hover:text-white data-[state=open]:data-[active=true]:hover:bg-red-400 data-[state=open]:data-[active=true]:hover:text-white hover:cursor-pointer"
                                        data-active={item.isActive}
                                    >
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                </Link>
                            )}
                            {item.items && (
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.items?.map((subItem) => (
                                            <SidebarMenuSubItem
                                                key={subItem.title}
                                            >
                                                <SidebarMenuSubButton asChild>
                                                    <Link href={subItem.url}>
                                                        <span>
                                                            {subItem.title}
                                                        </span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            )}
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
