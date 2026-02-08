import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils";
import { ArrowRightIcon, FileCheckIcon, PlugIcon, ShieldAlertIcon, ShieldIcon, ZapIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { Badge } from "./badge";
import { Card } from "./card";
import { Integrations } from "./integrations";

export const CARDS = [
    {
        Icon: ShieldAlertIcon,
        name: "Threat prevention",
        description: "Jailbreak and prompt-injection attempts are detected at the gateway and blocked before they ever reach the LLM—so your models stay under your control.",
        href: "#",
        cta: "Learn more",
        className: "col-span-3 lg:col-span-2",
        background: (
            <Card className="absolute left-10 right-10 top-12 origin-top rounded-md border border-destructive/50 bg-destructive/5 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_0%,#000_100%)] group-hover:scale-[1.02] p-4" aria-hidden>
                <p className="mb-2 text-[10px] uppercase tracking-wider text-muted-foreground">Gateway</p>
                <div className="flex items-center gap-2">
                    <ShieldAlertIcon className="h-5 w-5 shrink-0 text-destructive" aria-hidden />
                    <span className="text-sm font-semibold text-destructive">Jailbreak detected</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Reason: Prompt injection / jailbreak attempt. Request blocked; nothing was sent to the model.</p>
            </Card>
        ),
    },
    {
        Icon: FileCheckIcon,
        name: "Custom policy enforcement",
        description: "Use your own rules and a vector DB to enforce what’s allowed or blocked—e.g. block “investment advice” for a bank, or “profanity” for a gaming company.",
        href: "#",
        cta: "Learn more",
        className: "col-span-3 lg:col-span-1",
        background: (
            <Card className="absolute right-4 top-10 w-[85%] origin-top rounded-md border border-border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_20%,#000_100%)] group-hover:translate-x-1 p-3" aria-hidden>
                <p className="mb-2 text-[10px] uppercase tracking-wider text-muted-foreground">Your company rules</p>
                <ul className="space-y-1.5 text-xs" role="list">
                    <li className="rounded px-2 py-1 bg-destructive/10 text-destructive"><span className="font-medium">Blocked:</span> investment advice</li>
                    <li className="rounded px-2 py-1 bg-destructive/10 text-destructive"><span className="font-medium">Blocked:</span> profanity</li>
                    <li className="rounded px-2 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"><span className="font-medium">Allowed:</span> support docs</li>
                </ul>
            </Card>
        ),
    },
    {
        Icon: ZapIcon,
        name: "Latency reduction",
        description: "Cached responses in ~20ms instead of waiting seconds for the LLM—better UX and lower cost when the same question is asked again.",
        href: "#",
        cta: "Learn more",
        className: "col-span-3 lg:col-span-1",
        background: (
            <div className="absolute right-6 top-12 flex flex-col items-center gap-2 rounded-lg border border-border bg-muted/30 p-4 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_30%,#000_100%)] group-hover:scale-105" aria-hidden>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Response time</p>
                <span className="text-3xl font-bold tabular-nums text-emerald-500">20ms</span>
                <Badge variant="secondary" className="text-xs">Cache hit — same question, instant answer</Badge>
            </div>
        ),
    },
    {
        Icon: PlugIcon,
        name: "Integrations",
        description: "One gateway between your apps and AI. Connect Slack, Notion, your product—every request goes through the same security and policy layer.",
        href: "#",
        cta: "Learn more",
        className: "col-span-3 lg:col-span-2 max-w-full overflow-hidden",
        background: (
            <Integrations className="absolute right-2 pl-28 md:pl-0 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" aria-hidden />
        ),
    },
];

const BentoGrid = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <div
            role="list"
            aria-label="Security and performance features"
            className={cn(
                "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
                className,
            )}
        >
            {children}
        </div>
    );
};

const BentoCard = ({
    name,
    className,
    background,
    Icon,
    description,
    href,
    cta,
}: {
    name: string;
    className: string;
    background: ReactNode;
    Icon: any;
    description: string;
    href: string;
    cta: string;
}) => (
    <article
        key={name}
        role="listitem"
        aria-labelledby={`bento-title-${name.replace(/\s+/g, "-")}`}
        className={cn(
            "group relative col-span-3 flex flex-col justify-between border border-border/60 overflow-hidden rounded-xl",
            "bg-black [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
            className,
        )}
    >
        <div>{background}</div>
        <div className="pointer-events-none z-10 flex flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
            <Icon className="h-12 w-12 origin-left text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" aria-hidden />
            <h3 id={`bento-title-${name.replace(/\s+/g, "-")}`} className="text-xl font-semibold text-neutral-300">
                {name}
            </h3>
            <p className="max-w-lg text-neutral-400">{description}</p>
        </div>

        <div
            className={cn(
                "absolute bottom-0 z-20 flex w-full translate-y-10 flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
            )}
        >
            <Link
                href={href}
                className={buttonVariants({ size: "sm", variant: "ghost", className: "cursor-pointer focus-visible:ring-2 focus-visible:ring-ring" })}
                aria-label={`${cta} — ${name}`}
            >
                {cta}
                <ArrowRightIcon className="ml-2 h-4 w-4" aria-hidden />
            </Link>
        </div>
        <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" aria-hidden />
    </article>
);

export { BentoCard, BentoGrid };
