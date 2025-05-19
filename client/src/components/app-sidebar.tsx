import { useQuery } from "@tanstack/react-query";
import info from "@/lib/info.json";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { apiClient } from "@/lib/api";
import { NavLink, useLocation } from "react-router";
import type { UUID } from "@elizaos/core";
import { 
    BarChart2, 
    Book, 
    Cog, 
    CreditCard, 
    DollarSign, 
    Globe, 
    HelpCircle, 
    Home,
    PiggyBank, 
    RefreshCcw, 
    Shield, 
    User, 
    Users 
} from "lucide-react";
import ConnectionStatus from "./connection-status";
import SymmetrosLogo from "./symmetros-logo";

export function AppSidebar() {
    const location = useLocation();
    const query = useQuery({
        queryKey: ["agents"],
        queryFn: () => apiClient.getAgents(),
        refetchInterval: 5_000,
    });

    const agents = query?.data?.agents;

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <NavLink to="/">
                                <SymmetrosLogo size={28} />

                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">
                                        Symmetros
                                    </span>
                                    <span className="text-xs">ESG Vision Fund</span>
                                </div>
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {/* Main Navigation */}
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <NavLink to="/">
                                    <SidebarMenuButton isActive={location.pathname === "/"}>
                                        <Home className="size-4" /> 
                                        <span>Dashboard</span>
                                    </SidebarMenuButton>
                                </NavLink>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <NavLink to="/farms">
                                    <SidebarMenuButton isActive={location.pathname.includes("farms")}>
                                        <PiggyBank className="size-4" /> 
                                        <span>Yield Farms</span>
                                    </SidebarMenuButton>
                                </NavLink>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <NavLink to="/strategies">
                                    <SidebarMenuButton isActive={location.pathname.includes("strategies")}>
                                        <RefreshCcw className="size-4" /> 
                                        <span>Strategies</span>
                                    </SidebarMenuButton>
                                </NavLink>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <NavLink to="/swap">
                                    <SidebarMenuButton isActive={location.pathname.includes("swap")}>
                                        <CreditCard className="size-4" /> 
                                        <span>Swap</span>
                                    </SidebarMenuButton>
                                </NavLink>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <NavLink to="/portfolio">
                                    <SidebarMenuButton isActive={location.pathname.includes("portfolio")}>
                                        <BarChart2 className="size-4" /> 
                                        <span>Portfolio</span>
                                    </SidebarMenuButton>
                                </NavLink>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <NavLink to="/impact">
                                    <SidebarMenuButton isActive={location.pathname.includes("impact")}>
                                        <Globe className="size-4" /> 
                                        <span>ESG Impact</span>
                                    </SidebarMenuButton>
                                </NavLink>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* AI Agents */}
                <SidebarGroup>
                    <SidebarGroupLabel>AI Agents</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {query?.isPending ? (
                                <div>
                                    {Array.from({ length: 5 }).map(
                                        (_, _index) => (
                                            <SidebarMenuItem key={`skeleton-item-${_index}`}>
                                                <SidebarMenuSkeleton />
                                            </SidebarMenuItem>
                                        )
                                    )}
                                </div>
                            ) : (
                                <div>
                                    {agents?.map(
                                        (agent: { id: UUID; name: string }) => (
                                            <SidebarMenuItem key={agent.id}>
                                                <NavLink
                                                    to={`/chat/${agent.id}`}
                                                >
                                                    <SidebarMenuButton
                                                        isActive={location.pathname.includes(
                                                            agent.id
                                                        )}
                                                    >
                                                        <User className="size-4" />
                                                        <span>
                                                            {agent.name}
                                                        </span>
                                                    </SidebarMenuButton>
                                                </NavLink>
                                            </SidebarMenuItem>
                                        )
                                    )}
                                </div>
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <NavLink to="/community">
                            <SidebarMenuButton>
                                <Users className="size-4" /> Community
                            </SidebarMenuButton>
                        </NavLink>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <NavLink to="/docs">
                            <SidebarMenuButton>
                                <Book className="size-4" /> Documentation
                            </SidebarMenuButton>
                        </NavLink>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <NavLink to="/support">
                            <SidebarMenuButton>
                                <HelpCircle className="size-4" /> Support
                            </SidebarMenuButton>
                        </NavLink>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <NavLink to="/settings">
                            <SidebarMenuButton>
                                <Cog className="size-4" /> Settings
                            </SidebarMenuButton>
                        </NavLink>
                    </SidebarMenuItem>
                    <ConnectionStatus />
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
