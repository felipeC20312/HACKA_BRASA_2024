"use client";

// Makes the link between DB user and authenticated user.

import { notFound, useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";
import { Loader2 } from "lucide-react";
import { Suspense, useEffect } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Role } from "@prisma/client";

const Page = () => {
    const router = useRouter();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PageContent router={router} />
        </Suspense>
    );
};


const PageContent = ({router} : {router: AppRouterInstance}) => {
    const searchParams = useSearchParams()
    const origin = searchParams.get('origin')

    const { mutate: authCallback } = trpc.authCallback.useMutation({
        onSuccess: (data) => {
            console.log("Success", data)
            if (data?.success && data?.role === Role.None) {
                router.refresh()
                router.push('/account-setup')
            } else if (data?.success && data?.role === Role.Client) {
                router.push('/client/dashboard')
            } else if (data?.success && data?.role === Role.Investor) {
                router.push('/investor/dashboard')
            } else {
                notFound()
            }
        },
        onError: (error) => {
            // TODO: Better error handling
            console.log("Error", error)
            notFound()
        },
    })

    // Run once on page load
    useEffect(() => {
        authCallback()
    }, [])

    return (
        <div className='w-full mt-24 flex justify-center'>
            <div className="flex flex-col items-center gap-2">
                <Loader2 className="animate-spin w-12 h-12" color="#0066FF" />
                <h3 className="font-semibold text-xl">Setting up your account...</h3>
            </div>
        </div>
    )
}

export default Page;