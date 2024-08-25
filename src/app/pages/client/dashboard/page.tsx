import { db } from "@/app/db";
import Alert from "@/components/cards/Alert";
import Navbar from "@/components/Navbar";
import { columns, Recebiveis } from "@/components/tables/client-investment-table/columns";
import { DataTable } from "@/components/tables/client-investment-table/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Bell, HandCoins } from "lucide-react";

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

    const recebiveis = await db.recebivel.findMany({
        where: {
            ownerId: user?.id
        }
    });

    return (
        <div className="w-screen h-auto min-h-screen flex">
            <Navbar />
            <div className="w-full h-full flex flex-row gap-10 p-8">
                <div className="w-[65%] flex flex-col gap-8">
                    <h1 className="text-2xl font-semi">Dashboard</h1>
                    <Card className="w-full p-6 flex flex-col gap-2">
                        <CardTitle className="text-xl">
                            Tokenize seus recebíveis agora
                        </CardTitle>
                        <CardDescription className="max-w-[70%]">
                            Transforme suas oportunidades em liquidez imediata! Tokenize seus recebíveis e acesse uma rede global de investidores. Facilite a antecipação de crédito e maximize o potencial do seu capital.
                        </CardDescription>
                        <CardContent className="pt-4">
                            <Button>
                                <span className="flex flex-row gap-2 justify-start items-start">
                                    <HandCoins/> Criar proposta de investimento
                                </span>
                            </Button>
                        </CardContent>
                    </Card>
                    <div className="w-full flex flex-row gap-8">
                        <Card className="flex-1 p-4 h-48">
                            <CardTitle className="text-xl">
                                Investimentos recebidos
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
                    </div>
                    <div>
                        {/* TODO: TABLE OF INVESTMENTS*/}
                        <DataTable columns={columns} data={recebiveis.map((r) => {
                            return {
                                ...r,
                                dueDate: new Date(r.endDate).toLocaleDateString(),
                                alerts: 2,
                            }
                        })}/>
                    </div>
                </div>
                <div className="w-[35%] flex flex-col gap-4">
                    <Input type="text" placeholder="Escreva algo aqui..." className="bg-black text-white"/>
                    <div className="flex-col w-full h-max rounded-md border border-gray-600 bg-[#27272A]">
                        <div className="w-full bg-transparent p-4">
                            <span className="flex flex-row gap-2 text-lg items-center"><Bell/> Alertas</span>
                            <span className="text-sm text-gray-400">21 em aberto</span>
                        </div>
                        <ScrollArea className="w-full h-[720px] bg-[#09090B] p-4">
                            <div className="flex flex-col gap-4">
                                {randomIndices.map((randomIndex, i) => (
                                    <Alert
                                        key={i}
                                        title={alerts[randomIndex].title}
                                        description={alerts[randomIndex].description}
                                        dia={alerts[randomIndex].dia}
                                        type={alerts[randomIndex].type}
                                    />
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </div>
    );
}