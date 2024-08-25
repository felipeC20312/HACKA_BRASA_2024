import { db } from "@/app/db"
import { getKindeServerSession, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server"
import { Role } from "@prisma/client"
import { Dumbbell, HandCoins, LayoutDashboard, LogOut, ShoppingCart } from "lucide-react"
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
                    <nav className="sticky top-0 w-24 h-screen bg-black border-r border-gray-800 p-4 flex flex-col justify-between items-center">
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
                        <LogoutLink>
                            <LogOut width={25}/>
                        </LogoutLink>
                    </nav>
                ) : dbUser?.role === Role.Investor ? (
                    <nav className="sticky top-0 w-24 h-screen bg-black border-r border-gray-800 p-4 flex flex-col justify-between items-center">
                        <div className="flex flex-col gap-8 items-center w-full">
                            <Dumbbell className="" width={25}/>
                            <Link   className="text-white hover:text-gray-200 p-1 border rounded-md hover:shadow hover:shadow-white"
                                    href="/pages/investor/dashboard">
                                <LayoutDashboard className="" width={25}/>
                            </Link>
                            
                            <Link   className="text-white hover:text-gray-200 p-1 border rounded-md hover:shadow hover:shadow-white"
                                    href="/pages/investor/investimentos">
                                <HandCoins className="" width={25}/>
                            </Link>
                            <Link   className="text-white hover:text-gray-200 p-1 border rounded-md hover:shadow hover:shadow-white"
                                    href="/pages/investor/market">
                                <ShoppingCart className="" width={25}/>
                            </Link>
                        </div>
                        <LogoutLink>
                            <LogOut width={25}/>
                        </LogoutLink>
                    </nav>
                ) : (
                    null
                )
            }
        </>
    )
}

export default Navbar;
