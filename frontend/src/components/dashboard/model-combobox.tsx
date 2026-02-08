"use client";

import { useMemo, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils";
import { useModelList, useProviderModels, type ModelOption } from "@/hooks/use-models";
import { MODELS_BY_PROVIDER } from "@/utils/constants/providers";

export interface ModelComboboxProps {
    provider: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    id?: string;
    /** When set, we call ListModels for this provider so the dropdown shows only valid models (Gemini/OpenAI). */
    customerApiKey?: string;
    /** When true, show loading state and merge with static list only (no API). */
    disabled?: boolean;
}

/**
 * Hybrid selection: suggest models from static list + OpenRouter API;
 * user can pick from list or type a custom model (via "Use custom" when not found).
 */
export function ModelCombobox({
    provider,
    value,
    onChange,
    placeholder = "Select or type model...",
    id,
    customerApiKey = "",
    disabled,
}: ModelComboboxProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const { data: providerModels, isLoading: loadingProvider } = useProviderModels(
        disabled ? null : provider || null,
        customerApiKey
    );
    const { data: dynamicModels, isLoading: loadingOpenRouter } = useModelList(
        disabled ? null : provider || null
    );

    // Priority: ListModels from provider (real list) > static > OpenRouter. Dedupe by id so provider list wins.
    const allOptions = useMemo(() => {
        const byId = new Map<string, ModelOption>();
        const staticList = provider ? MODELS_BY_PROVIDER[provider] ?? [] : [];
        (providerModels ?? []).forEach((m) => byId.set(m.id, m));
        staticList.forEach((m) => byId.set(m.id, m));
        (dynamicModels ?? []).forEach((m) => byId.set(m.id, m));
        return Array.from(byId.values());
    }, [provider, providerModels, dynamicModels]);

    const isLoading = loadingProvider || loadingOpenRouter;

    const filtered = useMemo(() => {
        if (!search.trim()) return allOptions;
        const q = search.trim().toLowerCase();
        return allOptions.filter(
            (m) =>
                m.id.toLowerCase().includes(q) || m.label.toLowerCase().includes(q)
        );
    }, [allOptions, search]);

    const displayLabel =
        allOptions.find((m) => m.id === value)?.label ?? (value || placeholder);

    return (
        <div className="space-y-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id={id}
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between font-normal"
                    >
                        <span className="truncate">
                            {value ? displayLabel : placeholder}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0" align="start">
                    <Command shouldFilter={false} className="rounded-lg border-0">
                        <div className="flex items-center border-b border-border px-2">
                            <Input
                                placeholder="Search model..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="h-10 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                        </div>
                        <CommandList>
                            <CommandEmpty>
                                {search.trim() ? (
                                    <div className="py-4 px-2 text-center">
                                        <p className="text-sm text-muted-foreground mb-2">
                                            Not in list? Use your own model ID.
                                        </p>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="w-full"
                                            onClick={() => {
                                                onChange(search.trim());
                                                setOpen(false);
                                                setSearch("");
                                            }}
                                        >
                                            Use &quot;{search.trim()}&quot;
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="py-6 text-center text-sm text-muted-foreground">
                                        {isLoading
                                            ? "Loading models..."
                                            : "Type to search or add a custom model."}
                                    </div>
                                )}
                            </CommandEmpty>
                            <CommandGroup heading="Models">
                                {filtered.slice(0, 100).map((m) => (
                                    <CommandItem
                                        key={m.id}
                                        value={m.id}
                                        onSelect={() => {
                                            onChange(m.id);
                                            setOpen(false);
                                            setSearch("");
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === m.id ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        <span className="truncate">{m.label}</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <p className="text-xs text-muted-foreground">
                {customerApiKey && (provider === "gemini" || provider === "openai")
                    ? "List from your API; you can also type a model ID manually."
                    : "We send requests to this model on your behalf and run security checks first."}
            </p>
        </div>
    );
}
