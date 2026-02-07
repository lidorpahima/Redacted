import { FileCheckIcon, HelpCircleIcon, PlugIcon, ShieldAlertIcon, ZapIcon } from "lucide-react";

export const NAV_LINKS = [
    {
        title: "Features",
        href: "/features",
        menu: [
            {
                title: "Threat prevention",
                tagline: "Block jailbreak and prompt-injection at the gateway.",
                href: "/features",
                icon: ShieldAlertIcon,
            },
            {
                title: "Custom policy enforcement",
                tagline: "Your rules and vector DB—block or allow by content.",
                href: "/features",
                icon: FileCheckIcon,
            },
            {
                title: "Latency reduction",
                tagline: "Cached responses in ~20ms. Lower cost, faster UX.",
                href: "/features",
                icon: ZapIcon,
            },
            {
                title: "Integrations",
                tagline: "One gateway between your apps and AI providers.",
                href: "/features",
                icon: PlugIcon,
            },
        ],
    },
    {
        title: "Pricing",
        href: "/pricing",
    },
    {
        title: "Enterprise",
        href: "/enterprise",
    },
    {
        title: "Resources",
        href: "/resources",
        menu: [

            {
                title: "Help",
                tagline: "Get answers to your questions.",
                href: "/resources/help",
                icon: HelpCircleIcon,
            },
        ]
    },
    {
        title: "Changelog",
        href: "/changelog",
    },
];
