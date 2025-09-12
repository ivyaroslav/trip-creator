import Header from "components/Header"
import type { Route } from "./+types/trips";
import type { LoaderFunctionArgs } from "react-router";
import { parseTripData } from "lib/utils";
import { getTripById, getAllTrips } from "~/appwrite/trips";
export const loader = async({request}: LoaderFunctionArgs) => {
    const limit = 8;
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || "1", 10);
    const offset = (page - 1) * limit;
    const {allTrips, total} = await getAllTrips(limit, offset);

    return {
        trips: allTrips.map(({ $id, tripDetails, imageUrls }) => ({
            id: $id,
            ... parseTripData(tripDetails),
            imageUrls: imageUrls ?? []
        })),
        total
    }
}
    
const Trips = ({ loaderData }: Route.ComponentProps) => {
    const trips = loaderData.trips as Trip[] | [];
    return (
        <main className = "all-users wrapper">
            <Header 
                title = "Trips"
                description = "View and edit AI-generated travel plans"
                ctaText="Create a trip"
                ctaUrl = "/trips/create"
            />
        </main>
    )
}
export default Trips