export async function onRequest(context: { request: Request }) {
    const { request } = context;
    
    // Cloudflare headers are available in request.headers
    const city = request.headers.get('cf-ipcity');
    const region = request.headers.get('cf-region');
    const longitude = request.headers.get('cf-iplongitude');
    const latitude = request.headers.get('cf-iplatitude');
    const timezone = request.headers.get('cf-timezone');
    const country = request.headers.get('cf-ipcountry');

    // You can also access some of these via request.cf if deployed on Cloudflare Workers/Pages
    // e.g., request.cf.city, request.cf.latitude, etc.

    const responseData = {
        cf_city: city || (request as any).cf?.city,
        cf_region: region || (request as any).cf?.region,
        cf_longitude: longitude || (request as any).cf?.longitude,
        cf_latitude: latitude || (request as any).cf?.latitude,
        cf_timezone: timezone || (request as any).cf?.timezone,
        cf_country: country || (request as any).cf?.country
    };

    return new Response(JSON.stringify(responseData), {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    });
}
