import { AnimationContainer, MaxWidthWrapper } from "@/components";
import { Button } from "@/components/ui/button";
import { MailIcon, ShieldCheckIcon } from "lucide-react";

const ENTERPRISE_EMAIL = "lidorpahima28@gmail.com";

const EnterprisePage = () => {
    return (
        <MaxWidthWrapper className="flex flex-col items-center justify-center py-20 min-h-[60vh]">
            <AnimationContainer delay={0.1} className="w-full max-w-xl text-center">
                <div className="flex justify-center mb-6">
                    <ShieldCheckIcon className="w-14 h-14 text-muted-foreground" />
                </div>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold font-heading mt-4 !leading-tight">
                    Enterprise
                </h1>
                <p className="text-base md:text-lg mt-6 text-muted-foreground">
                    Custom volume, self-hosted options, dedicated support, and compliance (SOC2/HIPAA). Get in touch to discuss your needs.
                </p>
                <Button asChild className="mt-8">
                    <a href={`mailto:${ENTERPRISE_EMAIL}?subject=Enterprise%20inquiry`} className="inline-flex items-center gap-2">
                        <MailIcon className="w-4 h-4" />
                        Contact Sales
                    </a>
                </Button>
            </AnimationContainer>
        </MaxWidthWrapper>
    );
};

export default EnterprisePage;
