import { BASE_URL } from "../utils/constants";

interface GalleryResponse {
    photos: Array<Photo>;
    total: number;
    total_pages: number;
}

interface Photo {
    id: string;
    title: string;
    url: string;
}

interface GalleryError {
    message: string;
    code?: number;
}

export const fetchGallery = async (
    page: number,
    perPage: number,
    query?: string
): Promise<GalleryResponse | GalleryError> => {
    const params = new URLSearchParams({
        client_id: import.meta.env.VITE_APP_API_KEY,
        order_by: 'popular',
        page: page.toString(),
        per_page: perPage.toString(),
    });

    if (query) {
        params.append('query', query);
    }

    try {
        const response = await fetch(`${BASE_URL}/photos/?${params.toString()}`);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data: GalleryResponse = await response.json();
        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { message: error.message, code: (error as any).status };
        }
        return { message: "An unknown error occurred" };
    }
};
 