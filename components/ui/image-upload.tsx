"use client"

import { useEffect, useState } from "react";

interface imageUploadProps {
    disabled?: boolean,
    onChange: (value: string) => void,
    onRemove: (value: string) => void,
    value: string[],
}

const ImageUpload: React.FC<imageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // If it is not mounted in server side return null
    if (!isMounted) {
        return null;
    }

    return (
        <div>Image Upload</div>
    )
}

export default ImageUpload;