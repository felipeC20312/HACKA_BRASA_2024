import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { privateProcedure, publicProcedure, router } from "./trpc"
import { TRPCError } from "@trpc/server";
import { db } from "@/app/db";
import { z } from 'zod'
import { Role, Status } from "@prisma/client";
import { create } from "domain";

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


        try {
            await db.user.update({
                where: {
                    id: userId,
                },
                data: {
                    role: Role.Investor,
                }
            })
        } catch (e) {
            return { success: false, error: e }
        }

        return { success: true }
    }),
    clientSetup: privateProcedure.input(z.object({
        cnpj: z.string().length(14),
        businessName: z.string().max(120),
        address: z.string().max(120),
        CEP: z.string().length(8),
        city: z.string().max(120),
        state: z.string().max(120),
        businessType: z.string(),
    })).mutation(async ({ctx, input}) => {
        const { userId } = ctx

        const dbUser = await db.user.findFirst({
            where: {
                id: userId,
            },
        });

        if (!dbUser) {
            throw new TRPCError({ code: 'NOT_FOUND' })
        }

        try {
            await db.user.update({
                where: {
                    id: userId,
                },
                data: {
                    role: Role.Client,
                    client: {
                        create: input
                    }
                }
            })
        } catch (e) {
            return { success: false, error: e }
        }

        return { success: true }
    }),
    createRecebivel: privateProcedure.input(z.object({
        name: z.string(),
        description: z.string(),
        targetAmount: z.number().positive(),
        rentability: z.number().positive(),
        paymentType: z.string(),
        endDate: z.union([z.coerce.date(), z.string()]),
        status: z.string(),
    })).mutation(async ({ctx, input}) => {
        const { userId } = ctx

        const dbUser = await db.user.findFirst({
            where: {
                id: userId,
            },
        });

        if (!dbUser) {
            throw new TRPCError({ code: 'NOT_FOUND' })
        }

        try {
            await db.recebivel.create({
                data: {
                    name: input.name,
                    description: input.description,
                    targetAmount: input.targetAmount,
                    rentability: input.rentability,
                    paymentType: input.paymentType,
                    startDate: new Date(),
                    endDate: new Date(input.endDate),
                    status: Status.Aberto,
                    ownerId: userId,
                    moneyRaised: 0,
                }
            })
        } catch (e) {
            return { success: false, error: e }
        }

        return { success: true }
    }),
    createInvestment: privateProcedure.input(z.object({
        amount: z.number().positive(),
        recebivelId: z.string(),
    })).mutation(async ({ctx, input}) => {
        const { userId } = ctx

        const dbUser = await db.user.findFirst({
            where: {
                id: userId,
            },
        });

        if (!dbUser) {
            throw new TRPCError({ code: 'NOT_FOUND' })
        }

        const recebivel = await db.recebivel.findFirst({
            where: {
                id: input.recebivelId,
            },
        });

        if (!recebivel) {
            throw new TRPCError({ code: 'NOT_FOUND' })
        }

        try {
            await db.contract.create({
                data: {
                    tokensBought: input.amount,
                    recebivelId: input.recebivelId,
                    investorId: userId,
                }
            })

            await db.recebivel.update({
                where: {
                    id: input.recebivelId,
                },
                data: {
                    moneyRaised: {
                        increment: input.amount
                    }
                }
            })
        } catch (e) {
            return { success: false, error: e }
        }

        return { success: true }
    }),
})

export type AppRouter = typeof appRouter