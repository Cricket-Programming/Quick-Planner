import { auth } from  "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function TripsPage() {
    const session = await auth(); // gets back the session information and we wait for it to be called
    
    // if the user is not signed in, then they are shown "Please Sign In" 
    if (!session) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-700 text-xl">
                {" "}
                Please Sign In
            </div>
        );
    }

    // assume user is signed in because would have returned otherwise.
    return ( 
        <div className="space-y-6 container mx-auto px-4 py-8">
            <div>
                <h1>Dashboard</h1>
                {/* I can use this  */}
                <Link href="/trips/new"> 
                    <Button> 
                        New Trip
                    </Button>
                </Link>
               
            </div> 
        </div>
    );
}

// export makes this function available outside this file
// default marks this as the file's main export, so it can be imported without braces
// function declares namedFunction