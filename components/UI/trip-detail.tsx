"use client"

import { Trip } from "@/app/generated/prisma";
import Image from "next/image";
import { Calendar } from "lucide-react";

interface TripDetailClientProps {
    trip: Trip;
}

export default function TripDetailClient({ trip }: TripDetailClientProps) {
    return (
        <div>
            <div className="container mx-auto px-4 py-8 space-y-8 w-full h-72 md:h-96 overflow-hidden rounded-xl shadow-lg relative">
                {trip.imageUrl && (
                    <div className="w-full">
                        <Image src={trip.imageUrl} alt={trip.title} className="object-cover" fill priority></Image>
                    </div>
                )}
            </div>
            <div className="bg-white p-6 shadow rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900">{trip.title}</h1>
                </div>
            </div>

            <div className="flex items-center text-gray-500 mt-2">
                <Calendar/>
                <span className="text-lg">{trip.startDate.toLocaleDateString()} - {trip.endDate.toLocaleDateString()}</span>
            </div>
        
        </div>

        

    );
}

