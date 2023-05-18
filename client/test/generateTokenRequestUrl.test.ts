// https://deno.com/manual@main/basics/testing/assertions
// https://github.com/denoland/deno_std/blob/main/testing/asserts.ts
import {assert} from "https://deno.land/std@0.187.0/testing/asserts.ts";

// https://deno.com/manual@v1.33.3/node/npm_specifiers
// https://github.com/validatorjs/validator.js
import validator from "npm:validator";

import generateTokenRequestUrl from "../generateTokenRequestUrl.ts";

Deno.test("Should generate a valid URL for token request", async () => {
    const url = await generateTokenRequestUrl(
        "https://authorization-server.com/token",
        "authorization_code",
        "abc12345",
        "https://example-app.com/redirect",
        "zxc09876",
        "0001"
    );
    // console.log(url.toString());
    assert(validator.isURL(
        url.toString(),
        {require_protocol: true}
    ));
});