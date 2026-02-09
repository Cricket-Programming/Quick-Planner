import { auth } from "@/auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";

export async function createTrip(formData: FormData) {

    const session = await auth();

    // basically error handling!
    if (!session || !session.user?.id) {
        throw new Error("Not Authenticated.");
    }

    // ? is the optional chaining operator; it says that if formData.get() is null, stop and make title undefined. 

    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const startDateStr = formData.get("startDate")?.toString();
    const endDateStr = formData.get("endDate")?.toString();

    // any of these are null
    if (!title || !description || !startDateStr || !endDateStr) {
        throw new Error("All fields are required.");
    }

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    await prisma.trip.create({
        data: {
            title,
            description,
            startDate,
            endDate,
            userId: session.user.id,
        },
    });

    redirect("/trips");
}