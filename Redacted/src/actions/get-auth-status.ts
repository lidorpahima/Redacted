"use server";

import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

const getAuthStatus = async () => {
    const user = await currentUser();

    if (!user?.id || !user?.primaryEmailAddress?.emailAddress) {
        return { error: "User not found" };
    }

    let clerkId = user.id;

    const existingUser = await prisma.user.findFirst({
        where: {
            clerkId,
        },
    });

    console.log("existingUser", existingUser);

    if (!existingUser) {
        await prisma.user.create({
            data: {
                clerkId,
                email: user.primaryEmailAddress.emailAddress,
                name: user.fullName || user.firstName,
                image: user.imageUrl,
            },
        });
    }

    return { success: true };
};

export default getAuthStatus;
