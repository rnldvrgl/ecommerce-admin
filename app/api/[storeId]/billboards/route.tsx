import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		const { userId } = auth();
		const body = await req.json();

		const { label, imageUrl } = body;

		// Unauthorized
		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		// Bad Request
		if (!label) {
			return new NextResponse("Name is required", { status: 400 });
		}

		if (!imageUrl) {
			return new NextResponse("Image URL is required", { status: 400 });
		}

		if (!params.storeId) {
			return new NextResponse("Store ID is required", { status: 400 });
		}

		const billboard = await prismadb.billboard.create({
			data: {
				label,
				imageUrl,
				storeId: params.storeId,
			},
		});

		return NextResponse.json(billboard);
	} catch (error) {
		console.log("[BILLBOARDS_POST]", error);

		// Internal Server Error
		return new NextResponse("Internal error", { status: 500 });
	}
}
