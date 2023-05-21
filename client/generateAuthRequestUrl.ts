import querystring from "https://deno.land/std@0.171.0/node/querystring.ts";

import generateCodeVerifier from "./generateCodeVerifier.ts";
import generateCodeChallenge from "./generateCodeChallenge.ts";

interface AuthRequestUrlRequestParams {
    response_type: string,
    client_id: string,
    redirect_uri: string
    state: string,
    code_challenge: string
    code_challenge_method: string,
    scope?: string, // 'offline_access' if refresh token requested
    codeVerifierStr?: string,
    codeChallengeStr?: string,
}

const generateAuthRequestUrl = async (
    authorizationEndpoint: string, // URL string, like "https://authorization-server.com/auth"
    client_id: string, // to tell auth server which app is making a request
    redirect_uri: string, // URL string, like "https://example-app.com/redirect"
    scope?: string, // like "offline_access" to get refresh token, or "photos" etc.
    codeVerifierStr?: string,
    codeChallengeStr?: string
) => {

    const codeVerifier = codeVerifierStr || generateCodeVerifier();
    const codeChallenge = codeChallengeStr || await generateCodeChallenge(codeVerifier);

    let requestParams: AuthRequestUrlRequestParams = {
        response_type: 'code',
        client_id: client_id,
        redirect_uri: redirect_uri,
        state: codeVerifier,
        code_challenge: codeChallenge,
        code_challenge_method: 'S256',
        // if used, 'scope' should be used here, in the authentication request url
        // see: https://auth0.com/docs/secure/tokens/refresh-tokens/get-refresh-tokens
        scope: scope,
    };

    if (scope) {
        requestParams = {...requestParams, scope: scope}
    }

    const url = new URL(authorizationEndpoint + "?" + querystring.stringify(requestParams));

    return url;
}

export default generateAuthRequestUrl;