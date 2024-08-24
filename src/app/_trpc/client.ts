// import { AppRouter } from "@/trpc"
import { AppRouter } from "@/trpc/client"
import { createTRPCReact } from "@trpc/react-query"

export const trpc = createTRPCReact<AppRouter>({})