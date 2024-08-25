import { db } from "@/app/db";
import Alert from "@/components/cards/Alert";
import Navbar from "@/components/Navbar";
import { InvestorGraph } from "@/components/svg/InvestorGraph";
import { columns } from "@/components/tables/investor-investment-table/columns";
import { DataTable } from "@/components/tables/investor-investment-table/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Bell, HandCoins } from "lucide-react";
import Link from "next/link";

export default async function Home() {

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const alerts = [
        {
            title: "15 dias de atraso no pagamento do ativo",
            description: "Término de contrato em 15 dias, favor verificar",
            type: "warning",
            dia: "Hoje"
        },
        {
            title: "1 mes para o vencimento",
            description: "Vencimento do contrato em 1 mes, favor verificar",
            type: "danger",
            dia: "2 dias atrás"
        },
    ]

    const randomIndices = Array.from({ length: 21 }, () => Math.floor(Math.random() * 2));

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
            <div className="w-full h-full flex flex-row gap-10 p-8">
                <div className="flex flex-col gap-8 w-full">
                    <h1 className="text-2xl font-semi">Dashboard</h1>
                    <div className="w-full flex flex-row gap-16">
                        <Card className="flex-1 p-4 h-48">
                            <CardTitle className="text-xl">
                                Total Investido
                            </CardTitle>
                            <CardContent className="flex flex-row justify-between items-center h-[90%]">
                                    <div className="flex-1 h-full pt-10 gap-8 text-3xl flex flex-col">
                                        <span>+12M <span className="text-sm text-gray-400">USDT</span></span>
                                        <span className="text-sm text-gray-400 flex flex-row gap-4">4 tokens <Badge className="bg-[#00B8AD] font-bold">+16%</Badge></span>
                                    </div>
                                    <svg width="155" height="60" viewBox="0 0 155 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 25.1366L21.5682 44.7048L54.1818 12.0911L98.9091 56.8184L152.955 2.77295" stroke="#00B8AD" stroke-width="3.72727" stroke-linecap="round"/>
                                    </svg>
                            </CardContent>
                        </Card>
                        <Card className="flex-1 p-4 h-48">
                            <CardTitle className="text-xl">
                                Pagamentos atrasados
                            </CardTitle>
                            <CardContent className="flex flex-row justify-between items-center h-[90%]">
                                <div className="flex-1 h-full pt-10 gap-8 text-3xl flex flex-col">
                                    <span>+12M <span className="text-sm text-gray-400">USDT</span></span>
                                    <span className="text-sm text-gray-400 flex flex-row gap-4">42 atrasos <Badge className="bg-[#B80042] font-bold text-white">-16%</Badge></span>
                                </div>
                                <svg width="155" height="48" viewBox="0 0 155 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 25.1366L21.5682 44.7048L54.1818 12.0911L98.9091 31.7729L152.955 2.77295" stroke="#B80042" stroke-width="3.72727" stroke-linecap="round"/>
                                </svg>
                            </CardContent>
                        </Card>
                        <Card className="flex-1 p-4 h-48">
                            <CardTitle className="text-xl">
                                Taxa de retorno
                            </CardTitle>
                            <CardContent className="flex flex-row justify-between items-center h-[90%]">
                                    <div className="flex-1 h-full pt-10 gap-8 text-3xl flex flex-col">
                                        <span>+12M <span className="text-sm text-gray-400">USDT</span></span>
                                        <span className="text-sm text-gray-400 flex flex-row gap-4">42 atrasos <Badge className="bg-[#B80042] font-bold text-white">-19%</Badge></span>
                                    </div>
                                    <svg width="155" height="48" viewBox="0 0 155 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 25.1366L21.5682 44.7048L54.1818 12.0911L98.9091 31.7729L152.955 2.77295" stroke="#B80042" stroke-width="3.72727" stroke-linecap="round"/>
                                    </svg>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="w-full flex flex-row gap-8 justify-between">
                        <Card className="p-4 w-full min-h-[300px]">
                            <CardTitle className="text-xl">
                                Investimentos recebidos
                            </CardTitle>
                            <CardContent className="flex flex-row justify-start items-center h-[90%] gap-24">
                                <div className="flex flex-col gap-4">
                                    <div className="flex-1 h-full pt-10 gap-8 text-3xl flex flex-col">
                                        <span>+12M <span className="text-sm text-gray-400">USDT</span></span>
                                        <span className="text-sm text-gray-400 flex flex-row gap-4">4 tokens <Badge className="bg-[#00B8AD] font-bold">+16%</Badge></span>
                                    </div>
                                    <div className="flex-1 h-full pt-10 gap-8 text-3xl flex flex-col">
                                        <span>+12M <span className="text-sm text-gray-400">USDT</span></span>
                                        <span className="text-sm text-gray-400 flex flex-row gap-4">42 atrasos <Badge className="bg-[#B80042] font-bold text-white">-19%</Badge></span>
                                    </div>
                                </div>
                                <InvestorGraph/>
                            </CardContent>
                        </Card>
                        <Card className="p-4 w-[25%] min-h-[300px]">
                            <CardTitle className="text-xl mb-4">
                                Invista em recebiveis
                            </CardTitle>
                            <CardDescription>
                                Transforme suas oportunidades em liquidez imediata! Tokenize seus recebíveis e acesse uma rede global de investidores. Facilite a antecipação de crédito e maximize o potencial do seu capital.
                            </CardDescription>
                            <CardContent className="flex flex-row justify-between items-center h-[90%]">
                                <Link href="/pages/investor/market" className="w-full">
                                <Button className="w-full flex flex-row gap-2">
                                    <HandCoins size={25}/> Buscar oportunidades
                                </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        {/* TODO: TABLE OF INVESTMENTS*/}
                        <DataTable columns={columns} data={investimentos.map((r) => {
                            return {
                                amountInvested: r.tokensBought,
                                name: r.recebivel?.name,
                                rentability: r.recebivel?.rentability,
                                moneyRaised: r.recebivel?.moneyRaised,
                                targetAmount: r.recebivel?.targetAmount,
                                dueDate: new Date(r.recebivel?.endDate).toLocaleDateString(),
                                status: r.recebivel?.status,
                                alerts: 4,
                            }
                        })}/>
                    </div>
                </div>
            </div>
        </div>
    );
}