import generateRedirectUrl from "./generateRedirectUrl.ts";

interface TokenResponse {
    token_type: string, // "Bearer"
    access_token: string,
    expires_in: number,
    scope?: string,
    refresh_token?: string
}

const generateTokenResponse = (
    token_type: string, // "Bearer"
    access_token: string,
    expires_in: number,
    scope?: string,
    refresh_token?: string
): TokenResponse => {
    let resp: TokenResponse = {
        token_type: token_type,
        access_token: access_token,
        expires_in: expires_in,
    }

    if (scope) {
        resp = {...resp, scope: scope}
    }

    if (refresh_token) {
        resp = {...resp, refresh_token: resp}
    }

    return resp;
}