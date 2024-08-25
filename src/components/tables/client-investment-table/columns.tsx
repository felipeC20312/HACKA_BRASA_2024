"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

export type Recebiveis = {
    name: string,
    targetAmount: number,
    rentability: number,
    moneyRaised: number,
    dueDate: string,
    status: string,
    alerts: number,
}


export const columns: ColumnDef<Recebiveis>[] = [
    {
        accessorKey: "name",
        header: ({column}) => {
            return (
                <div className="flex flex-row justify-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Name
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        
        },
        cell: ({ row }) => {
            const name: boolean = row.getValue("name")
            return <div className="text-center">{name}</div>
        }
    },
    {
        accessorKey: "targetAmount",
        header: ({column}) => {
            return (
                <div className="flex flex-row justify-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Target amount
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        
        },
        cell: ({ row }) => {
            const targetAmount: boolean = row.getValue("targetAmount")
            return <div className="text-center">{targetAmount}</div>
        }
    },
    {
        accessorKey: "rentability",
        header: ({column}) => {
            return (
                <div className="flex flex-row justify-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Rentability
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        
        },
        cell: ({ row }) => {
            const rentability: boolean = row.getValue("rentability")
            return <div className="text-center">{rentability}</div>
        }
    },
    {
        accessorKey: "moneyRaised",
        header: ({column}) => {
            return (
                <div className="flex flex-row justify-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Amount raised
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        
        },
        cell: ({ row }) => {
            const amountRaised: boolean = row.getValue("moneyRaised")
            return <div className="text-center">{amountRaised}</div>
        }
    },
    {
        accessorKey: "status",
        header: ({column}) => {
            return (
                <div className="flex flex-row justify-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Status
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        
        },
        cell: ({ row }) => {
            const status: boolean = row.getValue("status")
            return <div className="text-center">{status}</div>
        }
    },
    {
        accessorKey: "alerts",
        header: ({column}) => {
            return (
                <div className="flex flex-row justify-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Alerts
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        
        },
        cell: ({ row }) => {
            const alerts: boolean = row.getValue("alerts")
            return <div className="text-center">{alerts}</div>
        }
    },
]
