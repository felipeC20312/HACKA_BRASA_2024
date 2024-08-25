import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { privateProcedure, publicProcedure, router } from "./trpc"
import { TRPCError } from "@trpc/server";
import { db } from "@/app/db";
import { z } from 'zod'
import { Role } from "@prisma/client";

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
    investorSetup: privateProcedure.mutation(async ({ctx}) => {

        const { userId } = ctx

        const dbUser = await db.user.findFirst({
            where: {
                id: userId,
            },
        });

        if (!dbUser) {
            throw new TRPCError({ code: 'NOT_FOUND' })
        }

        await db.user.update({
            where: {
                id: userId,
            },
            data: {
                role: Role.Investor,
            }
        })

        return { success: true }
    }),
})

export type AppRouter = typeof appRouter