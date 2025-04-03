

interface Artwork {
    objectnumber: string;
    title: string | null;

    period: string | null;
    medium: string | null;
}

export default async function AboutPage() {
    try {
        const response = await fetch(
            `https://api.harvardartmuseums.org/object?apikey=${process.env.HARVARD_API_KEY}&size=9&permissionlevel:0 AND title:* AND period:* AND medium:*&fields=title,medium,period,objectnumber`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch artwork details');
        }

        const data = await response.json();
        const artworks: Artwork[] = data.records;

        if (!artworks || artworks.length === 0) {
            return (
                <div className="container mx-auto p-4">
                    <h1 className="text-4xl font-bold mb-8">Harvard Art Museum Collection</h1>
                    <p className="text-lg text-red-500">No artwork data available. Please try again later.</p>
                </div>
            );
        }

        return (
            <div className="container mx-auto p-4">
                <h1 className="text-4xl font-bold mb-8">Harvard Art Museum Collection</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {artworks.map((artwork) => (
                        <div
                            key={artwork.objectnumber}
                            className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-300"
                        >


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
    } catch (error) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-4xl font-bold mb-8">Error</h1>
                <p className="text-lg text-red-500">Failed to load artwork data. Please try again later.</p>
                <p className="text-sm text-gray-600">{(error as Error).message}</p>
            </div>
        );
    }
}
