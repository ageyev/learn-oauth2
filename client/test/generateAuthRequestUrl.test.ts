// https://deno.com/manual@main/basics/testing/assertions
// https://github.com/denoland/deno_std/blob/main/testing/asserts.ts
import {assert} from "https://deno.land/std@0.187.0/testing/asserts.ts";

// https://deno.com/manual@v1.33.3/node/npm_specifiers
// https://github.com/validatorjs/validator.js
import validator from "npm:validator";

import generateAuthRequestUrl from "../generateAuthRequestUrl.ts";

Deno.test("Should generate a valid URL for auth request", async () => {
    const url = await generateAuthRequestUrl(
        'https://authorization-server.com/auth',
        "client_id",
        'https://example-app.com/redirect',
    );
    // console.log(url.toString());
    assert(validator.isURL(
        url.toString(),
        {require_protocol: true}
    ));
});