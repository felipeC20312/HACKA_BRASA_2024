import { db } from "@/app/db";
import { RecebivelCard } from "@/components/cards/Recebivel";
import Navbar from "@/components/Navbar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { HandCoins } from "lucide-react";
import Link from "next/link";

export default async function Home() {

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const recebiveis = await db.recebivel.findMany({
        where: {
            ownerId: user?.id
        }
    });

    return (
        <div className="w-screen h-auto min-h-screen flex">
            <Navbar />
            <div className="w-full h-full flex flex-col gap-10 p-8">
                <div className="w-full flex flex-row justify-between">
                    <h1 className="text-2xl font-semi">Recebiveis</h1>

                    <Link href={'/pages/client/novo-recebivel'} className="inline-block">
                        <span className="inline-flex flex-row gap-2 items-center border max-w-[300px] p-3 rounded-md bg-slate-100 border-black text-black hover:bg-white">
                            <HandCoins /> Criar proposta de investimento
                        </span>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
                    {recebiveis.map((recebivel) => (
                        <RecebivelCard recebivel={recebivel} key={recebivel.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}