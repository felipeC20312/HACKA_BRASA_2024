import { z } from 'zod'

export const ClientSetupFormSchema = z.object({
    cnpj: z.string().length(14, {"message" : "O CNPJ deve ter 14 caracteres"}),
    businessName: z.string().max(120),
    address: z.string().max(120),
    CEP: z.string().length(8, {"message" : "O CEP deve ter 8 caracteres"}),
    city: z.string().max(120),
    state: z.string().max(120),
    businessType: z.string(),
})

export const RecebiveisSchema = z.object({
    name: z.string(),
    targetAmount: z.number().positive(),
    rentability: z.number().positive(),
    amountRaised: z.number().positive(),
    dueDate: z.string(),
    status: z.string(),
    alerts: z.number(),
})