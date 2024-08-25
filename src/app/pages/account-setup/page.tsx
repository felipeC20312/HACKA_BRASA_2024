'use client'

import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

// 2 steps, choose account type and then fill in the details.
export default function Home() {

    const router = useRouter()
    const {toast} = useToast()
    
    // Investor has no extra details
    const { mutate: investorSetup, isLoading: isLoadingInvestor } = trpc.investorSetup.useMutation({
        onSuccess: () => {
            router.push('/pages/investor/dashboard')
        },
        onError: (error) => {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.message,
            })
        },
    })

    // Client has another form to be filled

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <Card className="flex flex-col gap-8 p-6 min-w-64">
                <CardTitle className="text-white w-full text-center">
                    Tipo de usuário
                </CardTitle>
                <CardContent className="flex flex-col gap-4">
                    <Button onClick={() => investorSetup()}
                            disabled={isLoadingInvestor}>
                        {
                            isLoadingInvestor ? <Loader2 width={16} className="text-black animate-spin"/> : "Investidor"
                        }
                    </Button>
                    <Button onClick={()=>router.push('/pages/account-setup/client-setup')}>
                        Client
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}