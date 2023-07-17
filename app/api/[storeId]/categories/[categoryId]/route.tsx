import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, categoryId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { name, billboardId } = body;

        // Return Unauthenticated if the User Id is not present
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        // Return Bad Request Response if the Name is not present
        if (!name) {
            return new NextResponse("Name is Required", { status: 400 });
        }

        // Return Bad Request Response if the Billboard id is not present
        if (!billboardId) {
            return new NextResponse("Billboard id is Required", { status: 400 });
        }

        if (!params.categoryId) {
            return new NextResponse("Category id is required", { status: 400 });
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

        const category = await prismadb.category.update({
            where: {
                id: params.categoryId,
            },
            data: {
                name,
                billboardId
            },
        });

        return NextResponse.json(category);
    } catch (error) {
        console.log("[CATEGORY_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { categoryId: string, storeId: string } }
) {
    try {
        const { userId } = auth();

        // Return Unauthenticated if the User Id is not present
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        // Return Unauthenticated if the User Id is not present
        if (!params.categoryId) {
            return new NextResponse("Category id is required", { status: 401 });
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

        const category = await prismadb.category.deleteMany({
            where: {
                id: params.categoryId,
            },
        });

        return NextResponse.json(category);
    } catch (error) {
        console.log("[CATEGORY_DELETE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
    { params }: { params: { categoryId: string } }
) {
    try {
        // Return Unauthenticated if the User Id is not present
        if (!params.categoryId) {
            return new NextResponse("Category id is required", { status: 401 });
        }

        const category = await prismadb.category.findUnique({
            where: {
                id: params.categoryId,
            },
        });

        return NextResponse.json(category);
    } catch (error) {
        console.log("[CATEGORY_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
