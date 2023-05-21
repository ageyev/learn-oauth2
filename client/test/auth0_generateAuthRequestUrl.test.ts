import "https://deno.land/std@0.187.0/dotenv/load.ts";

// https://deno.com/manual@main/basics/testing/assertions
// https://github.com/denoland/deno_std/blob/main/testing/asserts.ts
import {assert} from "https://deno.land/std@0.187.0/testing/asserts.ts";

// https://deno.com/manual@v1.33.3/node/npm_specifiers
// https://github.com/validatorjs/validator.js
import validator from "npm:validator";

import generateCodeVerifier from "../generateCodeVerifier.ts";
import generateCodeChallenge from "../generateCodeChallenge.ts";
import generateAuthRequestUrl from "../generateAuthRequestUrl.ts";

Deno.test("Should generate correct url for Auth0 (with refresh token request)", async () => {

    const authorizationEndpoint: string | undefined = Deno.env.get("AUTH0_OAUTH_AUTHORIZATION_URL");
    if (!authorizationEndpoint) {
        throw new Error("AUTH0_OAUTH_AUTHORIZATION_URL not found");
    }

    const client_id: string | undefined = Deno.env.get("AUTH0_CLIENT_ID");
    if (!client_id) {
        throw new Error("AUTH0_CLIENT_ID not found");
    }

    // redirect_uri from https://www.udemy.com/course/oauth-2-simplified/ assignments
    const redirect_uri = 'https://example-app.com/redirect';

    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    const scope = "offline_access";

    const url = await generateAuthRequestUrl(
        authorizationEndpoint,
        client_id,
        redirect_uri,
        scope,
        codeVerifier,
        codeChallenge
    );

    // console.log(url.toString());

    assert(validator.isURL(
        url.toString(),
        {require_protocol: true}
    ));
})