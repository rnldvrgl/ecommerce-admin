"use client";

import { Modal } from "@/components/ui/modal";
import { UserButton } from "@clerk/nextjs";
UserButton

const SetupPage = () => {
    return (
        <div className="p-4">
            {/* <UserButton afterSignOutUrl="/" /> */}
            <Modal title="test" description="test desc" isOpen onClose={() => { }} >
                Children
            </Modal>
        </div >
    )
}

export default SetupPage;