const auth0UseRefreshToken = async (refresh_token: string) => {

    const url = Deno.env.get("AUTH0_OAUTH_TOKEN_URL");
    if (!url) {
        throw new Error("URL not found");
    }

    // on deno we can use fetch API https://deno.com/manual@v1.29.2/examples/fetch_data
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    const response = await fetch(
        url,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    grant_type: 'refresh_token',
                    client_id: Deno.env.get("AUTH0_CLIENT_ID"),
                    client_secret: Deno.env.get("AUTH0_CLIENT_SECRET"),
                    refresh_token: refresh_token,
                }
            ),
        });

    return await response.json();
}

export default auth0UseRefreshToken;