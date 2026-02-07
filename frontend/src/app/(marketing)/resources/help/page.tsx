import { AnimationContainer, MaxWidthWrapper } from "@/components";
import { Button } from "@/components/ui/button";
import { MailIcon } from "lucide-react";

const SUPPORT_EMAIL = "lidorpahima28@gmail.com";

const HelpPage = () => {
    return (
        <MaxWidthWrapper className="flex flex-col items-center justify-center py-20 min-h-[60vh]">
            <AnimationContainer delay={0.1} className="w-full max-w-lg text-center">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold font-heading mt-6 !leading-tight">
                    Support
                </h1>
                <p className="text-base md:text-lg mt-6 text-muted-foreground">
                    Need help with the gateway, billing, or integration? Reach out and we’ll get back to you.
                </p>
                <Button asChild className="mt-8">
                    <a href={`mailto:${SUPPORT_EMAIL}?subject=Support%20request`} className="inline-flex items-center gap-2">
                        <MailIcon className="w-4 h-4" />
                        {SUPPORT_EMAIL}
                    </a>
                </Button>
            </AnimationContainer>
        </MaxWidthWrapper>
    );
};

export default HelpPage;
