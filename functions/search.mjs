export default async function search(request) {
    try {
        const url = new URL(request.url);
        const tag = url.searchParams.get("tag");
        const endpointURL = `https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${tag}&api_key=${Netlify.env.get("SECRET_API_LASTFM")}&format=json&limit=8`;
        const options = {
            method: "GET"
        };

        const response = await fetch(endpointURL, options);
        const data = await response.json();
        return new Response(
            JSON.stringify(data),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (error) {
        console.log(error);
        return new Response(
            JSON.stringify({
                error: "Could not complete fetch call."
            }),
            {
                status: 500,
                headers:{
                    'Content-Type': 'application/json'
                }
            }
        );
    }
}