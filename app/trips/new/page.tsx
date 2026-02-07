"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function NewTrip() {
    return (<div className="max-w-lg mx-auto mt-15">
        <Card>
            <CardHeader>New Trip</CardHeader>
            <CardContent>
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input 
                            type="text" 
                            name="title" 
                            placeholder="Japan trip..."
                            className={cn(
                                "w-full border border-gray border-gray-300 px-2 py-2",
                                "rounded-md focus:outline-none focus:ring-2 focus:ring-pink-800"
                            )} 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea 
                            name="Description" 
                            placeholder="Saw three of the most important landmarks over 7 days..."
                            className={cn(
                                "w-full border border-gray border-gray-300 px-2 py-2",
                                "rounded-md focus:outline-none focus:ring-2 focus:ring-pink-800"
                            )} 
                            required
                        />
                        
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                            <input
                                type="date"
                                name="startDate" 
                                className={cn(
                                    "w-full border border-gray border-gray-300 px-2 py-2",
                                    "rounded-md focus:outline-none focus:ring-2 focus:ring-pink-800"
                                )}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                End Date
                            </label>
                            <input
                                type="date"
                                name="enddate" 
                                className={cn(
                                    "w-full border border-gray border-gray-300 px-2 py-2",
                                    "rounded-md focus:outline-none focus:ring-2 focus:ring-pink-800"
                                )}
                                required
                            />
                        </div>
                    </div>
                    {/* <Link> */}
                        <Button type="submit" className="w-full">Create Trip</Button>
                    {/* </Link> */}

                </form>
            </CardContent>
        </Card>
    </div>);
}