import { db } from "@/app/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { Role } from "@prisma/client"
import { Dumbbell, HandCoins, LayoutDashboard } from "lucide-react"
import Link from "next/link";

const Navbar = async () => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    const dbUser = await db.user.findFirst({
        where: {
            id: user?.id
        },
    })

    return (
        <>
            {
                dbUser?.role === Role.Client ? (
                    <nav className="sticky top-0 w-24 h-screen bg-black border-r border-gray-800 p-4">
                        <div className="flex flex-col gap-8 items-center w-full">
                            <Dumbbell className="" width={25}/>
                            <Link   className="text-white hover:text-gray-200 p-1 border rounded-md hover:shadow hover:shadow-white"
                                    href="/pages/client/dashboard">
                                <LayoutDashboard className="" width={25}/>
                            </Link>
                            <Link   className="text-white hover:text-gray-200 p-1 border rounded-md hover:shadow hover:shadow-white"
                                    href="/pages/client/recebiveis">
                                <HandCoins className="" width={25}/>
                            </Link>
                        </div>
                    </nav>
                ) : dbUser?.role === Role.Investor ? (
                    <nav className="sticky top-0 w-24 h-screen bg-gray-200 border-r border-gray-400 p-4">
                        <ul className="space-y-4">
                            <li className="text-gray-700 hover:text-green-600">Investor Dashboard</li>
                            <li className="text-gray-700 hover:text-green-600">Portfolio</li>
                            <li className="text-gray-700 hover:text-green-600">Reports</li>
                        </ul>
                    </nav>
                ) : (
                    null
                )
            }
        </>
    )
}

export default Navbar;
