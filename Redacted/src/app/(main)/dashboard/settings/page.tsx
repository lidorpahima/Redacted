"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SettingsIcon } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-semibold font-heading text-foreground">
                    Settings
                </h1>
                <p className="text-muted-foreground mt-1">
                    Gateway and account preferences.
                </p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Gateway settings</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Endpoint URL, policies, and detection options.
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="rounded-lg border border-dashed border-border bg-muted/20 flex flex-col items-center justify-center py-12 text-center">
                        <SettingsIcon className="h-10 w-10 text-muted-foreground/50 mb-4" />
                        <p className="text-sm text-muted-foreground">Settings will be available here soon.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
