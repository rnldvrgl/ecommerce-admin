"use client"

import { Store } from "@prisma/client"

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface SettingsFormProps {
    initialData: Store;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({
    initialData
}) => {
    return (
        <div className="flex items-center justify-between">
            <Heading
                title="Settings"
                description="Manage store preferences"
            />
            <Button
                variant="destructive"
                size="sm"
                onClick={() => { }}
            >
                <Trash className="h-4 w-4" />
            </Button>
        </div>
    )
}