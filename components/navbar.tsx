import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "./main-nav";
import StoreSwitcher from "./store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { ThemeToggle } from "./theme-toggle";

const Navbar = async () => {
    const { userId } = auth();

    if (!userId) {
        redirect("/");
    }

    const stores = await prismadb.store.findMany({
        where: {
            userId,
        }
    })

    return (
        <div className="border-b">
            <div className="flex items-center h-16 px-4">
                <div>
                    <StoreSwitcher className="" items={stores} />
                </div>
                <div>
                    <MainNav className="mx-6" />
                </div>
                <div className="flex items-center ml-auto space-x-4">
                    <ThemeToggle />
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    );
}

export default Navbar;