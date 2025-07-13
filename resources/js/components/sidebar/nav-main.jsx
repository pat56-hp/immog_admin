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
                        <SidebarMenuItem
                            className={
                                item.isActive
                                    ? "border-l-4 border-[#ff6467] bg-[#fff6f6] text-[#ff6467]"
                                    : "border-l-4 border-transparent hover:border-[#ff6467] hover:bg-[#fff6f6] hover:text-[#ff6467]"
                            }
                        >
                            {item.items ? (
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton
                                        tooltip={item.title}
                                        className={`!py-5 pl-4 border-transparent transition-colors
        hover:bg-[#fff6f6] hover:border-[#ff6467] hover:text-[#ff6467]
        data-[active=true]:bg-[#fff6f6] data-[active=true]:border-[#ff6467] data-[active=true]:text-[#ff6467]
        data-[state=open]:data-[active=true]:bg-[#fff6f6] data-[state=open]:data-[active=true]:border-[#ff6467] data-[state=open]:data-[active=true]:text-[#ff6467]
        hover:cursor-pointer`}
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
                                        className={`!py-5 pl-4 border-transparent transition-colors
        hover:bg-[#fff6f6] hover:border-[#ff6467] hover:text-[#ff6467]
        data-[active=true]:bg-[#fff6f6] data-[active=true]:border-[#ff6467] data-[active=true]:text-[#ff6467]
        hover:cursor-pointer`}
                                        data-active={item.isActive}
                                    >
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                </Link>
                            )}
                            {item.items && (
                                <CollapsibleContent>
                                    <SidebarMenuSub
                                        className={
                                            item.isActive
                                                ? "!border-l-0 bg-[#fff6f6]"
                                                : ""
                                        }
                                    >
                                        {item.items?.map((subItem) => (
                                            <SidebarMenuSubItem
                                                key={subItem.title}
                                            >
                                                <SidebarMenuSubButton
                                                    asChild
                                                    data-active={
                                                        subItem.isActive
                                                    }
                                                    className={`transition-colors
        hover:bg-[#fff6f6] hover:text-[#ff6467]
        data-[active=true]:bg-[#fff6f6] data-[active=true]:text-[#ff6467]`}
                                                >
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
