const auth0RevokeToken = async (token: string) => {

    const url = Deno.env.get("AUTH0_OAUTH_REVOKE_TOKEN_URL");
    if (!url) {
        throw new Error("Revoke token URL not found");
    }
    // on deno we can use fetch API https://deno.com/manual@v1.29.2/examples/fetch_data
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    const responseObj = await fetch(
        url,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                client_id: Deno.env.get("AUTH0_CLIENT_ID"),
                client_secret: Deno.env.get("AUTH0_CLIENT_SECRET"),
                token: token
            }),
        });

    if (responseObj && responseObj.body) {
        await responseObj.body.cancel(); // empty
    }

    return responseObj;


}

export default auth0RevokeToken;