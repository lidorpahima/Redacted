"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useClerk } from "@clerk/nextjs";
import { LogOutIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DashboardNavbar = () => {
    const { user, signOut } = useClerk();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        router.push("/");
    };

    return (
        <header className="flex items-center justify-between h-14 border-b border-border px-4 lg:px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shrink-0">
            <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                    Dashboard
                </span>
            </div>
            <div className="flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="gap-2">
                            <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center">
                                <UserIcon className="h-3.5 w-3.5 text-primary" />
                            </div>
                            <span className="text-sm font-medium max-w-[120px] truncate hidden sm:block">
                                {user?.firstName ?? user?.emailAddresses?.[0]?.emailAddress ?? "Account"}
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem asChild>
                            <Link href="/" className="cursor-pointer">
                                Back to site
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive">
                            <LogOutIcon className="mr-2 h-4 w-4" />
                            Sign out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

export default DashboardNavbar;
