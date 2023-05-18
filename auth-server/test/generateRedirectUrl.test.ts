// https://deno.com/manual@main/basics/testing/assertions
// https://github.com/denoland/deno_std/blob/main/testing/asserts.ts
import {assert} from "https://deno.land/std@0.187.0/testing/asserts.ts";

// https://deno.com/manual@v1.33.3/node/npm_specifiers
// https://github.com/validatorjs/validator.js
import validator from "npm:validator";

import generateRedirectUrl from "../generateRedirectUrl.ts";
import {error} from "https://deno.land/x/fresh@1.1.5/src/dev/error.ts";

Deno.test("Should generate a valid URL for auth request", async () => {
    const url = await generateRedirectUrl(
        'https://authorization-server.com/auth',
        "abc12345",
        "zxc12345"
    );
    // console.log(url.toString());
    assert(validator.isURL(
        url.toString(),
        {require_protocol: true}
    ));
});