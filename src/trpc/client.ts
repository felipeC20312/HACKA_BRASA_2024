import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { publicProcedure, router } from "./trpc"
import { TRPCError } from "@trpc/server";
import { db } from "@/app/db";

// TODO: User Type, how to determine on account creation?

export const appRouter = router({
    authCallback: publicProcedure.mutation(async () => {
        console.log("1")
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user?.id || !user?.email) {
            throw new TRPCError({ code: 'UNAUTHORIZED' })
        }

        console.log("2")

        // check if user in the db
        let dbUser = await db.user.findFirst({
            where: {
                id: user.id,
            },
        });

        console.log("3", dbUser)

        if (!dbUser) {
            await db.user.create({
                data: {
                    id: user.id,
                }
            })
        }

        dbUser = await db.user.findFirst({
            where: {
                id: user.id,
            },
        });

        console.log("4", dbUser)

        return { success: true, role: dbUser?.role }
    }),
})

export type AppRouter = typeof appRouter