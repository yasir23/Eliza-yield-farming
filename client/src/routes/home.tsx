import { useQuery } from "@tanstack/react-query";
import { ArrowRight, BarChart2, ChevronRight, Coins, Globe, PiggyBank, Shield } from "lucide-react";
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { apiClient } from "@/lib/api";
import { NavLink } from "react-router";
import type { UUID } from "@elizaos/core";
import { formatAgentName } from "@/lib/utils";

export default function Home() {
    const query = useQuery({
        queryKey: ["agents"],
        queryFn: () => apiClient.getAgents(),
        refetchInterval: 5_000
    });

    const agents = query?.data?.agents;

    return (
        <div className="flex flex-col gap-6 h-full p-4 pb-16 overflow-y-auto">
            {/* Hero Section */}
            <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-br from-indigo-900 to-violet-900 rounded-2xl text-white">
                <div className="container mx-auto px-4 flex flex-col items-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Symmetros ESG Vision Fund</h1>
                    <p className="text-lg md:text-xl text-center max-w-3xl mb-8">
                        Low-Risk, Long-Term, Self-Sustaining Yield Farming with Social Impact
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Button size="lg" className="bg-white text-indigo-900 hover:bg-gray-200">
                            Explore Farms <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                            Learn More <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <Card className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xl">Total Value Locked</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">$4.2M</p>
                        <p className="text-sm text-muted-foreground">Across all strategies</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xl">Average APY</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">12.8%</p>
                        <p className="text-sm text-muted-foreground">Last 30 days</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xl">ESG Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">$85.3K</p>
                        <p className="text-sm text-muted-foreground">Donated to charities</p>
                    </CardContent>
                </Card>
            </section>

            {/* Features Section */}
            <section className="w-full">
                <h2 className="text-2xl font-bold mb-6">Why Choose Symmetros ESG Vision Fund?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <div className="h-12 w-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center mb-2">
                                <PiggyBank className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <CardTitle>Yield Optimizer</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Auto-compounds your rewards, saving time and gas fees while maximizing returns through compound interest.
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <div className="h-12 w-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center mb-2">
                                <BarChart2 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <CardTitle>AI-Powered Strategies</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Multi-agent system that monitors market conditions and auto-switches strategies for optimal returns.
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <div className="h-12 w-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center mb-2">
                                <Globe className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <CardTitle>Social Impact</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                5% of earnings are donated quarterly to carefully selected charitable causes for sustainability and impact.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Agent Section */}
            <section className="w-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Your AI Agents</h2>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        View all <ArrowRight className="h-4 w-4" />
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {agents?.map((agent: { id: UUID; name: string }) => (
                        <Card key={agent.id} className="flex flex-col hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2">
                                <CardTitle className="truncate">{agent?.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow pb-0">
                                <div className="rounded-md bg-muted aspect-square w-full grid place-items-center">
                                    <div className="text-4xl font-bold uppercase">
                                        {formatAgentName(agent?.name)}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-4">
                                <div className="flex items-center gap-2 w-full">
                                    <NavLink
                                        to={`/chat/${agent.id}`}
                                        className="w-full"
                                    >
                                        <Button
                                            variant="default"
                                            className="w-full"
                                        >
                                            Chat
                                        </Button>
                                    </NavLink>
                                    <NavLink
                                        to={`/settings/${agent.id}`}
                                        key={agent.id}
                                    >
                                        <Button size="icon" variant="outline">
                                            <Coins className="h-4 w-4" />
                                        </Button>
                                    </NavLink>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}
