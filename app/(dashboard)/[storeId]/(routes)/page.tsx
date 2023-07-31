import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
    params: {
        storeId: string
    }
}


const DashboardPage: React.FC<DashboardPageProps> = async ({
    params
}) => {
    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <Heading title="Dashboard" description="Overview of your store" />
                <Separator />
                <div className="grid grid-cols-3 gap-3"></div>
            </div>
        </div>
    );
}

export default DashboardPage;