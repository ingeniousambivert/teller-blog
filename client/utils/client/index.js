export function getStrapiURL(path = "") {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"}${path}`;
}

export async function getStrapiData(path) {
    try {
        const requestUrl = getStrapiURL(path);
        const response = await fetch(requestUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        return error.message;
    }
}

export function getStrapiMedia(media) {
    if (media) {
        const imageUrl = media.url.startsWith("/") ? getStrapiURL(media.url) : media.url;
        return imageUrl;
    }
}
