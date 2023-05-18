import querystring from "https://deno.land/std@0.171.0/node/querystring.ts";

interface RedirectUrlRequestParams {
    error?: string,
    code?: string,
    state: string,
}

const generateRedirectUrl = (
    redirect_uri: string, // URL string, like "https://example-app.com/redirect" (client app)
    state: string, // the same state value as used in the request (code verifier)
    code?: string, // auth code provided to client app
    error?: string, // like 'access_denied'
) => {

    let redirectUrlRequestParams: RedirectUrlRequestParams = {
        state: state
    }

    if (code) {
        redirectUrlRequestParams = {...redirectUrlRequestParams, code: code}
    } else if (error) {
        redirectUrlRequestParams = {...redirectUrlRequestParams, error: error}
    }

    const url = new URL(redirect_uri + "?" + querystring.stringify(redirectUrlRequestParams));

    return url;
}

export default generateRedirectUrl;