// export const PLANS = [
//     {
//         name: "Free",
//         info: "For most individuals",
//         price: {
//             monthly: 0,
//             yearly: 0,
//         },
//         features: [
//             { text: "Shorten links" },
//             { text: "Up to 100 tags", limit: "100 tags" },
//             { text: "Customizable branded links" },
//             { text: "Track clicks", tooltip: "1K clicks/month" },
//             { text: "Community support", tooltip: "Get answers your questions on discord" },
//             { text: "AI powered suggestions", tooltip: "Get up to 100 AI powered suggestions" },
//         ],
//         btn: {
//             text: "Start for free",
//             href: "/auth/sign-up?plan=free",
//             variant: "default",
//         }
//     },
//     {
//         name: "Pro",
//         info: "For small businesses",
//         price: {
//             monthly: 9,
//             yearly: 90,
//         },
//         features: [
//             { text: "Shorten links" },
//             { text: "Up to 500 tags", limit: "500 tags" },
//             { text: "Customizable branded links" },
//             { text: "Track clicks", tooltip: "20K clicks/month" },
//             { text: "Export click data", tooltip: "Upto 1K links" },
//             { text: "Priority support", tooltip: "Get 24/7 chat support" },
//             { text: "AI powered suggestions", tooltip: "Get up to 500 AI powered suggestions" },
//         ],
//         btn: {
//             text: "Get started",
//             href: "/auth/sign-up?plan=pro",
//             variant: "purple",
//         }
//     },
//     {
//         name: "Business",
//         info: "For large organizations",
//         price: {
//             monthly: 49,
//             yearly: 490,
//         },
//         features: [
//             { text: "Shorten links" },
//             { text: "Unlimited tags" },
//             { text: "Customizable branded links"},
//             { text: "Track clicks", tooltip: "Unlimited clicks" },
//             { text: "Export click data", tooltip: "Unlimited clicks" },
//             { text: "Dedicated manager", tooltip: "Get priority support from our team" },
//             { text: "AI powered suggestions", tooltip: "Get unlimited AI powered suggestions" },
//         ],
//         btn: {
//             text: "Contact team",
//             href: "/auth/sign-up?plan=business",
//             variant: "default",
//         }
//     }
// ];

// export const PRICING_FEATURES = [
//     {
//         text: "Shorten links",
//         tooltip: "Create shortened links",
//     },
//     {
//         text: "Track clicks",
//         tooltip: "Track clicks on your links",
//     },
//     {
//         text: "See top countries",
//         tooltip: "See top countries where your links are clicked",
//     },
//     {
//         text: "Upto 10 tags",
//         tooltip: "Add upto 10 tags to your links",
//     },
//     {
//         text: "Community support",
//         tooltip: "Community support is available for free users",
//     },
//     {
//         text: "Priority support",
//         tooltip: "Get priority support from our team",
//     },
//     {
//         text: "AI powered suggestions",
//         tooltip: "Get AI powered suggestions for your links",
//     },
// ];

// export const WORKSPACE_LIMIT = 2;

// Freemium + usage-based: Free → Startup ($49) → Professional ($199) → Enterprise (Custom)
export const PLANS = [
    {
        name: "Free",
        info: "Solo developers, students, MVPs",
        price: { monthly: 0, yearly: 0 },
        features: [
            { text: "1,000 requests/month" },
            { text: "Basic PII detection" },
            { text: "Single user" },
            { text: "Community support" },
            { text: "7-day log retention", tooltip: "Request logs kept for 7 days" },
        ],
        btn: { text: "Start for free", href: "/auth/sign-up?plan=free", variant: "default" as const },
    },
    {
        name: "Startup",
        info: "Startups & small teams (5–20)",
        price: { monthly: 49, yearly: 470 }, // 20% annual discount
        overage: "+ $0.001/request over 50K",
        features: [
            { text: "50,000 requests/month included" },
            { text: "Full PII detection", tooltip: "API keys, credit cards, SSN" },
            { text: "Basic jailbreak detection" },
            { text: "3 team members" },
            { text: "30-day log retention" },
            { text: "Email support" },
            { text: "Dashboard analytics" },
        ],
        btn: { text: "Contact Sales", href: "mailto:lidorpahima28@gmail.com?subject=Startup%20plan%20inquiry", variant: "purple" as const },
    },
    {
        name: "Professional",
        info: "Scale-ups & mid-size (50–200)",
        price: { monthly: 199, yearly: 1910 }, // 20% annual discount
        overage: "+ $0.0008/request over 200K",
        features: [
            { text: "200,000 requests/month included" },
            { text: "Advanced PII detection" },
            { text: "Custom policy engine", tooltip: "ChromaDB-backed rules" },
            { text: "Jailbreak + prompt injection detection" },
            { text: "Unlimited team members" },
            { text: "90-day log retention" },
            { text: "Priority support", tooltip: "24h response SLA" },
            { text: "Advanced analytics & API access" },
            { text: "SSO (SAML)" },
        ],
        btn: { text: "Contact Sales", href: "mailto:lidorpahima28@gmail.com?subject=Professional%20plan%20inquiry", variant: "purple" as const },
    },
    {
        name: "Enterprise",
        info: "Large enterprises (500+)",
        price: { monthly: 0, yearly: 0 },
        customPrice: "Contact Sales",
        features: [
            { text: "Unlimited requests or custom volume" },
            { text: "Self-hosted option" },
            { text: "Custom ML models for detection" },
            { text: "Dedicated support (SLA)" },
            { text: "Custom integrations" },
            { text: "SOC2 / HIPAA compliance support" },
            { text: "Multi-region deployment" },
            { text: "Dedicated CSM" },
        ],
        btn: { text: "Contact Sales", href: "mailto:lidorpahima28@gmail.com?subject=Enterprise%20plan%20inquiry", variant: "default" as const },
    },
];

export const PRICING_FEATURES = [
    { text: "PII detection", tooltip: "Detect and redact API keys, credit cards, SSN" },
    { text: "Jailbreak & prompt injection", tooltip: "Block attacks before they reach the LLM" },
    { text: "Request volume", tooltip: "Included requests per month per plan" },
    { text: "Log retention", tooltip: "How long request logs are kept" },
    { text: "Community support", tooltip: "Discord and docs for Free tier" },
    { text: "Priority support", tooltip: "24h response SLA on paid tiers" },
    { text: "Custom policies", tooltip: "ChromaDB-backed rules on Professional+" },
];

export const WORKSPACE_LIMIT = 2;