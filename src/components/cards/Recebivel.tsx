import { Recebivel } from "@prisma/client";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { BrainIcon } from "lucide-react";
import { Badge } from "../ui/badge";

export const RecebivelCard = ({ recebivel } : {recebivel: Recebivel}) => {
    return (
        <Card className="w-full h-[250px] p-4 shadow-sm shadow-gray-700">
            <CardTitle className="text-lg">
                <div className="w-full justify-between flex flex-row p-4">
                    <BrainIcon size={25}/>
                    <Badge>{recebivel.status || "No status"}</Badge>
                </div>
            </CardTitle>
            <CardContent>
                <span className="font-bold">{recebivel.name}</span>
                <div className="h-full w-full flex flex-col gap-2 pt-4">
                    <div className="flex flex-row justify-between border-b pb-4">
                        <span className="text-gray-500 text-sm">
                            Rentabilidade Alvo
                        </span>
                        <span className="text-gray-300 text-sm">
                            {recebivel.rentability}% por token
                        </span>
                    </div>
                    <div className="flex flex-row justify-between border-b pb-4">
                        <span className="text-gray-500 text-sm">
                            Pagamento
                        </span>
                        <span className="text-gray-300 text-sm">
                            {recebivel.paymentType}
                        </span>
                    </div>
                    <div className="flex flex-row justify-between pb-4">
                        <span className="text-gray-500 text-sm">
                            Data de vencimento
                        </span>
                        <span className="text-gray-300 text-sm">
                            {recebivel.endDate.toDateString()}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};