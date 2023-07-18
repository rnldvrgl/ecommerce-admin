import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, colorId: string } }
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

        if (!params.colorId) {
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

        const color = await prismadb.color.update({
            where: {
                id: params.colorId,
            },
            data: {
                name,
                value
            },
        });

        return NextResponse.json(color);
    } catch (error) {
        console.log("[COLOR_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { colorId: string, storeId: string } }
) {
    try {
        const { userId } = auth();

        // Return Unauthenticated if the User Id is not present
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        // Return Unauthenticated if the User Id is not present
        if (!params.colorId) {
            return new NextResponse("Color id is required", { status: 401 });
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

        const color = await prismadb.color.deleteMany({
            where: {
                id: params.colorId,
            },
        });

        return NextResponse.json(color);
    } catch (error) {
        console.log("[COLOR_DELETE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
    { params }: { params: { colorId: string } }
) {
    try {
        // Return Unauthenticated if the User Id is not present
        if (!params.colorId) {
            return new NextResponse("Color id is required", { status: 401 });
        }

        const color = await prismadb.color.findUnique({
            where: {
                id: params.colorId,
            },
        });

        return NextResponse.json(color);
    } catch (error) {
        console.log("[COLOR_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
