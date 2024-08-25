import { db } from "@/app/db";
import { RecebivelInvestirCard } from "@/components/cards/RecebivelInvestir";
import Navbar from "@/components/Navbar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Status } from "@prisma/client";

export default async function Home() {

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const recebiveis = await db.recebivel.findMany({
        where: {
            status: Status.Aberto
        }
    });

    return (
        <div className="w-screen h-auto min-h-screen flex">
            <Navbar />
            <div className="w-full h-full flex flex-col gap-10 p-8">
                <div className="w-full flex flex-col justify-start gap-2">
                    <h1 className="text-2xl font-semi">Marketplace</h1>
                    <span className="text-gray-400">Encontre oportunidades de investimento</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
                    {recebiveis.map((recebivel) => (
                        <RecebivelInvestirCard recebivel={recebivel} key={recebivel.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}