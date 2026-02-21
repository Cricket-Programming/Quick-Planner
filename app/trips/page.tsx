import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function TripsPage() {
    const session = await auth(); // gets back the session information and we wait for it to be called

    const trips = await prisma.trip.findMany({
        where: { userId: session?.user?.id },
    })

    const sortedTrips = [...trips].sort( // the spread operator is used to get a shallow copy of trips to not mutate trips directly
        (a, b) => new Date(b.startDate).getTime() - new Date(b.startDate).getTime()
    );

    // console.log(
    //     sortedTrips.slice(0, 6).map((tripObj) => {
    //         console.log(tripObj.title)
    //     })
    // );

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const upcomingTrips = sortedTrips.filter((trip) => new Date(trip.startDate) >= today)

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
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight"></h1>
                <div>
                    <h1>Dashboard</h1>
                    {/* This is a button that is also a link  */}
                    <Link href="/trips/new">
                        <Button>
                            Add Trips
                        </Button>
                    </Link>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Welcome back, {session.user?.name} </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                        {trips.length === 0
                            ? "Start planning your first trip by clicking the button above."
                            : `You have ${trips.length} ${trips.length === 1 ? "trip" : "trips" } planned
                
                            ${
                                upcomingTrips.length > 0
                                ? `${upcomingTrips.length} upcoming`
                                : "no upcoming trips"
                            }` // must be inside template literal
                        }
                    </p>
                </CardContent>
            </Card>

            <div>
                <h2 className="text-xl font-semibold mb-4">Your Recent Trips</h2>
                
                    {trips.length === 0 ? (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-8">
                                <h3 className="text-xl font-medium mb-2">No trips yet.</h3>
                                <p className="text-center mb-4 max-w-md">Start planning your first adventure by creating your first trip</p>
                                <Link href="/trips/new">
                                    <Button>
                                        Create Trip
                                    </Button>
                                </Link> 
                            </CardContent>
                        </Card>
                    ) : 
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sortedTrips.slice(0, 6).map((trip, key) => (
                            <Link key={key} href={""}>
                                <Card className="h-full hover:shadow-md transition-shadow">
                                    
                                    <CardHeader className="line-clamp-1">  {/* Clamping lin*/}
                                        <CardTitle>{trip.title}</CardTitle>
                                    </CardHeader>

                                    <CardContent>
                                        <p className="text-sm line-clamp-2 mb-2">
                                            {trip.description}
                                        </p>
                                        <div className="text-sm"> 
                                            {new Date(trip.startDate).toLocaleDateString()} - {" "}
                                            {new Date(trip.endDate).toLocaleDateString()}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                    }
            </div>
        </div>
    );
}

// export makes this function available outside this file
// default marks this as the file's main export, so it can be imported without braces
// function declares namedFunction