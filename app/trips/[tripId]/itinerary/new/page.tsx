import NewLocationClient from "@/components/UI/new-location";

export default async function NewLocation({ // when the user goes to this URL, the tripId is noticed, which is fetched by the server. Then it is passed to the client component
    params
}: {
    params: Promise<{tripId: string}>;
}) {
    const {tripId} = await params;

    return <NewLocationClient tripId={tripId}/>
}