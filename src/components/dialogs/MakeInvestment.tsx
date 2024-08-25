import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { HandCoins } from "lucide-react"
import { Recebivel } from "@prisma/client"
import CreateInvestmentForm from "../forms/CreateInvestmentForm"

export const MakeInvestment = ({recebivel} : {recebivel: Recebivel}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full">
                    <HandCoins size={25}/> Investir
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Investindo em {recebivel.name}</DialogTitle>
                    <DialogDescription>
                        Esta ação é irreversível. Prossiga somente se tiver certeza que deseja investir.
                    </DialogDescription>
                </DialogHeader>
                <CreateInvestmentForm recebivelId={recebivel.id}/>
            </DialogContent>
        </Dialog>
    )
}