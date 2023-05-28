import auth0_authorization_request from "./auth0_authorization_request.ts";
import generateCodeVerifier from "./generateCodeVerifier.ts";
import generateCodeChallenge from "./generateCodeChallenge.ts";

interface TokenResponse {
    access_token: string,
    expires_in: number,
    token_type: string,
    scope?: string,
    refresh_token?: string
}

const auth0_get_access_token = async (
    scope?: string,
    useHeadless?: boolean,
    closeBrowserOnReturn?: boolean
): Promise<TokenResponse> => {

    const url = Deno.env.get("AUTH0_OAUTH_TOKEN_URL");
    if (!url) {
        throw new Error("URL not found");
    }

    if (useHeadless === undefined) useHeadless = true;
    if (closeBrowserOnReturn === undefined) closeBrowserOnReturn = true;

    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    // uses puppeteer
    const auth0AuthorizationRequestResult = await auth0_authorization_request(
        useHeadless,
        closeBrowserOnReturn,
        codeVerifier,
        codeChallenge, // << if not provided, 'scope' will be used as this arg !
        scope // if scope=offline_access - refresh token will be provided
    );

    if (!auth0AuthorizationRequestResult || !auth0AuthorizationRequestResult.code) {
        throw new Error("Authorization code request was not successful (null)")
    }

    const data = {
        grant_type: 'authorization_code',
        redirect_uri: 'https://example-app.com/redirect', // from course assignment https://oauth.school/exercise/web/
        client_id: Deno.env.get("AUTH0_CLIENT_ID"),
        client_secret: Deno.env.get("AUTH0_CLIENT_SECRET"),
        code_verifier: codeVerifier, // state
        code: auth0AuthorizationRequestResult.code, // authorizationCode
        // scope: scope // < not needed here, should be in authorization request
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
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });

    const response = await responseObj.json(); // parses JSON response into native JavaScript objects

    return response;

}

// deno run -A auth0_get_access_token.ts
// console.log(await auth0_get_access_token(
//     "offline_access",
//     false,
//     false
// ));
export default auth0_get_access_token;