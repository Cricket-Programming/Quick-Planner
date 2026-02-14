"use client";

import Image  from "next/image"; // default import from default function, I can name it whatever I want
import { Button } from "@/components/ui/button"; // 
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { createTrip } from "@/lib/actions/create-trip";
import { cn } from "@/lib/utils";
import { UploadButton } from "@/lib/upload-thing"
import { useState, useTransition } from "react";

export default function NewTrip() {
    // console.log("Test123"); // this would be an example of a client-side log
    const [isPending, startTransition] = useTransition();
    const [imageUrl, setImageUrl] = useState<string | null>(null);    // data passed in as props come from other components
    return (<div className="max-w-lg mx-auto mt-15">


        <Card>
            <CardHeader>New Assignment</CardHeader>
            <CardContent>
                <form
                    className="space-y-6"
                    action={(formData: FormData) => {
                        if (imageUrl) {
                            formData.append("imageUrl", imageUrl);
                        }
                        startTransition(() => createTrip(formData));
                    }}
                >
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
                            name="description" 
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
                                name="endDate" 
                                className={cn(
                                    "w-full border border-gray border-gray-300 px-2 py-2",
                                    "rounded-md focus:outline-none focus:ring-2 focus:ring-pink-800"
                                )}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label>Trip Image</label>

                        {imageUrl && (
                            <Image 
                                src={imageUrl} 
                                alt="Trip Preview"
                                className="w-full mb-4 max-h-48"
                                width={300}
                                height={100}
                                
                            />
                        )}
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                if (res && res[0].ufsUrl) {
                                    setImageUrl(res[0].ufsUrl);
                                }
                            }}

                            onUploadError={(error: Error) => {
                                console.log("Upload Error", error)
                            }}
                        />
                    </div>
                    
                        {/* The syntax disabled={isPending} makes sense here. disabled is the attribute {} allows you to pass in variables  */}
                        <Button type="submit" disabled={isPending} className="w-full">
                            {isPending ? "Creating..." : "Create Trip"}
                        </Button> 
                </form>
            </CardContent>
        </Card>
    </div>);
}