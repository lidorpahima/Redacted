/** LLM providers + Other for custom. */
export const LLM_PROVIDERS = [
    { id: "openai", name: "OpenAI" },
    { id: "anthropic", name: "Anthropic" },
    { id: "deepseek", name: "DeepSeek" },
    { id: "gemini", name: "Google Gemini" },
    { id: "openrouter", name: "OpenRouter" },
    { id: "grok", name: "Grok (xAI)" },
    { id: "mistral", name: "Mistral AI" },
    { id: "cohere", name: "Cohere" },
    { id: "meta", name: "Meta AI" },
    { id: "together", name: "Together AI" },
    { id: "other", name: "Other" },
] as const;

export type ProviderId = (typeof LLM_PROVIDERS)[number]["id"];

export const PROVIDER_IDS = LLM_PROVIDERS.map((p) => p.id);
export const IS_OTHER = "other";

/** Quick-pick suggestions per provider. Dynamic list comes from OpenRouter API (useModelList). */
export const MODELS_BY_PROVIDER: Record<string, { id: string; label: string }[]> = {
    openai: [
        { id: "gpt-4o", label: "GPT-4o (Latest)" },
        { id: "gpt-4o-mini", label: "GPT-4o Mini (Fast & Cheap)" },
        { id: "o1", label: "o1 (Reasoning)" },
        { id: "o1-mini", label: "o1 Mini (Fast Reasoning)" },
        { id: "o3-mini", label: "o3 Mini (New Reasoning)" },
        { id: "gpt-4-turbo", label: "GPT-4 Turbo (Legacy)" },
    ],
    anthropic: [
        { id: "claude-sonnet-4-20250514", label: "Claude Sonnet 4 (Latest)" },
        { id: "claude-opus-4-5-20251101", label: "Claude Opus 4.5 (Premium)" },
        { id: "claude-haiku-4-5-20251001", label: "Claude Haiku 4.5 (Fast)" },
        { id: "claude-3-5-sonnet-20241022", label: "Claude 3.5 Sonnet (Legacy)" },
    ],
    deepseek: [
        { id: "deepseek-chat", label: "DeepSeek V3 (Latest)" },
        { id: "deepseek-reasoner", label: "DeepSeek R1 (Reasoning)" },
        { id: "deepseek-coder", label: "DeepSeek Coder V2" },
    ],
    gemini: [
        { id: "gemini-2.5-pro-exp-0205", label: "Gemini 2.5 Pro (Preview)" },
        { id: "gemini-2.0-flash-exp", label: "Gemini 2.0 Flash (Preview)" },
        { id: "gemini-1.5-pro-002", label: "Gemini 1.5 Pro (Stable)" },
        { id: "gemini-1.5-flash-002", label: "Gemini 1.5 Flash (Fast)" },
    ],
    openrouter: [
        { id: "deepseek/deepseek-r1", label: "DeepSeek R1 (Reasoning)" },
        { id: "anthropic/claude-sonnet-4", label: "Claude Sonnet 4" },
        { id: "meta-llama/llama-3.3-70b-instruct", label: "Llama 3.3 70B" },
        { id: "google/gemini-2.5-pro-exp-0205", label: "Gemini 2.5 Pro" },
        { id: "openai/gpt-4o", label: "GPT-4o" },
        { id: "qwen/qwen-2.5-72b-instruct", label: "Qwen 2.5 72B" },
    ],
    grok: [
        { id: "grok-2-1212", label: "Grok 2 (Latest)" },
        { id: "grok-2-vision-1212", label: "Grok 2 Vision" },
        { id: "grok-beta", label: "Grok Beta" },
    ],
    mistral: [
        { id: "mistral-large-latest", label: "Mistral Large 2 (Latest)" },
        { id: "pixtral-large-latest", label: "Pixtral Large (Vision)" },
        { id: "codestral-latest", label: "Codestral (Code)" },
        { id: "ministral-8b-latest", label: "Ministral 8B (Fast)" },
        { id: "ministral-3b-latest", label: "Ministral 3B (Edge)" },
    ],
    cohere: [
        { id: "command-r-plus-08-2024", label: "Command R+ (Latest)" },
        { id: "command-r-08-2024", label: "Command R" },
        { id: "command-light", label: "Command Light (Fast)" },
    ],
    meta: [
        { id: "meta-llama/Llama-3.3-70B-Instruct", label: "Llama 3.3 70B (Latest)" },
        { id: "meta-llama/Llama-3.2-90B-Vision-Instruct", label: "Llama 3.2 90B Vision" },
        { id: "meta-llama/Llama-3.2-11B-Vision-Instruct", label: "Llama 3.2 11B Vision" },
        { id: "meta-llama/Llama-3.2-3B-Instruct", label: "Llama 3.2 3B (Fast)" },
        { id: "meta-llama/Llama-3.2-1B-Instruct", label: "Llama 3.2 1B (Edge)" },
    ],
    together: [
        { id: "meta-llama/Llama-3.3-70B-Instruct-Turbo", label: "Llama 3.3 70B Turbo" },
        { id: "Qwen/Qwen2.5-72B-Instruct-Turbo", label: "Qwen 2.5 72B Turbo" },
        { id: "deepseek-ai/DeepSeek-R1", label: "DeepSeek R1 (Reasoning)" },
        { id: "mistralai/Mistral-7B-Instruct-v0.3", label: "Mistral 7B v0.3" },
        { id: "NousResearch/Hermes-3-Llama-3.1-8B", label: "Hermes 3 (8B)" },
    ],
};