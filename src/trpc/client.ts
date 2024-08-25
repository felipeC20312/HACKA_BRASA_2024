import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { publicProcedure, router } from "./trpc"
import { TRPCError } from "@trpc/server";
import { db } from "@/app/db";

// TODO: User Type, how to determine on account creation?

export const appRouter = router({
    authCallback: publicProcedure.mutation(async () => {
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user?.id || !user?.email) {
            throw new TRPCError({ code: 'UNAUTHORIZED' })
        }

        // check if user in the db
        let dbUser = await db.user.findFirst({
            where: {
                id: user.id,
            },
        });

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

        return { success: true, role: dbUser?.role }
    }),
})

export type AppRouter = typeof appRouter