import { Key } from "react";

export default async function AboutPage() {

    const response = await fetch(
        `https://api.harvardartmuseums.org/object?apikey=${process.env.HARVARD_API_KEY}&size=9&hasimage=1&q=imagepermissionlevel:0 AND period:* AND medium:*&fields=title,primaryimageurl,medium,period,objectnumber`,
        { cache: 'no-store' } // Ensures fresh data on every request
    );

    const data = await response.json();
    const artworks = data.records;


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-8">Harvard Art Museum Collection</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {artworks.map((artwork: { objectnumber: Key | null | undefined; primaryimageurl: never; title: never; period: never; medium: never; }) =>
                    (
                        <div
                            key={artwork.objectnumber}
                            className="border rounded-lg shadow-md p-4 bg-white"
                        >

                            <img
                                src={artwork.primaryimageurl || "/placeholder.jpg"}
                                alt={artwork.title || "Untitled"}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />


                            <h2 className="text-lg font-semibold mb-2">
                                {artwork.title || "Untitled"}
                            </h2>


                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Period:</strong> {artwork.period || "Period unknown"}
                            </p>


                            <p className="text-sm text-gray-600">
                                <strong>Medium:</strong> {artwork.medium || "Medium unknown"}
                            </p>
                        </div>
                    ))}
            </div>
        </div>
    );
}
