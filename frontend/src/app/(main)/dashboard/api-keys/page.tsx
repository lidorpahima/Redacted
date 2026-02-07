"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRoundIcon } from "lucide-react";

export default function ApiKeysPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-semibold font-heading text-foreground">
                    API Keys
                </h1>
                <p className="text-muted-foreground mt-1">
                    Manage keys for your gateway endpoint.
                </p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Your API keys</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Create and revoke keys to authenticate requests to the gateway.
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="rounded-lg border border-dashed border-border bg-muted/20 flex flex-col items-center justify-center py-12 text-center">
                        <KeyRoundIcon className="h-10 w-10 text-muted-foreground/50 mb-4" />
                        <p className="text-sm text-muted-foreground">API key management coming soon.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
