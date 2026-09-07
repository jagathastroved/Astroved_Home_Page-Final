export interface Testimonial {
    title: string;
    content: string;
}

const isDev = import.meta.env.DEV;
const API_URL = isDev
    ? "/wp-json/api/v1/testimonials"
    : import.meta.env.VITE_WORDPRESS_API_URL + "/testimonials";

export async function fetchTestimonialsData(): Promise<Testimonial[]> {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) {
        throw new Error("Failed to fetch testimonials");
    }
    const data = await response.json();
    if (Array.isArray(data)) {
        return data;
    }
    throw new Error("Unexpected API response structure");
}