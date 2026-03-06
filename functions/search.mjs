export default async function search() {
    try {
        const endpointURL = "";
        const options = {
            method: "GET",
            headers:{
                Authentication: "secret",
                "x-api-key": Netlify.env.get("SECRET_API_LASTFM")
            }
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