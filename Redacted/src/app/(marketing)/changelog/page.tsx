import { AnimationContainer, MaxWidthWrapper } from "@/components";
import { Button } from "@/components/ui/button";
import { MailIcon } from "lucide-react";

const CONTACT_EMAIL = "lidorpahima28@gmail.com";

const ChangelogPage = () => {
    return (
        <MaxWidthWrapper className="flex flex-col items-center justify-center py-20 min-h-[60vh]">
            <AnimationContainer delay={0.1} className="w-full max-w-lg text-center">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold font-heading mt-6 !leading-tight">
                    Changelog
                </h1>
                <p className="text-base md:text-lg mt-6 text-muted-foreground">
                    Stay up to date with the latest changes to our platform. Release notes and product updates will be published here.
                </p>
                <p className="text-sm text-muted-foreground mt-8">
                    No releases yet. Questions or feedback?
                </p>
                <Button asChild variant="outline" className="mt-4">
                    <a href={`mailto:${CONTACT_EMAIL}?subject=Changelog%20feedback`} className="inline-flex items-center gap-2">
                        <MailIcon className="w-4 h-4" />
                        Contact us
                    </a>
                </Button>
            </AnimationContainer>
        </MaxWidthWrapper>
    );
};

export default ChangelogPage;
