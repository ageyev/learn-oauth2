import querystring from "https://deno.land/std@0.171.0/node/querystring.ts";

interface TokenRequestUrlRequestParams {
    grant_type: string, // like 'authorization_code'
    code: string, // code received from auth server
    redirect_uri: string,
    code_verifier: string,
    client_id: string,
    client_secret?: string // may be here or in request header
}

const generateTokenRequestUrl = (
    token_endpoint: string,
    grant_type: string,
    code: string,
    redirect_uri: string,
    code_verifier: string,
    client_id: string,
    client_secret?: string,
) => {

    let tokenRequestUrlRequestParams: TokenRequestUrlRequestParams = {
        grant_type: grant_type,
        code: code,
        redirect_uri: redirect_uri,
        code_verifier: code_verifier,
        client_id: client_id
    }

    if (client_secret) {
        tokenRequestUrlRequestParams = {...tokenRequestUrlRequestParams, client_secret: client_secret}
    }

    const url = new URL(token_endpoint + "?" + querystring.stringify(tokenRequestUrlRequestParams));

    return url;
}

export default generateTokenRequestUrl;