"use client";
export default function NewLocationClient({ tripId }: { tripId: string}) {  // param follows name : type
    return (
        <div className="min-h-[calc(100vh - 8rem] flex bg-gray-50 items-center justify-center">
            <div className="w-full max-w-md mx-auto">
                <div className="bg-white p-8 shadow-lg rounded-lg">
                    <h1>Add New Location</h1>
                </div>
            </div>
        </div>

    );
}