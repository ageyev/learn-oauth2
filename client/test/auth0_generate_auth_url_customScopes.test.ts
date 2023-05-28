import "https://deno.land/std@0.187.0/dotenv/load.ts";
import generateCodeVerifier from "../generateCodeVerifier.ts";
import generateCodeChallenge from "../generateCodeChallenge.ts";
import {assert} from "https://deno.land/std@0.187.0/testing/asserts.ts";

// https://deno.com/manual@v1.33.3/node/npm_specifiers
// https://github.com/validatorjs/validator.js
import validator from "npm:validator";

Deno.test("Should generate Auth0 authorization URL with custom scopes", async () => {

    const authEndpoint = Deno.env.get("AUTH0_OAUTH_AUTHORIZATION_URL");
    if (!authEndpoint) {
        throw new Error("Authorization endpoint (AUTH0_OAUTH_AUTHORIZATION_URL) not found");
    }

    const clientID = Deno.env.get("AUTH0_TEST_API_CLIENT_ID");
    if (!clientID) {
        throw new Error("ClientID (AUTH0_CLIENT_ID) not found");
    }

    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    const url =
        authEndpoint
        + "?response_type=code"
        + "&scope=create:photos+delete:photos"
        + "&client_id=" + clientID
        + "&state=" + codeVerifier
        + "&redirect_uri=https://example-app.com/redirect"
        + "&code_challenge=" + codeChallenge
        + "&code_challenge_method=S256";

    // console.log(url);

    assert(validator.isURL(
        url,
        {require_protocol: true}
    ));

})