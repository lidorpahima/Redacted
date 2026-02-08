import { AnimationContainer, MaxWidthWrapper } from "@/components";
import { BentoCard, BentoGrid, CARDS } from "@/components/ui/bento-grid";
import MagicBadge from "@/components/ui/magic-badge";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function FeaturesPage() {
    return (
        <div className="overflow-x-hidden scrollbar-hide size-full">
            <MaxWidthWrapper className="pt-10 pb-20">
                <AnimationContainer delay={0.1}>
                    <div className="flex flex-col w-full items-center justify-center py-8">
                        <MagicBadge title="Features" />
                        <h1 className="text-center text-3xl md:text-5xl !leading-[1.1] font-medium font-heading text-foreground mt-6">
                            Four reasons enterprises trust us
                        </h1>
                        <p className="mt-4 text-center text-lg text-muted-foreground max-w-lg">
                            We don’t just proxy requests—we protect data, enforce your rules, speed up answers, and block attacks before they reach the LLM.
                        </p>
                    </div>
                </AnimationContainer>
                <AnimationContainer delay={0.2}>
                    <BentoGrid className="py-8">
                        {CARDS.map((feature, idx) => (
                            <BentoCard key={idx} {...feature} />
                        ))}
                    </BentoGrid>
                </AnimationContainer>
                <AnimationContainer delay={0.3} className="flex justify-center pt-8">
                    <Button asChild>
                        <Link href="/pricing" className="flex items-center gap-2">
                            See pricing
                            <ArrowRightIcon className="w-4 h-4" />
                        </Link>
                    </Button>
                </AnimationContainer>
            </MaxWidthWrapper>
        </div>
    );
}
