"use client";

import { useQuery } from "@tanstack/react-query";

const OPENROUTER_MODELS_URL = "https://openrouter.ai/api/v1/models";

export interface ModelOption {
    id: string;
    label: string;
}

interface OpenRouterModel {
    id: string;
    name: string;
    context_length?: number;
}

/**
 * Fetches model list from OpenRouter's public API (community-maintained, 300+ models).
 * Cache 24h — model list doesn't change every minute.
 * When provider is set we filter by provider prefix (e.g. openai -> openai/gpt-4o);
 * "openrouter" and "other" get the full list for search/suggestions.
 */
export function useModelList(providerId: string | null) {
    return useQuery({
        queryKey: ["openrouter-models", providerId],
        queryFn: async (): Promise<ModelOption[]> => {
            const res = await fetch(OPENROUTER_MODELS_URL);
            if (!res.ok) throw new Error("Failed to fetch models");
            const json = await res.json();
            const allModels: OpenRouterModel[] = json.data ?? [];

            // OpenRouter: return all (ids like openai/gpt-4o, anthropic/claude-3.5-sonnet)
            if (providerId === "openrouter" || providerId === "other" || !providerId) {
                return allModels.map((m) => ({ id: m.id, label: m.name || m.id }));
            }

            // Filter by provider: id is "provider/model" (e.g. openai/gpt-4o)
            const prefix = providerId.toLowerCase() + "/";
            const byPrefix = allModels.filter((m) =>
                m.id.toLowerCase().startsWith(prefix)
            );
            if (byPrefix.length > 0) {
                return byPrefix.map((m) => ({ id: m.id, label: m.name || m.id }));
            }

            // Fallback: match provider name in id or label
            return allModels
                .filter(
                    (m) =>
                        m.id.toLowerCase().includes(providerId!.toLowerCase()) ||
                        (m.name && m.name.toLowerCase().includes(providerId!.toLowerCase()))
                )
                .map((m) => ({ id: m.id, label: m.name || m.id }));
        },
        staleTime: 1000 * 60 * 60 * 24, // 24h
        enabled: !!providerId,
    });
}

const PROVIDERS_WITH_LIST_API = new Set(["gemini", "openai"]);

/**
 * Fetches model list from the provider's ListModels API using the user's API key.
 * Returns only models that actually exist for that provider (e.g. Gemini, OpenAI).
 * Use when user has entered their API key so we show a valid list.
 */
export function useProviderModels(providerId: string | null, customerApiKey: string) {
    const hasKey = Boolean(customerApiKey?.trim());
    const enabled = !!providerId && hasKey && PROVIDERS_WITH_LIST_API.has(providerId);
    return useQuery({
        queryKey: ["provider-models", providerId, hasKey ? "with-key" : "no-key"],
        queryFn: async (): Promise<ModelOption[]> => {
            const res = await fetch("/api/dashboard/list-models", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    provider: providerId,
                    customerApiKey: customerApiKey.trim(),
                }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) return [];
            return data.models ?? [];
        },
        staleTime: 1000 * 60 * 5, // 5 min
        enabled,
    });
}
