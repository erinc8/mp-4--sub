// Add these directives at the top of your file
export const dynamic = 'force-dynamic'; // Forces dynamic rendering
// Or use this instead if you want to cache and revalidate:
// export const revalidate = 3600; // Revalidates every hour

interface Artwork {
    objectnumber: string;
    title: string | null;
    period: string | null;
    medium: string | null;
}

export default async function AboutPage() {
    try {
        // Add logging to debug environment variable issues
        console.log('API Key available:', !!process.env.HARVARD_API_KEY);

        if (!process.env.HARVARD_API_KEY) {
            throw new Error('API key not found');
        }

        const response = await fetch(
            `https://api.harvardartmuseums.org/object?apikey=${process.env.HARVARD_API_KEY}&size=9&hasimage=1&q=imagepermissionlevel:0 AND title:* AND period:* AND medium:*&fields=title,medium,period,objectnumber`
        );

        // More detailed error information
        if (!response.ok) {
            throw new Error(`Failed to fetch artwork details: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const artworks: Artwork[] = data.records;

        // Rest of your component remains the same
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
        // Improved error display
        console.error('Error fetching artwork:', error);
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-4xl font-bold mb-8">Error</h1>
                <p className="text-lg text-red-500">Failed to load artwork data. Please try again later.</p>
                <p className="text-sm text-gray-600">{(error as Error).message}</p>
            </div>
        );
    }
}
