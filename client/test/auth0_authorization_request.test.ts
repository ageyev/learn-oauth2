// https://deno.com/manual@main/basics/testing/assertions
// https://github.com/denoland/deno_std/blob/main/testing/asserts.ts
import {assert, assertEquals, assertExists} from "https://deno.land/std@0.187.0/testing/asserts.ts";

// https://deno.com/manual@v1.33.3/node/npm_specifiers
// https://github.com/validatorjs/validator.js
import validator from "npm:validator";
import generateCodeVerifier from "../generateCodeVerifier.ts";
import generateCodeChallenge from "../generateCodeChallenge.ts";
import auth0_authorization_request from "../auth0_authorization_request.ts";

// run:
// deno test --allow-read --allow-write --allow-env --allow-run --allow-net
// deno test -A
Deno.test("Should get valid authorization code from Auth0", async () => {

    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    const result = await auth0_authorization_request(
        false,
        true, // required for test
        codeVerifier,
        codeChallenge
    )

    assertExists(result);

    assert(validator.isURL(
        result.resultUrl.toString(),
        {require_protocol: true}
    ));

    assertExists(
        result.resultUrl.searchParams.get("code")
    )

    assertEquals(
        result.resultUrl.searchParams.get("state"),
        codeVerifier
    )

});