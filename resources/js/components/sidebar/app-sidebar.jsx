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
import { routePage } from "../../router";

export function AppSidebar() {
    const data = routePage();

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
                <NavSetting />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
