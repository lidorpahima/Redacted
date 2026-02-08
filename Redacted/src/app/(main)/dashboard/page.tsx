"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useClerk } from "@clerk/nextjs";
import {
    ActivityIcon,
    ShieldAlertIcon,
    ZapIcon,
    TrendingUpIcon,
} from "lucide-react";

const statCards = [
    { title: "Total requests", value: "—", sub: "This month", icon: ActivityIcon, className: "" },
    { title: "Blocked", value: "—", sub: "Threats stopped", icon: ShieldAlertIcon, className: "border-destructive/30" },
    { title: "Avg latency", value: "—", sub: "Response time", icon: TrendingUpIcon, className: "" },
];

const DashboardPage = () => {
    const { user } = useClerk();

    return (
        <div className="space-y-8">
            {/* Welcome */}
            <div>
                <h1 className="text-2xl md:text-3xl font-semibold font-heading text-foreground">
                    Welcome back{user?.firstName ? `, ${user.firstName}` : ""}
                </h1>
                <p className="text-muted-foreground mt-1">
                    Here’s what’s happening with your gateway.
                </p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.title} className={stat.className}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </CardTitle>
                                <Icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-semibold font-heading">{stat.value}</p>
                                <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Main content: overview + recent activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-base">Overview</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Traffic and usage will appear here once your gateway is connected.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-lg border border-dashed border-border bg-muted/20 flex flex-col items-center justify-center py-12 px-4 text-center">
                            <ActivityIcon className="h-10 w-10 text-muted-foreground/50 mb-4" />
                            <p className="text-sm font-medium text-foreground">No data yet</p>
                            <p className="text-xs text-muted-foreground mt-1 max-w-sm">
                                Send requests through your gateway endpoint to see charts and metrics here.
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Recent activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-lg border border-dashed border-border bg-muted/20 flex flex-col items-center justify-center py-8 px-4 text-center">
                            <p className="text-sm text-muted-foreground">No recent requests</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Logs will show here once traffic flows.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick link to API / docs */}
            <Card className="bg-muted/20 border-primary/20">
                <CardContent className="py-6">
                    <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Next step:</span> Get your API key in Settings and point your app to the gateway endpoint. Need help?{" "}
                        <a href="mailto:lidorpahima28@gmail.com?subject=Dashboard%20support" className="text-primary hover:underline">
                            Contact support
                        </a>
                        .
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default DashboardPage;
