import { db } from "@/app/db";
import { InvestmentCard } from "@/components/cards/Investment";
import Navbar from "@/components/Navbar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { HandCoins } from "lucide-react";
import Link from "next/link";

export default async function Home() {

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const investimentos = await db.contract.findMany({
        where: {
            investorId: user?.id
        },
        include: {
            recebivel: true
        }
    });

    return (
        <div className="w-screen h-auto min-h-screen flex">
            <Navbar />
            <div className="w-full h-full flex flex-col gap-10 p-8">
                <div className="w-full flex flex-row justify-between">
                    <h1 className="text-2xl font-semi">Investimentos</h1>

                    <Link href={'/pages/investor/market'} className="inline-block">
                        <span className="inline-flex flex-row gap-2 items-center border max-w-[300px] p-3 rounded-md bg-slate-100 border-black text-black hover:bg-white">
                            <HandCoins /> Novo Investimento
                        </span>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
                    {investimentos.map((investimento) => (
                        <InvestmentCard recebivel={investimento.recebivel} key={investimento.recebivel.id} investedAmount={investimento.tokensBought}/>
                    ))}
                </div>
            </div>
        </div>
    );
}