"use client"

import { StoreModal } from "@/components/modals/store-modal";

import { useEffect, useState } from "react"

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // If it is not mounted in server side return null
    if (!isMounted) {
        return null;
    }

    return (
        <>
            <StoreModal />
        </>
    )
}