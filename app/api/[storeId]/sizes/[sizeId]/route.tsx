import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, sizeId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { name, value } = body;

        // Return Unauthenticated if the User Id is not present
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        // Return Bad Request Response if the name is not present
        if (!name) {
            return new NextResponse("Name is Required", { status: 400 });
        }

        // Return Bad Request Response if the image URL is not present
        if (!value) {
            return new NextResponse("Image URL is Required", { status: 400 });
        }

        if (!params.sizeId) {
            return new NextResponse("Size id is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        // Unauthorized
        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        const size = await prismadb.size.update({
            where: {
                id: params.sizeId,
            },
            data: {
                name,
                value
            },
        });

        return NextResponse.json(size);
    } catch (error) {
        console.log("[SIZE_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { billboardId: string, storeId: string } }
) {
    try {
        const { userId } = auth();

        // Return Unauthenticated if the User Id is not present
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        // Return Unauthenticated if the User Id is not present
        if (!params.billboardId) {
            return new NextResponse("Billboard id is required", { status: 401 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        // Unauthorized
        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        const billboard = await prismadb.billboard.deleteMany({
            where: {
                id: params.billboardId,
            },
        });

        return NextResponse.json(billboard);
    } catch (error) {
        console.log("[BILLBOARD_DELETE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
    { params }: { params: { sizeId: string } }
) {
    try {
        // Return Unauthenticated if the User Id is not present
        if (!params.sizeId) {
            return new NextResponse("Size id is required", { status: 401 });
        }

        const size = await prismadb.size.findUnique({
            where: {
                id: params.sizeId,
            },
        });

        return NextResponse.json(size);
    } catch (error) {
        console.log("[SIZE_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
