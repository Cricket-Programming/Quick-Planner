import { auth } from  "@/auth";

export default async function TripsPage() {
    const session = await auth();
    
    if (!session) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-700 text-xl">
            {" "}
            Please Sign In
            </div>
        );
    }

    // assume user is signed in becausee would have returned otherwise
    return <div className="space-y-6 container mx-auto px-4 py-8">
        <div>
            <h1>Dashboard</h1>
            <Button>
                New Trip
            </Button>
        </div>
    </div>
}

// export makes this function available outside this file
// default marks this as the file's main export, so it can be imported without braces
// function declares namedFunction