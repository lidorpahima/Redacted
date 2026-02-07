"use client";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

const DEFAULT_EXPLANATION =
    "We integrate with many more AI providers through OpenRouter and direct APIs. If you use a model we don’t list yet, reach out we’re adding support all the time.";

export function AndMoreExpandable({
    explanation = DEFAULT_EXPLANATION,
}: {
    explanation?: string;
}) {
    const [open, setOpen] = useState(false);

    return (
        <Collapsible open={open} onOpenChange={setOpen}>
            <div className="flex flex-col items-center gap-2">
                <CollapsibleTrigger asChild>
                    <button
                        type="button"
                        className="inline-flex items-center gap-1.5 text-sm font-normal font-heading text-neutral-400 uppercase hover:text-neutral-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                        aria-expanded={open}
                    >
                        And more
                        <ChevronDownIcon
                            className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                            aria-hidden
                        />
                    </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <p className="text-center text-sm text-muted-foreground max-w-md px-4 animate-in fade-in slide-in-from-top-2 duration-200">
                        {explanation}
                    </p>
                </CollapsibleContent>
            </div>
        </Collapsible>
    );
}
