interface Artwork {
    objectnumber: string | null;
    primaryimageurl: string | null;
    title: string | null;
    period: string | null;
    medium: string | null;
}

export default async function AboutPage() {
    const response = await fetch(
        `https://api.harvardartmuseums.org/object?apikey=${process.env.HARVARD_API_KEY}&size=9&hasimage=1&q=imagepermissionlevel:0 AND period:* AND medium:*&fields=title,primaryimageurl,medium,period,objectnumber`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch artwork details");
    }

    const data = await response.json();
    const artworks: Artwork[] = data.records;

    return (
        <div className="container mx-auto p-6 bg-gray-50">
            <h1 className="text-4xl font-bold mb-8 text-center">Harvard Art Museum Collection</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {artworks.map((artwork) => (
                    <div
                        key={artwork.objectnumber}
                        className="border rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="h-60 overflow-hidden">
                            <img
                                src={artwork.primaryimageurl || "/placeholder.jpg"}
                                alt={artwork.title || "Untitled"}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-3 line-clamp-2">
                                {artwork.title || "Untitled"}
                            </h2>

                            <p className="text-sm text-gray-600 mb-2">
                                <span className="font-medium">Period:</span> {artwork.period || "Unknown"}
                            </p>

                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Medium:</span> {artwork.medium || "Unknown"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
