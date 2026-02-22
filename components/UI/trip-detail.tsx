"use client"

import { Trip } from "@/app/generated/prisma";
import Image from "next/image";
import { Calendar, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { useState } from "react";
import { Card } from "./card";

interface TripDetailClientProps {
    trip: Trip;
}

export default function TripDetailClient({ trip }: TripDetailClientProps) {
    const [activeTab, setActiveTab] = useState("overview");
    return (
        <div>
            <div className="container mx-auto px-4 py-8 space-y-8 w-full h-72 md:h-96 overflow-hidden rounded-xl shadow-lg relative">
                {trip.imageUrl && (
                    <div className="w-full">
                        <Image src={trip.imageUrl} alt={trip.title} className="object-cover" fill priority></Image>
                    </div>
                )}
            </div>

            
            <Card>
                <div className="bg-white p-6 shadow rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900">{trip.title}</h1>
                        <div className="flex items-center text-gray-500 mt-2">
                            <Calendar className="h-5"/>
                            <span className="text-lg">{trip.startDate.toLocaleDateString()} - {trip.endDate.toLocaleDateString()}</span>
                        </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <Link href={`/trips/${trip.id}/itinerary/new`}> 
                            <Button>
                                <Plus className="mr-2"/>Add location
                            </Button>
                        </Link>
                    </div>
                </div>
            </Card>

            <div className="bg-white p-6 shadow rounded-lg">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="mb-6">
                        <TabsTrigger value="overview" className="text-lg">
                            Overview
                        </TabsTrigger>
                        <TabsTrigger value="itinerary" className="text-lg">
                            Itinerary
                        </TabsTrigger>
                        <TabsTrigger value="map" className="text-lg">
                            Map
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid md: grid-cols-2 gap-6">
                                <h2 className="text-5xl mb-4">Trip Summary</h2>
                        </div>
                            <div>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <Calendar className="h-6 w-6 mr-3"/>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-700">Dates</p>
                                        <p className="text-sm text-gray-500">
                                            {trip.startDate.toLocaleDateString()} - {trip.endDate.toLocaleDateString()}
                                        </p>

                                        <br />
                                        {
                                            Math.round(trip.endDate.getTime() - trip.startDate.getTime()) 
                                            / (1000 * 60 * 60 * 24)
                                        } days
                                        <div className="flex items-start"></div>
                                    </div>
                                </div>

                                <div className="flex items-start">

                                </div>
                            </div>
 
                    </TabsContent>
                </Tabs>
            </div>
        </div>


        

    );
}

