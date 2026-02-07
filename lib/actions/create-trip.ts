export async function createTrip(formData: FormData) {

    const session = await auth();
    if (!session) {
        throw new Error("Not Authenticated.");
    }
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

    await prisma.trip.create(   
        data: {
            title,
            description,
            startDate,
            endDate,
            userId: session.user?.id
        }
    })

    // ? is the optional chaining operator; it says that if formData.get() is null, stop and make title undefined.
    //  If not, set the value for title as  . 
}