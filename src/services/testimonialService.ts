export interface Testimonial {
    title: string;
    content: string;
}

const PROXY_URL = "https://proxy.cors.sh/";
const API_URL = import.meta.env.VITE_WORDPRESS_API_URL + "/testimonials";

export async function fetchTestimonialsData(): Promise<Testimonial[]> {
    const response = await fetch(`${PROXY_URL}${API_URL}`);
    if (!response.ok) {
        throw new Error("Failed to fetch testimonials");
    }
    const data = await response.json();
    if (Array.isArray(data)) {
        return data;
    }
    throw new Error("Unexpected API response structure");
}