import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
UserButton

const SetupPage = () => {
    return (
        <div className="p-4">
            This is a protected route!
            <UserButton afterSignOutUrl="/" />
        </div >
    )
}

export default SetupPage;