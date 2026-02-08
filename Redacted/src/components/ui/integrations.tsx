"use client";

import { cn } from "@/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { LucideProps } from "lucide-react";
import React, { forwardRef, useRef } from "react";

const Circle = forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(
    function Circle({ className, children }, ref) {
        return (
            <div
                ref={ref}
                className={cn(
                    "z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
                    className,
                )}
            >
                {children}
            </div>
        );
    }
);

export function Integrations({
    className,
}: {
    className?: string;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const div1Ref = useRef<HTMLDivElement>(null);
    const div2Ref = useRef<HTMLDivElement>(null);
    const div3Ref = useRef<HTMLDivElement>(null);
    const div4Ref = useRef<HTMLDivElement>(null);
    const div5Ref = useRef<HTMLDivElement>(null);
    const div6Ref = useRef<HTMLDivElement>(null);
    const div7Ref = useRef<HTMLDivElement>(null);

    return (
        <div
            className={cn(
                "relative flex w-full max-w-[500px] items-center justify-center overflow-hidden rounded-lg border bg-background p-10 md:shadow-xl",
                className,
            )}
            ref={containerRef}
        >
            <div className="flex h-full w-full flex-row items-stretch justify-between gap-10">
                <div className="flex flex-col justify-center">
                <Circle ref={div7Ref}>
                        <Icons.user className="text-black" />
                    </Circle>

                </div>
                <div className="flex flex-col justify-center">
                    <Circle ref={div6Ref} className="h-16 w-16">
                        <Icons.openai className="h-6 w-6" />
                    </Circle>
                </div>
                <div className="flex flex-col justify-center gap-2">

                    <Circle ref={div1Ref}>
                        <Icons.googleDrive className="h-6 w-6" />
                    </Circle>
                    <Circle ref={div2Ref}>
                        <Icons.googleDocs className="h-6 w-6" />
                    </Circle>
                    <Circle ref={div3Ref}>
                        <Icons.whatsapp className="h-6 w-6" />
                    </Circle>
                    <Circle ref={div4Ref}>
                        <Icons.messenger className="h-6 w-6" />
                    </Circle>
                    <Circle ref={div5Ref}>
                        <Icons.notion className="h-6 w-6" />
                    </Circle>
                </div>
            </div>

            {/* AnimatedBeams */}
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div1Ref}
                toRef={div6Ref}
                duration={3}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div2Ref}
                toRef={div6Ref}
                duration={3}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div3Ref}
                toRef={div6Ref}
                duration={3}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div4Ref}
                toRef={div6Ref}
                duration={3}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div5Ref}
                toRef={div6Ref}
                duration={3}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div6Ref}
                toRef={div7Ref}
                duration={3}
            />
        </div>
    );
}

const Icons = {
    openai: (props: LucideProps) => (
        <img src="icons/logo.png" alt="OpenAI" />
    ),
    user: (props: LucideProps) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-user"
            {...props}
        >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    ),
    googleDrive: (props: LucideProps) => (
        <img src="https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/light/gemini-color.png" alt="Google Drive" />
    ),
    googleDocs: (props: LucideProps) => (
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/ChatGPT-Logo.svg/640px-ChatGPT-Logo.svg.png" alt="Google Docs" />
    ),
    whatsapp: (props: LucideProps) => (
        <img src="https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/light/claude-color.png" alt="WhatsApp" />
    ),
    messenger: (props: LucideProps) => (
        <img src="https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/light/openrouter.png" alt="Messenger" />
    ),
    notion: (props: LucideProps) => (
        <img src="https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/light/deepseek-color.png" alt="Notion" />
    ),
};
