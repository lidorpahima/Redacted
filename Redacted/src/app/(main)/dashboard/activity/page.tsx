"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityIcon } from "lucide-react";

export default function ActivityPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-semibold font-heading text-foreground">
                    Activity
                </h1>
                <p className="text-muted-foreground mt-1">
                    Recent gateway activity and events.
                </p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Activity feed</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Blocked requests, policy changes, and other events.
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="rounded-lg border border-dashed border-border bg-muted/20 flex flex-col items-center justify-center py-12 text-center">
                        <ActivityIcon className="h-10 w-10 text-muted-foreground/50 mb-4" />
                        <p className="text-sm text-muted-foreground">No activity yet.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
